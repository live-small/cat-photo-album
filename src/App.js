import { API_END_POINT, request } from './api.js';
import Breadcrumb from './Breadcrumb.js';
import ImageViewer from './ImageViewer.js';
import Loading from './Loading.js';
import Nodes from './Nodes.js';
import { isBoolean, isString, isValidNodes, isValidPaths } from './validator.js';

export default function App({ $container }) {
  this.state = {
    isRoot: true,
    isLoading: false,
    selectedImageUrl: '',
    nodes: [],
    paths: [],
  };

  const setLoading = (loadingState) => {
    if (!isBoolean(loadingState)) return;

    this.state.isLoading = loadingState;
    loadingComponent.setState(this.state.isLoading);
  };

  const setPaths = (pathState) => {
    if (!isValidPaths(pathState)) return;

    this.state.paths = pathState;
    breadcrumbComponent.setState(this.state.paths);
  };

  const setNodes = ({ isRoot, nodes }) => {
    if (!isBoolean(isRoot) || !isValidNodes(nodes)) return;

    this.state.isRoot = isRoot;
    this.state.nodes = nodes;

    nodeComponent.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  };

  const setSelectedImageUrl = (imageUrlState) => {
    if (!isString(imageUrlState)) return;

    this.state.selectedImageUrl = imageUrlState;
    imageViewerComponent.setState(this.state.selectedImageUrl);
  };

  const loadingComponent = new Loading({
    $container,
  });

  const breadcrumbComponent = new Breadcrumb({
    $container,
    initialState: this.state.paths,
    onClick: async (id) => {
      if (!id) {
        setPaths([]);
      } else {
        const { paths } = this.state;
        const clickedPaths = paths.findIndex((path) => path.id === id);
        const nextPaths = paths.slice(0, clickedPaths + 1);

        setPaths(nextPaths);
      }
      await fetchNodes(id);
    },
  });

  const nodeComponent = new Nodes({
    $container,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      if (node.type === 'DIRECTORY') {
        const newPaths = [...this.state.paths, node];
        setPaths(newPaths);

        await fetchNodes(node.id);
      }
      if (node.type === 'FILE') {
        console.log(node.filePath);
        const imageUrl = `${API_END_POINT}/static${node.filePath}`;
        setSelectedImageUrl(imageUrl);
      }
    },
    onPrevClick: async () => {
      const paths = [...this.state.paths];
      paths.pop();

      setPaths(paths);

      const nextNodeId = paths.length === 0 ? '' : paths[paths.length - 1].id;
      await fetchNodes(nextNodeId);
    },
  });

  const imageViewerComponent = new ImageViewer({
    $container,
    initialState: this.state.selectedImageUrl,
    onClose: () => {
      setSelectedImageUrl('');
    },
  });

  const fetchNodes = async (id) => {
    setLoading(true);

    const nodes = await request(id ? `/${id}` : '/');

    setLoading(false);
    setNodes({
      nodes,
      isRoot: id ? false : true,
    });
  };

  const turnOn = () => {
    fetchNodes();
  };

  turnOn();
}

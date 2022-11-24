import { API_END_POINT, request } from './api.js';
import Breadcrumb from './Breadcrumb.js';
import ImageViewer from './ImageViewer.js';
import Loading from './Loading.js';
import Nodes from './Nodes.js';

export default function App({ $container }) {
  this.state = {
    isRoot: true,
    isLoading: false,
    selectedImageUrl: null,
    nodes: [],
    paths: [],
  };

  this.setState = (newState) => {
    this.state = newState;

    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });

    loading.setState(this.state.isLoading);

    imageViewer.setState(this.state.selectedImageUrl);

    breadcrumb.setState(this.state.paths);
  };

  const loading = new Loading({
    $container,
  });

  const breadcrumb = new Breadcrumb({
    $container,
    initialState: this.state.paths,
    onClick: async (id) => {
      if (!id) {
        this.setState({
          ...this.state,
          paths: [],
        });
      } else {
        const { paths } = this.state;
        const clickedPaths = paths.findIndex((path) => path.id === id);

        this.setState({
          ...this.state,
          paths: paths.slice(0, clickedPaths + 1),
        });
      }
      await fetchNodes(id);
    },
  });

  const nodes = new Nodes({
    $container,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      if (node.type === 'DIRECTORY') {
        await fetchNodes(node.id);
        this.setState({
          ...this.state,
          paths: [...this.state.paths, node],
        });
      }
      if (node.type === 'FILE') {
        this.setState({
          ...this.state,
          selectedImageUrl: `${API_END_POINT}/static${node.filePath}`,
        });
      }
    },
    onPrevClick: async () => {
      const paths = [...this.state.paths];
      paths.pop();

      this.setState({
        ...this.state,
        paths,
      });

      const nextNodeId = paths.length === 0 ? '' : paths[paths.length - 1].id;
      await fetchNodes(nextNodeId);
    },
  });

  const imageViewer = new ImageViewer({
    $container,
    initialState: this.state.selectedImageUrl,
    onClose: () => {
      this.setState({
        ...this.state,
        selectedImageUrl: null,
      });
    },
  });

  const fetchNodes = async (id) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    const nodes = await request(id ? `/${id}` : '/');
    this.setState({
      ...this.state,
      isRoot: id ? false : true,
      isLoading: false,
      nodes,
    });
  };

  const turnOn = () => {
    fetchNodes();
  };

  turnOn();
}

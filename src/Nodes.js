export default function Nodes({ $container, initialState, onClick, onPrevClick }) {
  const $nodes = document.createElement('div');
  $nodes.className = 'Nodes';
  $container.appendChild($nodes);

  this.state = initialState;

  this.setState = (newState) => {
    // - 이전 값과 같은지, 다른지 -> 같으면 렌더안시킴
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { isRoot, nodes } = this.state;
    $nodes.innerHTML = `
			${
        isRoot
          ? ''
          : `
				<div class="Node">
					<img src="https://cdn.roto.codes/images/prev.png" />
				</div>`
      }
			${nodes
        .map((node) => {
          const imgUrl =
            node.type === 'DIRECTORY'
              ? 'https://cdn.roto.codes/images/directory.png'
              : 'https://cdn.roto.codes/images/file.png';
          return `
						<div class="Node" data-id=${node.id}>
							<img src=${imgUrl} />
							${node.name}	
						</div>
					`;
        })
        .join('')}
		`;
  };

  $nodes.addEventListener('click', (e) => {
    const $node = e.target.closest('.Node');
    if (!$node) return;

    const { id } = $node.dataset;
    if (!id) {
      onPrevClick();
    }

    const targetNode = this.state.nodes.find((node) => node.id === id);
    if (!targetNode) return;
    onClick(targetNode);
  });
}

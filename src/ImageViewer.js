export default function ImageViewer({ $container, initialState, onClose }) {
  const $imageViewer = document.createElement('div');
  $imageViewer.className = 'ImageViewer Modal';
  $container.appendChild($imageViewer);

  this.state = initialState;

  this.setState = (newState) => {
    if (newState === this.state) return;

    this.state = newState;
    this.render();
  };

  this.render = () => {
    $imageViewer.style.display = this.state.length ? 'block' : 'none';

    if (this.state.length) {
      $imageViewer.innerHTML = `
				<div class="content">
					<img src=${this.state} />
				</div>
		`;
    }
  };

  this.render();

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  });

  $imageViewer.addEventListener('click', (e) => {
    const isClickModalOutSide = [...e.target.classList].includes('Modal');
    if (isClickModalOutSide) {
      onClose();
    }
  });
}

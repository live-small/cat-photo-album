export default function ImageViewer({ $container, initialState, onClose }) {
  const $imageViewer = document.createElement('div');
  $imageViewer.className = 'ImageViewer Modal';
  $container.appendChild($imageViewer);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    $imageViewer.style.display = this.state ? 'block' : 'none';

    if (this.state) {
      $imageViewer.innerHTML = `
				<div class="content">
					<img src=${this.state} />
				</div>
		`;
    }
  };

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

export default function Loading({ $container }) {
  const $loading = document.createElement('div');
  $loading.className = 'Loading Modal';
  $container.appendChild($loading);

  this.state = false;

  this.setState = (newState) => {
    if (newState === this.state) return;

    this.state = newState;
    this.render();
  };

  this.render = () => {
    $loading.style.display = this.state ? 'block' : 'none';

    if (this.state) {
      $loading.innerHTML = `
				<div class="content">
					<img src="https://cdn.roto.codes/images/nyan-cat.gif" width="100%"/>
				</div>
			`;
    }
  };
}

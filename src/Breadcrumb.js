import { isDiff } from './utils.js';

export default function Breadcrumb({ $container, initialState, onClick }) {
  const $breadcrumb = document.createElement('nav');
  $breadcrumb.className = 'Breadcrumb';
  $container.appendChild($breadcrumb);

  this.state = initialState;

  this.setState = (newState) => {
    if (!isDiff(this.state, newState)) return;

    this.state = newState;
    this.render();
  };

  this.render = () => {
    $breadcrumb.innerHTML = `
			<div class="Breadcrumb-item">Root</div>
			${this.state
        .map(({ name, id }) => `<div data-id=${id} class="Breadcrumb-item">${name}</div>`)
        .join('')}
		`;
  };

  this.render();

  $breadcrumb.addEventListener('click', (e) => {
    const $breadcrumbItem = e.target.closest('.Breadcrumb-item');
    const { id } = $breadcrumbItem.dataset;
    onClick(id);
  });
}

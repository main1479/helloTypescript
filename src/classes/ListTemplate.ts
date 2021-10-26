import Invoice from './Invoice';
import Payment from './Payment';

export default class ListTemplate {
	constructor(readonly parentEl: HTMLUListElement) {}

	render(items: (Invoice | Payment)[]) {
		const markup = (): string => {
			return items
				.map((item) => {
					return `
      <li>
         <h4>${item.type.toUpperCase()}</h4>
         <p>${item.format()}</p>
      </li>
   `;
				})
				.join('');
		};

		this.parentEl.innerHTML = '';
		this.parentEl.insertAdjacentHTML('afterbegin', markup());
	}
}

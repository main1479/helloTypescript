import Invoice from './classes/Invoice';
import './style.css';

const form = document.querySelector('.new-item-form') as HTMLFormElement;

const invoices: Invoice[] = [];
form.addEventListener('submit', function (e: Event) {
	e.preventDefault();
	const type = form.querySelector('#type') as HTMLSelectElement;
	const amount = form.querySelector('#amount') as HTMLInputElement;
	const details = form.querySelector('#details') as HTMLInputElement;
	const client = form.querySelector('#client') as HTMLInputElement;
	const values: [string, string, number] = [client.value, details.value, amount.valueAsNumber];
	if (!amount.value || !details.value || !client.value) return;

	if (type.value === 'invoice') {
		const invoice: Invoice = new Invoice(...values);
		invoices.push(invoice);
		(client.value = ''), (details.value = ''), (amount.value = '');
	}
});

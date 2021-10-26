import Invoice from './classes/Invoice';
import ListTemplate from './classes/ListTemplate';
import Payment from './classes/Payment';
import './style.css';

const form = document.querySelector('.new-item-form') as HTMLFormElement;
const list = document.querySelector('.item-list') as HTMLUListElement;

const ListMarkup = new ListTemplate(list);

// getting Data from localStorage

const getLocalDocs = (): [] => {
	const localDocs = JSON.parse(localStorage.getItem('docs')!);
	if (localDocs) {
		const docsArr = localDocs.map((item: any) => {
			let tempItem: Invoice | Payment;
			if (item.type === 'invoice') {
				tempItem = new Invoice(item.type, item.client, item.details, item.amount);
			} else {
				tempItem = new Payment(item.type, item.recipient, item.details, item.amount);
			}
			return tempItem;
		});
		return docsArr;
	}
	return [];
};

const docs: (Invoice | Payment)[] = getLocalDocs();
ListMarkup.render(docs);
form.addEventListener('submit', function (e: Event) {
	e.preventDefault();
	const type = form.querySelector('#type') as HTMLSelectElement;
	const amount = form.querySelector('#amount') as HTMLInputElement;
	const details = form.querySelector('#details') as HTMLInputElement;
	const client = form.querySelector('#client') as HTMLInputElement;
	const values: [string, string, string, number] = [
		type.value,
		client.value,
		details.value,
		amount.valueAsNumber,
	];
	if (!amount.value || !details.value || !client.value) return;

	if (type.value === 'invoice') {
		const invoice: Invoice = new Invoice(...values);
		docs.push(invoice);
	} else {
		const payment: Payment = new Payment(...values);
		docs.push(payment);
	}

	ListMarkup.render(docs);
	localStorage.setItem('docs', JSON.stringify(docs));
	(client.value = ''), (details.value = ''), (amount.value = '');
});

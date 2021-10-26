import HasFormatter from '../interfaces/HasFormatter';

export default class Payment implements HasFormatter {
	constructor(
		readonly type: string,
		readonly recipient: string,
		readonly details: string,
		public amount: number
	) {}

	format() {
		return `${this.recipient} is owed £${this.amount} for ${this.details}`;
	}
}

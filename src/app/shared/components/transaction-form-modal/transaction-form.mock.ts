import { Card } from './../../../core/domain/card/Card.domain';
import { TransactionForm } from './transaction-form-modal.component';

export const MOCK_TRANSACTION_FORM_CARDS: Card[] = [
  {
    card_number: '1111111111111111',
    cvv: 789,
    expiry_date: '01/18',
  },
  {
    card_number: '4111111111111234',
    cvv: 123,
    expiry_date: '01/20',
  },
];

export const MOCK_TRANSACTION_FORM_DATA: TransactionForm = {
  cards: MOCK_TRANSACTION_FORM_CARDS,
  card_number: '1111111111111111',
  value: '0.1',
  user: {
    id: 1,
    img: 'url',
    name: 'mock',
    username: 'mock@mock',
  },
};

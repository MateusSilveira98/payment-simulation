import { TransactionPayload } from './../../../core/domain/transaction/TransactionPayload.domain';
import { TransactionAPIResult } from './transaction.service';

export const MOCK_PAYLOAD: TransactionPayload = {
  card: {
    card_number: '1111111111111111',
    cvv: 789,
    expiry_date: '01/18',
  },
  destination_user_id: 1,
  value: 11111,
};

export const MOCK_TRANSACTION: TransactionAPIResult = {
  transaction: {
    id: 1,
    timestamp: 1111111,
    value: 11111,
    destination_user: {
      id: 1,
      img: 'url',
      name: 'mock',
      username: 'mock@mock',
    },
    success: true,
    status: '200',
  },
};

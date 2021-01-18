import { User } from './../user/User.domain';
import { Card } from './../card/Card.domain';
export interface TransactionForm {
  value: number;
  card_number: string;
  cards?: Card[];
  user: User;
}

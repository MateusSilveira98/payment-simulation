import { Card } from './../card/Card.domain';

export interface TransactionPayload {
  // Card Info
  card: Card;

  // Destination User ID
  destination_user_id: number;

  // Value of the Transaction
  value: number;
}

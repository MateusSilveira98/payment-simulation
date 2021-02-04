import { User } from './../user/User.domain';

export interface Transaction {
  id: number;
  timestamp: number;
  value: number;
  destination_user: User;
  success: boolean;
  status: string;
}

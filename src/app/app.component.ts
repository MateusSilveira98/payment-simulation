import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/core/domain/transaction/Transaction.domain';
import { User } from 'src/app/core/domain/user/User.domain';
import { Card } from './core/domain/card/Card.domain';
import { TransactionPayload } from './core/domain/transaction/TransactionPayload.domain';
import { TransactionService } from './shared/services/transaction/transaction.service';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cards: Card[] = [
    // valid card
    {
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
    // invalid card
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
  ];

  users: Observable<User[]>;

  showTransactionModal = false;

  selectedUser: User;

  transactionForm: FormGroup;

  constructor(
    private userService: UserService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.users = this.userService.listUsers();

    this.transactionForm = this.formBuilder.group({
      value: [null],
      card_number: [null],
    });
  }

  openTransactionModal(user: User) {
    this.showTransactionModal = true;
    this.selectedUser = user;
  }

  sendTransaction() {
    const { value, card_number } = this.transactionForm.value;

    const card = this.cards.find((item) => item.card_number === card_number);

    const payload: TransactionPayload = {
      card,
      value,
      destination_user_id: this.selectedUser.id,
    };

    this.transactionService
      .postTransaction(payload)
      .subscribe((transaction: Transaction) => {
        alert(JSON.stringify(transaction));
      });
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/core/domain/transaction/Transaction.domain';
import { User } from 'src/app/core/domain/user/User.domain';
import { Card } from './core/domain/card/Card.domain';
import { TransactionPayload } from './core/domain/transaction/TransactionPayload.domain';
import { ResponseStatusMessage } from './core/enums/ResponseStatusMessage.enum';
import {
  TransactionForm,
  TransactionFormModalComponent
} from './shared/components/transaction-form-modal/transaction-form-modal.component';
import { TransactionService } from './shared/services/transaction/transaction.service';
import { UserService } from './shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cards: Card[] = [
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

  users$: Observable<User[]>;

  selectedUser: User;

  constructor(
    private userService: UserService,
    private transactionService: TransactionService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.listUsers();
  }

  openTransactionModal(
    user: User,
    transactionForm?: Partial<TransactionForm>
  ): void {
    this.selectedUser = user;

    const modalConfig: MatDialogConfig = {
      hasBackdrop: true,
      data: {
        cards: this.cards,
        user,
        ...transactionForm,
      },
    };

    const dialogRef = this.dialog.open(
      TransactionFormModalComponent,
      modalConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.sendTransaction(result);
      }
    });
  }

  sendTransaction(transactionFormValue: TransactionForm): void {
    const { value, card_number } = transactionFormValue;
    const card = this.cards.find((item) => item.card_number === card_number);

    const payload: TransactionPayload = {
      card,
      value: +value,
      destination_user_id: this.selectedUser.id,
    };

    const snackBarConfig: MatSnackBarConfig = {
      duration: 3000,
      verticalPosition: 'top',
    };

    this.transactionService.postTransaction(payload).subscribe(
      (transaction: Transaction) => {
        transaction.destination_user = this.selectedUser;
        this.snackBar.open(
          `${transaction.destination_user.name} foi pago com sucesso`,
          'fechar',
          snackBarConfig
        );
      },
      (error: HttpErrorResponse) => {
        this.snackBar
          .open(ResponseStatusMessage[error.status], 'fechar', snackBarConfig)
          .afterDismissed()
          .subscribe(() => {
            this.openTransactionModal(this.selectedUser, {
              value,
              card_number,
            });
          });
      }
    );
  }
}

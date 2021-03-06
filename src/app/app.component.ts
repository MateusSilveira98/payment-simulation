import {
  animate,
  animateChild,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppContext } from '@contexts/app/app-context.interface';
import { TransactionContext } from '@contexts/shared/services/transaction/transaction-context.interface';
import { Card } from '@core/domains/card/card.domain';
import { TransactionPayload } from '@core/domains/transaction/transaction-payload.domain';
import { Transaction } from '@core/domains/transaction/transaction.domain';
import { PaidUser } from '@core/domains/user/paid-user.domain';
import { User } from '@core/domains/user/user.domain';
import { TranslateService } from '@ngx-translate/core';
import {
  TransactionForm,
  TransactionFormModalComponent,
} from '@shared/components/transaction-form-modal/transaction-form-modal.component';
import { MOCK_TRANSACTION_FORM_CARDS } from '@shared/mocks/transaction/transaction-form.mock';
import { TransactionService } from '@shared/services/transaction/transaction.service';
import { UserFilter, UserService } from '@shared/services/user/user.service';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { APP_VOCABULARY } from './app.component.vocabulary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px',
          })
        ),
      ]),
    ]),
    trigger('list', [
      transition(':enter', [query('@items', stagger(300, animateChild()))]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  vocabulary: AppContext & TransactionContext = {
    ...APP_VOCABULARY,
    ...this.transactionService.vocabulary,
  };

  cards: Card[] = MOCK_TRANSACTION_FORM_CARDS;

  users$: Observable<PaidUser[]>;

  filteredUsers$: Observable<PaidUser[]>;

  isAlternateTheme$: Observable<boolean>;

  selectedUser: User;

  userFilter: UserFilter = UserFilter.ALL;

  userFilterKeys: string[] = this.userService.listUserFilterKeys();

  subscriptions = new Subscription();

  constructor(
    private userService: UserService,
    private transactionService: TransactionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.listUsers().pipe(
      shareReplay(),
      map((users): PaidUser[] =>
        users.map((user) => {
          return { ...user, isPaid: false };
        })
      )
    );

    this.filterUser(this.userFilter);
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
      cvv: card.cvv,
      expiry_date: card.expiry_date,
      card_number,
      value: +value,
      destination_user_id: this.selectedUser.id,
    };

    this.subscriptions.add(
      this.transactionService.postTransaction(payload).subscribe(
        () => {
          this.setUserToUserPaid(this.selectedUser);

          this.showSnackBarMessage(
            `${this.selectedUser.name} ${this.translateService.instant(
              this.vocabulary.success
            )}`,
            `${this.translateService.instant(
              this.vocabulary['snackBar-close']
            )}`
          );
        },
        (error: HttpErrorResponse) => {
          this.showSnackBarMessage(
            error.status.toString(),
            `${this.translateService.instant(
              this.vocabulary['snackBar-close']
            )}`
          )
            .afterDismissed()
            .subscribe(() => {
              this.openTransactionModal(this.selectedUser, {
                value,
                card_number,
              });
            });
        }
      )
    );
  }

  showSnackBarMessage(
    message: string,
    actionName: string
  ): MatSnackBarRef<SimpleSnackBar> {
    const snackBarConfig: MatSnackBarConfig = {
      duration: 1500,
      verticalPosition: 'top',
    };

    return this.snackBar.open(message, actionName, snackBarConfig);
  }

  getPaidUser(paidUser: User): Observable<boolean> {
    return this.users$.pipe(
      map(
        (users) =>
          !!users.find((user) => paidUser.id === user.id && user.isPaid)
      )
    );
  }

  filterUser(userFilter: UserFilter) {
    this.filteredUsers$ = this.users$.pipe(
      map((users) => {
        switch (userFilter) {
          case UserFilter.ALL:
            return users;
          case UserFilter.PAID:
            return users.filter((user) => user.isPaid);
          case UserFilter.PENDING:
            return users.filter((user) => !user.isPaid);
        }
      })
    );
  }

  setUserToUserPaid(selectedUser: User) {
    this.users$ = this.userService.editUserToPaidUser(
      selectedUser,
      this.users$
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

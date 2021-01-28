import { TransactionService } from './shared/services/transaction/transaction.service';
import { UserService } from './shared/services/user/user.service';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { MatDialog, MatSnackBar } from '@angular/material';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let element: DebugElement;

  let userService: any;
  let transactionService: any;
  let dialog: any;
  let snackBar: any;

  beforeEach(async(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['listUsers']);
    const transactionServiceSpy = jasmine.createSpyObj('TransactionService', [
      'postTransaction',
    ]);
    const dialogSpy = jasmine.createSpyObj('MatDialog', [
      'open',
      'afterClosed',
    ]);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', [
      'open',
      'afterDismissed',
    ]);
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: TransactionService, useValue: transactionServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        userService = TestBed.get(UserService);
        transactionService = TestBed.get(TransactionService);
        dialog = TestBed.get(MatDialog);
        snackBar = TestBed.get(MatSnackBar);
      });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should list users', () => {
    pending();
  });

  it('should open modal transaction modal', () => {
    pending();
  });

  it('should send transaction', () => {
    pending();
  });
});

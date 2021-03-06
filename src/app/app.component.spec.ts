import { APP_VOCABULARY } from './app.component.vocabulary';
import { TranslateService } from '@ngx-translate/core';
import { DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MOCK_TRANSACTION_FORM_DATA } from '@shared/mocks/transaction/transaction-form.mock';
import { MOCK_TRANSACTION } from '@shared/mocks/transaction/transaction.mock';
import { MOCK_PAID_USERS, MOCK_USERS } from '@shared/mocks/user/user.mock';
import { TransactionService } from '@shared/services/transaction/transaction.service';
import { UserFilter, UserService } from '@shared/services/user/user.service';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { TRANSACTION_SERVICE_VOCABULARY } from '@shared/services/transaction/transaction.service.vocabulary';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;

  let translateService: TranslateService;

  let userServiceSpy: jasmine.SpyObj<UserService>;
  let transactionServiceSpy: jasmine.SpyObj<TransactionService>;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'listUsers',
      'listUserFilterKeys',
      'editUserToPaidUser',
    ]);

    transactionServiceSpy = jasmine.createSpyObj('TransactionService', [
      'postTransaction',
      'vocabulary'
    ]);

    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: TransactionService, useValue: transactionServiceSpy },
        TranslateService,
      ],
    })
      .compileComponents()
      .then(() => {
        translateService = TestBed.get(TranslateService);
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
      });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should list users', () => {
    userServiceSpy.listUsers.and.returnValue(of(MOCK_USERS));
    fixture.detectChanges();

    const appUserCardList = debugElement.queryAll(By.css('app-user-card'));

    expect(appUserCardList.length).toBe(MOCK_USERS.length);
  });

  it('should post transaction', fakeAsync(() => {
    userServiceSpy.listUsers.and.returnValue(of(MOCK_USERS));
    userServiceSpy.editUserToPaidUser.and.returnValue(of(MOCK_PAID_USERS));
    expect(transactionServiceSpy.vocabulary).toBeTruthy();

    component.selectedUser = MOCK_USERS[0];

    component.vocabulary = {...APP_VOCABULARY, ...TRANSACTION_SERVICE_VOCABULARY};

    fixture.detectChanges();

    expect(component.vocabulary.success).toContain(TRANSACTION_SERVICE_VOCABULARY.success);

    transactionServiceSpy.postTransaction.and.returnValue(of(MOCK_TRANSACTION));
    fixture.detectChanges();
    component.sendTransaction(MOCK_TRANSACTION_FORM_DATA);

    fixture.detectChanges();

    component.setUserToUserPaid(MOCK_USERS[0]);

    fixture.detectChanges();

    flush();

    component.users$.toPromise().then((users) => {
      const userPaid = users.find((user) => MOCK_USERS[0].id === user.id);
      expect(userPaid.name).toEqual(MOCK_USERS[0].name);
      expect(userPaid.isPaid).toBe(true);
    });
  }));

  it('should filter user', () => {
    userServiceSpy.listUsers.and.returnValue(of(MOCK_USERS));
    userServiceSpy.editUserToPaidUser.and.returnValue(of(MOCK_PAID_USERS));

    fixture.detectChanges();

    component.setUserToUserPaid(MOCK_USERS[0]);

    fixture.detectChanges();

    component.filterUser(UserFilter.PAID);

    fixture.detectChanges();

    component.filteredUsers$.subscribe((filteredUsers) => {
      expect(filteredUsers).toBeTruthy();
      expect(filteredUsers[0].id).toBe(MOCK_USERS[0].id);
    });
  });
});

import { MOCK_TRANSACTION_API_RESULT } from './../../mocks/transaction/transaction.mock';
import { MOCK_TRANSACTION_PAYLOAD } from '../../mocks/transaction/transaction.mock';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import {
  TransactionService
} from './transaction.service';

describe('TransactionService', () => {
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let transactionService: TransactionService;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['post']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        TransactionService,
      ],
    });
    transactionService = TestBed.get(TransactionService);
  });

  it('should send post transaction', () => {
    apiServiceSpy.post.and.returnValue(of(MOCK_TRANSACTION_API_RESULT));
    transactionService.postTransaction(MOCK_TRANSACTION_PAYLOAD).subscribe((transaction) => {
      expect(transaction).toBeTruthy();
      expect(typeof transaction).toBe('object');
      expect(transaction.destination_user.id).toEqual(MOCK_TRANSACTION_PAYLOAD.destination_user_id);
    });
  });
});

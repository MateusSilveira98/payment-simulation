import { Injectable } from '@angular/core';
import { Transaction } from '@core/domain/transaction/Transaction.domain';
import { TransactionPayload } from '@core/domain/transaction/TransactionPayload.domain';
import { ApiService } from '@core/services/api/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



export interface TransactionAPIResult {
  transaction: Transaction;
}

@Injectable()
export class TransactionService {
  private endpoints = {
    post: '5d542ec72f000048248614b3',
  };

  constructor(private apiService: ApiService) {}

  postTransaction(
    transactionPayload: TransactionPayload
  ): Observable<Transaction> {
    return this.apiService
      .post<TransactionAPIResult | TransactionPayload>(
        `${this.endpoints.post}/${transactionPayload.destination_user_id}`,
        transactionPayload
      )
      .pipe(
        map((response: TransactionAPIResult): Transaction => {
          return response.transaction;
        })
      );
  }
}

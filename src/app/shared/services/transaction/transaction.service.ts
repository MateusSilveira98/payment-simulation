import { ApiService } from 'src/app/core/services/api.service';
import { TransactionPayload } from 'src/app/core/domain/transaction/TransactionPayload.domain';
import { Injectable } from '@angular/core';

import { Transaction } from 'src/app/core/domain/transaction/Transaction.domain';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


export interface TransactionAPIResult {
  transaction: Transaction;
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private endpoints = {
    post: '5d542ec72f000048248614b3',
  };

  constructor(public http: ApiService) {}

  postTransaction(
    transactionPayload: TransactionPayload
  ): Observable<Transaction> {
    return this.http
      .post<TransactionAPIResult | TransactionPayload>(
        this.endpoints.post,
        transactionPayload
      )
      .pipe(
        map((response: TransactionAPIResult): Transaction => {
          return response.transaction;
        })
      );
  }
}

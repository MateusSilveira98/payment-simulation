import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { User } from 'src/app/core/domain/user/User.domain';

@Injectable({ providedIn: 'root' })
export class UserService {
  private endpoints = {
    list: '5d531c4f2e0000620081ddce',
  };

  constructor(public http: ApiService) {}

  listUsers(): Observable<User[]> {
    return this.http.list<User[]>(this.endpoints.list);
  }
}
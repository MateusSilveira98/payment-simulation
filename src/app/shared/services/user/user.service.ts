import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api/api.service';
import { User } from '@core/domain/user/User.domain';

@Injectable()
export class UserService {
  private endpoints = {
    list: '5d531c4f2e0000620081ddce',
  };

  constructor(private apiService: ApiService) {}

  public listUsers(): Observable<User[]> {
    return this.apiService.list<User[]>(this.endpoints.list);
  }
}

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MOCK_USERS } from '../../mocks/user/user.mock';
import { UserService } from './user.service';

describe('UserService', () => {
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let userService: UserService;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['list']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        UserService,
      ],
    });
    userService = TestBed.get(UserService);
  });

  it('should retrive all users', () => {
    apiServiceSpy.list.and.returnValue(of(MOCK_USERS));
    userService.listUsers().subscribe((users) => {
      expect(users).toBeTruthy('No user returned');
      expect(users.length).toEqual(10, 'Unexpected users length');
      expect(users[0].name).toEqual('Mock User 1');
    });
  });
});

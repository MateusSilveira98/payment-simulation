import { ResponseStatusMessage } from './../../enums/ResponseStatusMessage.enum';
import { User } from './../../domain/user/User.domain';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/core/services/api/api.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    apiService = TestBed.get(ApiService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should send http get method', () => {
    apiService
      .list<{}>('someUrl')
      .subscribe((result) => expect(result).toEqual({}));

    const request = httpTestingController.expectOne('someUrl');

    expect(request.request.method).toEqual('GET');
    expect(request.request.body).toBe(null);

    request.flush({});
  });

  it('should send http post method', () => {
    apiService
      .post<{}>('someUrl', {})
      .subscribe((result) => expect(result).toEqual({}));

    const request = httpTestingController.expectOne('someUrl');

    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual({});

    request.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

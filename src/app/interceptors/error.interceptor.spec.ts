import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ErrorInterceptor } from './error.interceptor';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let interceptor: ErrorInterceptor;
  let routerMock: any;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [
        ErrorInterceptor,
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    interceptor = TestBed.inject(ErrorInterceptor);
    routerMock = { navigate: jasmine.createSpy('navigate') };
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should redirect to /error for 500 error', () => {
    httpClient.get('/test-url').subscribe({
      next: () => fail('should have failed with 500 error'),
      error: () => {
        expect(routerMock.navigate).toHaveBeenCalledWith(['/error']);
      }
    });
  });

  it('should not navigate for other error statuses', () => {
    const req = httpClient.get('/test');
    req.subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(403);
      }
    );

    const httpRequest = httpTestingController.expectOne('/test');
    httpRequest.flush('Forbidden', { status: 403, statusText: 'Forbidden' });

    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});

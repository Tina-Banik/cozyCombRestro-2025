import { TestBed } from '@angular/core/testing';

import { UserauthInterceptor } from './userauth.interceptor';

describe('UserauthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserauthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UserauthInterceptor = TestBed.inject(UserauthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

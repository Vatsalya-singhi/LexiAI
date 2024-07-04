import { TestBed } from '@angular/core/testing';

import { ServerEndpointsService } from './server-endpoints.service';

describe('ServerEndpointsService', () => {
  let service: ServerEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

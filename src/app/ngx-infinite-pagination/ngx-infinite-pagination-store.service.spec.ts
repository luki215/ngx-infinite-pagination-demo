import { TestBed } from '@angular/core/testing';

import { NgxInfinitePaginationStoreService } from './ngx-infinite-pagination-store.service';

describe('NgxInfinitePaginationStoreService', () => {
  let service: NgxInfinitePaginationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxInfinitePaginationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

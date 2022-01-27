import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxInfinitePaginationComponent } from './ngx-infinite-pagination.component';

describe('NgxInfinitePaginationComponent', () => {
  let component: NgxInfinitePaginationComponent;
  let fixture: ComponentFixture<NgxInfinitePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxInfinitePaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxInfinitePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

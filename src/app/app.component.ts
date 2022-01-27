import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {} from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxInfinitePaginationStoreService } from './ngx-infinite-pagination/ngx-infinite-pagination-store.service';
export interface Post {
  title: string;
  content: string;
}
export interface Paginated<T> {
  total_pages: number;
  data: T[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public posts$ = this.pagination.data$;

  constructor(private pagination: NgxInfinitePaginationStoreService) {}

  ngOnInit(): void {
    this.pagination.fetch({});
  }

  public fetchNext() {
    this.pagination.fetchNextPage();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Paginated, Post } from '../app.component';

interface FetchableError<T, E> {
  data?: T;
  state: 'error';
  error: E;
}

interface FetchableLoading<T> {
  data?: T;
  state: 'loading';
}

interface FetchableReady<T> {
  data: T;
  state: 'ready';
}

export type Fetchable<T, E> =
  | FetchableReady<T>
  | FetchableLoading<T>
  | FetchableError<T, E>;

type Params = { [key: string]: string };

@Injectable({
  providedIn: 'root',
})
export class NgxInfinitePaginationStoreService {
  private posts$ = new BehaviorSubject<Fetchable<Paginated<Post>, string>>({
    state: 'loading',
  });

  private params$ = new BehaviorSubject<Params>({});

  public get data$() {
    return this.posts$.asObservable();
  }

  private endpoint = `${environment.api}items`;
  constructor(private http: HttpClient) {}

  public fetch(params: Params) {
    this.params$.next(params);
    this.posts$.next({ ...this.posts$.value, state: 'loading' });
    this.http
      .get<Paginated<Post>>(this.endpoint, params)
      .pipe(delay(2000))
      .subscribe((res) => {
        this.posts$.next({
          state: 'ready',
          data: res,
        });
      });
  }

  public fetchNextPage() {
    this.params$.next({
      ...this.params$.value,
      page: (this.params$.value.page ?? 1) + 1,
    });

    this.posts$.next({
      state: 'loading',
      data: this.posts$.value.data,
    });

    this.http
      .get<Paginated<Post>>(this.endpoint, { params: this.params$.value })
      .pipe(delay(2000))
      .subscribe((res) => {
        this.posts$.next({
          state: 'ready',
          data: {
            data: [...(this.posts$.value.data?.data ?? []), ...res.data],
            total_pages: res.total_pages,
          },
        });
      });
  }
}

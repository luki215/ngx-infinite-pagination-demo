import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Host,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Paginated } from '../app.component';
import { Fetchable } from './ngx-infinite-pagination-store.service';

export interface PaginateDirectiveContext<U, E> {
  $implicit: U[];
  data: Fetchable<Paginated<U>, E>;
  error: E | null;
}

@Directive({
  selector: '[paginate]',
  providers: [],
})
export class PaginateDirective<T extends Fetchable<Paginated<U>, E>, E, U>
  implements OnInit
{
  static ngTemplateContextGuard<T extends Fetchable<Paginated<U>, E>, E, U>(
    dir: PaginateDirective<T, E, U>,
    ctx: unknown
  ): ctx is PaginateDirectiveContext<U, E> {
    return true;
  }

  private paginateSourceObs!: Observable<Fetchable<Paginated<U>, E>>;
  private paginateSourceObsChanged = false;
  private view: EmbeddedViewRef<PaginateDirectiveContext<U, E>> | undefined;

  @Input() public set paginate(obs: Observable<Fetchable<Paginated<U>, E>>) {
    this.paginateSourceObs = obs;
    this.paginateSourceObsChanged = true;
  }

  constructor(
    private templateRef: TemplateRef<PaginateDirectiveContext<U, E>>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    if (this.paginateSourceObsChanged) {
      this.paginateSourceObs.subscribe((res) => {
        let context: PaginateDirectiveContext<U, E> = {
          $implicit: res.data?.data ?? [],
          error: res.state == 'error' ? res.error : null,
          data: res,
        };

        if (!this.view) {
          this.view = this.viewContainer.createEmbeddedView(
            this.templateRef,
            context
          );
        } else {
          this.view.context = context;
          this.view.markForCheck();
        }
      });
      this.paginateSourceObsChanged = false;
    }
  }
}

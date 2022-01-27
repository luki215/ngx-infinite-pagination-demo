import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  TemplateRef,
  Host,
  AfterViewInit,
  ViewChild,
  ViewRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paginated } from '../app.component';
import { Fetchable } from './ngx-infinite-pagination-store.service';

@Component({
  selector: 'ngx-infinite-pagination',
  templateUrl: './ngx-infinite-pagination.component.html',
  styleUrls: ['./ngx-infinite-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxInfinitePaginationComponent<T, E>
  implements OnInit, AfterViewInit
{
  @Input('data') paginate!: Fetchable<Paginated<T>, E>;
  @ViewChild('fetchNextTrigger') fetchNextTrigger!: ElementRef;
  @Output() fetchNext = new EventEmitter<void>();

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    const options = {
      rootMargin: '0px 0px 0px 0px',
      threshold: [0],
    };
    const callback: IntersectionObserverCallback = (entries, observer) => {
      console.log(entries[0]);
      if (
        this.paginate.state !== 'loading' &&
        this.paginate.data?.data.length !== this.paginate.data?.total_pages &&
        entries[0].isIntersecting
      ) {
        // this.fetchNext.emit();
        this.paginate.data
        console.log('emit');
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.fetchNextTrigger.nativeElement);
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-placeholder',
  templateUrl: './card-placeholder.component.html',
  styleUrls: ['./card-placeholder.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPlaceholderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxInfinitePaginationComponent } from './ngx-infinite-pagination/ngx-infinite-pagination.component';

import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { PaginateDirective } from './ngx-infinite-pagination/paginate.directive';
import { CardPlaceholderComponent } from './card-placeholder/card-placeholder.component';
@NgModule({
  declarations: [AppComponent, NgxInfinitePaginationComponent, CardComponent, PaginateDirective, CardPlaceholderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

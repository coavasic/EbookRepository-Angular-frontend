import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EbookListComponent } from './ebook-list/ebook-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EbooksService } from './ebooks.service';
import { CategoryService } from './category.service';
import { CategoryListComponent } from './category-list/category-list.component';
import { EbookComponent } from './ebook/ebook.component';
import { LanguageService } from './language.service';
import { AppRoutingModule,routingComponent } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    routingComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [EbooksService,CategoryService,LanguageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

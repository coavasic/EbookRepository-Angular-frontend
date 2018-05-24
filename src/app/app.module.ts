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
import { UserService } from './user.service';
import { MyHttpInterceptor } from './my-http-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search.service';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    SignUpComponent,
    UserListComponent,
    SearchComponent,
    UserInfoComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [EbooksService,CategoryService,LanguageService,UserService,SearchService,{
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

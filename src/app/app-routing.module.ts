import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { EbookListComponent } from './ebook-list/ebook-list.component';
import { EbookComponent } from './ebook/ebook.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [

    {path:'categories',component:CategoryListComponent},
    {path: 'ebooks',component:EbookListComponent},
    {path: 'categories/:id',component: EbookListComponent},
    {path: 'ebooks/:id',component: EbookComponent},
    {path: 'sign-up',component: SignUpComponent},
    {path: 'login',component: LoginComponent},
    {path: '',redirectTo:'/ebooks',pathMatch:'full'},
    {path: 'users',component: UserListComponent},
    {path: 'search',component:SearchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent =[EbookListComponent,
                                CategoryListComponent,
                                EbookComponent,
                                SignUpComponent,
                                LoginComponent,
                                UserListComponent,
                                SearchComponent]


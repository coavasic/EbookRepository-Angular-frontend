import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { EbookListComponent } from './ebook-list/ebook-list.component';
import { EbookComponent } from './ebook/ebook.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserListComponent } from './user-list/user-list.component';
import { SearchComponent } from './search/search.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [

    {path:'categories',component:CategoryListComponent},
    {path: 'ebooks',component:EbookListComponent},
    {path: 'categories/:id',component: EbookListComponent},
    {path: 'ebooks/:id',component: EbookComponent},
    {path: 'sign-up',component: SignUpComponent},
    {path: '',redirectTo:'/ebooks',pathMatch:'full'},
    {path: 'users',component: UserListComponent},
    {path: 'search',component:SearchComponent},
    {path: 'myInfo',component:UserInfoComponent}

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
                                UserListComponent,
                                SearchComponent,
                                UserInfoComponent]


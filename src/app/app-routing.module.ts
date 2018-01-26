import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { EbookListComponent } from './ebook-list/ebook-list.component';
import { EbookComponent } from './ebook/ebook.component';

const routes: Routes = [

    {path:'categories',component:CategoryListComponent},
    {path: 'ebooks',component:EbookListComponent},
    {path: 'categories/:id',component: EbookListComponent},
    {path: 'ebooks/:id',component: EbookComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent =[EbookListComponent,
                                CategoryListComponent,
                                EbookComponent]


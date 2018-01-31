import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserPass } from '../model/UserPass';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private catService: CategoryService,
              private router: Router) { }

  categories=[];

  ngOnInit() {
    
    this.catService.getCategories().subscribe(
      data => this.categories=data
    )

  }


}

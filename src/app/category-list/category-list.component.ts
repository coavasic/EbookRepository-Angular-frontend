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
  showAddInput=false;

  ngOnInit() {
    
    this.getAllCats();

  }

  getAllCats(){
    this.catService.getCategories().subscribe(
      data => this.categories=data
    )
  }

  showInput(){
    this.showAddInput=!this.showAddInput;
  }

  addCat(catName){

    let cat={name: catName};
    console.log(cat);
    this.catService.addCategory(cat).subscribe(
      success=>{

        this.getAllCats();
        this.showAddInput=false;


      }
    )
    

  }


}

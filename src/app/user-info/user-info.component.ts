import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/User';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private userService: UserService,private catService: CategoryService) { }

  user: User;
  korisniciStigli = false;
  categoryName="";

  ngOnInit() {

    this.getMyInfo();

  }

  getMyInfo(){
    this.userService.getMyInfo().subscribe(
      user => {
        this.user = user;
        this.korisniciStigli = true;
        this.getCategoryName(user.categoryId);
      }
    )
  }

  getCategoryName(id){
    this.catService.getById(id).subscribe(
      category => {
        this.categoryName = category.name;
      },
      error =>{
        this.categoryName="Pristup svim kategorijama";
      }
    )
  }

}

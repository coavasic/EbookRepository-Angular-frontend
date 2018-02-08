import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/User';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private userService: UserService,private catService: CategoryService, private router: Router) { }

  user: User;
  korisniciStigli = false;
  categoryName="";
  categories=[];
  changePassDivHidden=false;
  changeInfoDivHidden=false;

  ngOnInit() {

    this.getMyInfo();
    this.getCategories();

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

  onSubmit(value){
    this.userService.changePassworD(value).subscribe(
      success=> {
        alert("Lozinka uspesno promenjena");
        this.changePassDivHidden=false;
        this.doLogout();
      },
      error =>
      {
        alert("Lozinke se moraju poklapati");
      }
    )
  }

  onSubmitInfo(value){
    this.userService.changeInfo(value).subscribe(
      success=> {
        alert("Informacije uspesno promenjene");
        this.changeInfoDivHidden=false;
        this.getMyInfo();
        this.doLogout();
      },
      error =>
      {
        alert("Username mora biti unique!");
      }
    )
  }

  changePass(){
    this.changePassDivHidden=!this.changePassDivHidden;
  }

  changeInfo(){
    this.changeInfoDivHidden=!this.changeInfoDivHidden;
  }

  getCategories(){
    this.catService.getCategories().subscribe( data => this.categories = data);
  }

  doLogout() {

    this.userService.logout().subscribe(data => { console.log("Logout success") });
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}

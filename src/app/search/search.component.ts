import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { UserService } from '../user.service';
import { CategoryService } from '../category.service';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService,
              private userService: UserService,
              private categoryService: CategoryService,
              private languageService: LanguageService) { }

  userLogged = false;
  isUserAdmin = false;
  myCategoryId = -1;

  kategorijeStigle = false;
  jeziciStigli = false


  ebooks = [];
  categories = [];
  languages = [];

  ngOnInit() {

    this.getCategories();
    this.getLanguages();
    this.checkIfUserLoggedIn();
  }

  search(value){

    let searchItem = {"value":value}
    this.searchService.searh(searchItem).subscribe(
      success => {
        this.ebooks = success;
      }
    )
  }


  checkIfUserLoggedIn() {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == undefined) {
      this.userLogged = false;
      console.log("Nije ulogovan");

    } else {
      this.userLogged = true;
      console.log(currentUser);
      this.getMyCategoryId();
      this.getMyRole();
    }
  }

  getMyCategoryId() {
    this.userService.getMyCatId().subscribe(
      success => {
        console.log("Locale string " + success.toLocaleString());
        this.myCategoryId = parseInt(success.toLocaleString());
      }
    )
  }

  getMyRole() {

    this.userService.getMyRole().subscribe(
      data => {
        let role = data.toLocaleString();
        console.log("ROLE  " + data);
        if (data == "admin") {
          this.isUserAdmin = true;
          console.log("Jeste admin");
        }
      }
    )
  }

  getCategories() {

    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
        this.kategorijeStigle = true;
      }
    )
  }

  getLanguages() {

    this.languageService.getAllLanguages().subscribe(
      data => {
        this.languages = data;
        this.jeziciStigli = true;
      }
    )
  }

  getCatName(id) {

    let catName = "";
    for (let cat of this.categories) {
      if (cat.id == id) {
        catName = cat.name;
      }
    }
    return catName;
  }



}

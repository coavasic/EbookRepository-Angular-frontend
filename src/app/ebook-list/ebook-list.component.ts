import { Component, OnInit } from '@angular/core';
import { EbooksService } from '../ebooks.service';
import { EbookDTO } from '../model/ebookDTO';
import { CategoryService } from '../category.service';
import { Category } from '../model/category';
import { saveAs } from "file-saver";
import { SlicePipe } from '@angular/common';
import { LanguageService } from '../language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'ebook-list',
  templateUrl: './ebook-list.component.html',
  styleUrls: ['./ebook-list.component.css']
})
export class EbookListComponent implements OnInit {
  isInputDivHidden = false;
  isDisabled = true;
  constructor(private ebookService: EbooksService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }



  // creating initial list of objests

  ebooks = [];
  categories = [];
  languages = [];


  fileToUpload: File = null;
  author: string;
  title: string;
  year: number;
  keywords: string;
  mime: string;
  ebook: EbookDTO;
  kategorijeStigle = false;
  jeziciStigli = false;
  isCategoryFiltered = false;
  userLogged = false;
  selectedCategoryValue = "all";
  selectedCategoryId = 1;
  //defualt is first select options
  selectedLanguageId = 1;
  myCategoryId = -1;
  isUserAdmin = false;

  ngOnInit() {

    this.getCategories();
    this.getEbooks();
    this.getLanguages();
    this.checkIfUserLoggedIn();

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




  goToLogin() {
    this.router.navigate(['/login'])
  }

  getEbooks() {
    this.ebookService.getAllEbooks().subscribe(

      data => {
        this.ebooks = data;
      }
    )
  }

  getByCategory(id) {

    this.ebookService.getEbooksByCategory(id).subscribe(
      data => {
        this.ebooks = data;
        console.log(data);
      },
      error => {
        console.log(error.message);
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

  handleFileInput(files: FileList) {

    this.fileToUpload = files.item(0);
  }

  uploadFileToServer() {

    this.ebookService.postFile(this.fileToUpload).subscribe(data => {
      this.ebook = data;
      this.isInputDivHidden = true;
    },
      error => {
        alert("Izabrani fajl nije validan!");
      }
    )
  }

  ebookUpload(title, author, year, keywords, mime, fileName) {

    let newEbook: EbookDTO = { id: "", title: title, author: author, publicationYear: year, keywords: keywords, fileName: fileName, categoryId: this.selectedCategoryId, languageId: this.selectedLanguageId }
    console.log(newEbook);
    this.ebookService.postEbook(newEbook).subscribe(
      data => {

        this.isInputDivHidden = false;

        if (this.isCategoryFiltered) {
          this.getByCategory(this.selectedCategoryId)
        }
        this.getEbooks();

      },
      error => {
        alert(error.message);
      }
    );


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


  selectSetCategory(value) {

    if (value === "all") {

      this.isCategoryFiltered = false;
      this.selectedCategoryId = 1;
      this.getEbooks();

    } else {

      this.selectedCategoryId = value;
      this.isCategoryFiltered = true;
      this.getByCategory(value);
    }
  }

  //handle (change) event of select element to have selected object id
  setCategory(id) {

    this.selectedCategoryId = id;
  }

  setLangueage(id) {

    this.selectedLanguageId = id;
  }

  download(fileName) {

    fileName.slice
    this.ebookService.downloadBook(fileName).subscribe(
      data => {
        this.downloadFile(data, fileName);
      },
      error => {
        alert(error.message);
      }
    )
  }

  downloadFile(data, fileName) {

    var blob = new Blob([data], { type: 'application/pdf' });
    saveAs(blob, fileName);
  }

  deleteBook(id) {

    this.ebookService.deleteEbook(id).subscribe(
      data => {
        if (!this.isCategoryFiltered) {
          console.log("kurac");
          this.getEbooks();
          this.selectedCategoryId = 1;
        } else {
          this.getByCategory(this.selectedCategoryId);
        }
      }
    )
  }


  goToEBook(id) {

    console.log(id);
    this.router.navigate(['/ebooks', id]);
  }

  
}

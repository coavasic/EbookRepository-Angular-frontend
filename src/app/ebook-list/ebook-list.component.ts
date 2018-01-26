import { Component, OnInit } from '@angular/core';
import { EbooksService } from '../ebooks.service';
import { EbookDTO } from '../model/ebookDTO';
import { CategoryService } from '../category.service';
import { Category } from '../model/category';
import {saveAs} from "file-saver";
import { SlicePipe } from '@angular/common';
import { LanguageService } from '../language.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'ebook-list',
  templateUrl: './ebook-list.component.html',
  styleUrls: ['./ebook-list.component.css']
})
export class EbookListComponent implements OnInit {
  isInputDivHidden=false;
  isDisabled=true;
  constructor(private ebookService: EbooksService,
              private categoryService: CategoryService,
              private languageService: LanguageService,
              private route: ActivatedRoute,
              private router: Router) { }



  // creating initial list of objests
  
  ebooks = [];
  categories=[];
  languages=[];


  fileToUpload: File = null;
  author:string;
  title: string;
  year: number;
  keywords: string;
  mime: string;
  ebook: EbookDTO;



  kategorijeStigle=false;
  jeziciStigli=false;
  isCategoryFiltered=false;


  selectedCategoryValue="all";
  selectedCategoryId=1;

  //defualt is first select options
  selectedLanguageId=1;


  
  
   





  ngOnInit() {

    this.getCategories();
    this.getEbooks();
    this.getLanguages();


    
  }




  getEbooks(){
    this.ebookService.getAllEbooks().subscribe(

      data => {
        this.ebooks = data;
      }
    )
  }

  getByCategory(id){

    this.ebookService.getEbooksByCategory(id).subscribe(
      data => {
        this.ebooks = data;
        console.log(data);
      },
      error=> {
        console.log(error.message);
      }
    )

  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
        this.kategorijeStigle=true;
      }
    )
  }

  getLanguages(){

    this.languageService.getAllLanguages().subscribe(
      data => {
        this.languages = data;
        this.jeziciStigli=true;
      }
    )

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

uploadFileToServer(){

  
  

  this.ebookService.postFile(this.fileToUpload).subscribe(data =>{

    this.ebook=data;
    this.isInputDivHidden=true;
    

  },
  error=>{
    alert("Izabrani fajl nije validan!");
  }
)
}

ebookUpload(title,author,year,keywords,mime,fileName){

  let newEbook: EbookDTO = {id:"",title:title,author:author,publicationYear:year,keywords:keywords,mime:mime,fileName:fileName,categoryId:this.selectedCategoryId,languageId:this.selectedLanguageId}
  console.log(newEbook);
  this.ebookService.postEbook(newEbook).subscribe(
    data => {      

      this.isInputDivHidden=false;

      if(this.isCategoryFiltered){
        this.getByCategory(this.selectedCategoryId)
      }
      this.getEbooks();

    },
    error =>{
      alert(error.message);
    }
  );
  
  
}


selectSetCategory(value){
  

  if(value==="all"){

    this.isCategoryFiltered=false;
    this.selectedCategoryId=1;
    this.getEbooks();

  }else{

    this.selectedCategoryId=value;
    this.isCategoryFiltered=true;
    this.getByCategory(value);

  }


}

//handle (change) event of select element to have selected object id
setCategory(id){

  this.selectedCategoryId = id;  

}

setLangueage(id){
  this.selectedLanguageId=id;
}

download(fileName){

  fileName.slice

  this.ebookService.downloadBook(fileName).subscribe(
    data => {
      this.downloadFile(data,fileName);
      
    },
    error =>{

      alert(error.message);

    }

  )

}

downloadFile(data,fileName){
  var blob = new Blob([data], { type: 'application/pdf' });
  saveAs(blob,fileName);
  
}

deleteBook(id){

  this.ebookService.deleteEbook(id).subscribe(
    data=> {
      if(!this.isCategoryFiltered){
        console.log("kurac");
      this.getEbooks();
      this.selectedCategoryId=1;
      }else {
      this.getByCategory(this.selectedCategoryId);
      }
    }

  )

}


goToEBook(id){
  console.log(id);
  this.router.navigate(['/ebooks',id]);

}



}

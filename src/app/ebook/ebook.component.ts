import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router } from '@angular/router';
import { EbooksService } from '../ebooks.service';
import { EbookDTO } from '../model/ebookDTO';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.component.html',
  styleUrls: ['./ebook.component.css']
})
export class EbookComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private ebookService: EbooksService,
              private router: Router) { }

  ebookId;
  ebook: EbookDTO;
  author:string;
  title: string;
  year: number;
  keywords: string;
  mime: string;
  selectedCategoryId;
  selectedLanguageId;
  stiglo=false;

  ngOnInit() {

    this.ebookId = this.route.snapshot.paramMap.get('id');
    
    this.ebookService.getById(this.ebookId).subscribe(
      data => {

        this.ebook = data;
        this.selectedCategoryId = data.categoryId;
        this.selectedLanguageId = data.languageId;
        this.stiglo = true;

      }
    )

  }

  ebookUpdate(title,author,year,keywords,mime,fileName){

    let newEbook: EbookDTO = {id:"",title:title,author:author,publicationYear:year,keywords:keywords,mime:mime,fileName:fileName,categoryId:this.selectedCategoryId,languageId:this.selectedLanguageId}
    console.log(newEbook);
    this.ebookService.updateEbook(this.ebookId,newEbook).subscribe(
      data => {      

        this.router.navigate(['/ebooks']);
  
      },
      error =>{
        alert(error.message);
      }
    );
    
    
  }

}

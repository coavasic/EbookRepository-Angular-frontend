import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {HttpClient,HttpErrorResponse } from '@angular/common/http'
import { EbookDTO } from './model/ebookDTO';
import { RequestOptions , ResponseContentType,Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { error } from 'selenium-webdriver';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class EbooksService {

  url = "http://localhost:8080/api/ebooks/all";
  uploadUrl = "http://localhost:8080/api/ebooks/check"
  urlPost = "http://localhost:8080/api/ebooks/dodaj"
  urlDownload = "http://localhost:8080/api/ebooks/download/"
  urlByCat= "http://localhost:8080/api/ebooks/bycategory/"
  urlDelete = "http://localhost:8080/api/ebooks/delete/";
  urlBase= "http://localhost:8080/api/ebooks/";


  constructor(private _http: HttpClient) { }

  getAllEbooks(){

    return this._http.get<EbookDTO[]>(this.url);

  }

  postFile(fileToUpload: File) {
    const endpoint = this.uploadUrl;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this._http
      .post<EbookDTO>(endpoint, formData);

     
     
}

postEbook(ebook){
  return this._http.post<EbookDTO>(this.urlPost,ebook)
}

downloadBook(path){
  return this._http.get(this.urlDownload+path,{responseType: 'blob'})

}

getEbooksByCategory(id){
  return this._http.get<EbookDTO[]>(this.urlByCat+id);
}

deleteEbook(id){
  return this._http.delete(this.urlDelete+id);
}


errorFunction( error: HttpErrorResponse ){
			
  return Observable.throw(error.message || "Server error");

}

getById(id){

  return this._http.get<EbookDTO>(this.urlBase+id);

}

updateEbook(id, data){
  return this._http.put(this.urlBase+"update/"+id,data);
}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Langueage } from './model/language';

@Injectable()
export class LanguageService {


  getAllUrl = "http://localhost:8080/open/languages/all";
  constructor(private http: HttpClient) { }

  getAllLanguages(){
    return this.http.get<Langueage[]>(this.getAllUrl);
  }

}

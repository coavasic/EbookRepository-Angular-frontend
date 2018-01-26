import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './model/category';

@Injectable()
export class CategoryService {

  url="http://localhost:8080/api/categories/all";
  constructor(private _http: HttpClient) { }

  getCategories(){

    return this._http.get<Category[]>(this.url);

  }


}

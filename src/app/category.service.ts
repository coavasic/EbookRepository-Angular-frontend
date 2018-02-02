import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './model/category';

@Injectable()
export class CategoryService {

  url = "http://localhost:8080/open/categories/all";
  urlAdd = "http://localhost:8080/api/categories/add";
  urlUpdate = "http://localhost:8080/api/categories/edit";
  urlDelete = "http://localhost:8080/api/categories/delete/"
  constructor(private _http: HttpClient) { }

  getCategories() {
    return this._http.get<Category[]>(this.url);
  }

  addCategory(category) {
    return this._http.post(this.urlAdd, category);
  }

  updateCategory(category) {
    return this._http.post(this.urlUpdate, category);
  }

  deleteCategory(id) {
    return this._http.get(this.urlDelete + id);
  }

}

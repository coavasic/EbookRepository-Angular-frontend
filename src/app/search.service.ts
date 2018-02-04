import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EbookDTO } from './model/ebookDTO';

@Injectable()
export class SearchService {

  constructor(private _http: HttpClient) { }

  searh(searhItem){

    return  this._http.post<EbookDTO[]>("http://localhost:8080/open/search/queryParser",searhItem);

  }

}

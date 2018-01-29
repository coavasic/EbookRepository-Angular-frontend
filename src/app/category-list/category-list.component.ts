import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserPass } from '../model/UserPass';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {

  }


}

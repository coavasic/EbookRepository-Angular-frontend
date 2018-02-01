import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userService: UserService, private catService: CategoryService,
    private router: Router) { }

  categories = [];

  ngOnInit() {

    this.catService.getCategories().subscribe(
      success => {
        this.categories = success;
      }
    )
  }

  onSubmit(user) {
    console.log(user)
    this.userService.signUp(user).subscribe(
      success => {
        alert("OCE");
        this.router.navigate(['/login']);
      }
    )
  }

  toLogin() {
    this.router.navigate(['/login'])
  }


}

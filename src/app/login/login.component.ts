import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

  }

  onSubmit(loginInfo) {
    console.log(loginInfo);

    this.userService.doLogin(loginInfo).subscribe(
      data => {
        console.log("OCE");
        let token = data.headers.get("Authorization")
        console.log(data.headers.get("Authorization"));
        localStorage.setItem('currentUser', JSON.stringify({ token: token, name: loginInfo.username }));


        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token1 = currentUser.token;
        console.log("Token je haha: " + token1);

        this.router.navigate(['/ebooks']);


      },
      error => alert("Wrong username or password")
    )

  }


  toSignUp() {
    this.router.navigate(['/sign-up']);
  }

}

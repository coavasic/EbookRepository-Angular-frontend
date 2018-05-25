import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { UserService } from './user.service';
import * as $ from 'jquery';
import { EbooksService } from './ebooks.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private userService: UserService,private ebookService:EbooksService) { }

  isLoggedIn = false;
  isAdmin = false;
  currentUsername = "";


  ngOnInit() {

    this.checkIfUserLoggedIn();
    this.checkMyRole();
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
  };
  
  this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
          this.router.navigated = false;
          window.scrollTo(0, 0);
      }
  });

  }

  checkIfUserLoggedIn() {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == undefined) {
      this.isLoggedIn = false;
      console.log("Nije ulogovan");

    } else if (currentUser) {
      this.isLoggedIn = true;
      this.currentUsername = currentUser.name;
      console.log(currentUser);

    }
  }

  checkMyRole() {
    this.userService.getMyRole().subscribe(
      data => {
        let role = data.toLocaleString();
        console.log("ROLE  " + data);
        if (data == "admin") {
          this.isAdmin = true;
          console.log("Jeste admin");

        }
      }
    )
  }

  doLogout() {

    this.userService.logout().subscribe(data => { console.log("Logout success") });
    localStorage.clear();
    this.checkIfUserLoggedIn();
    this.router.navigate(['/ebooks']);

  }

  onSubmitLogin(loginInfo){

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
          $("#loginModal .close").click()
          this.checkIfUserLoggedIn();
          this.checkMyRole();
          this.router.navigate(['/ebooks']);
  
  
        },
        error => alert("Wrong username or password")
      )
  
    
   }

   doReindex(){
      this.ebookService.reindex().subscribe(
        success => alert("Reindex is successful"),
        error => alert("Reindex failed")
      )
   }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private router: Router,private userService: UserService){}

  isLoggedIn=false;
  isAdmin=false;
  currentUsername="";

  
  ngOnInit(){

    this.checkIfUserLoggedIn();
    this.checkMyRole();

  }


  checkIfUserLoggedIn(){

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser==undefined){
      this.isLoggedIn=false;
      console.log("Nije ulogovan");
      

    }else if(currentUser){
      this.isLoggedIn=true;
      this.currentUsername=currentUser.name;
      console.log(currentUser);     

    }


  }

  checkMyRole(){
    this.userService.getMyRole().subscribe(
      data => {
       let role = data.toLocaleString();
        console.log("ROLE  " +data);
        if(data=="admin"){
          this.isAdmin=true;
          console.log("Jeste admin");

        }}
      
    )
  
  }

  doLogout(){

    this.userService.logout().subscribe(data => {console.log("Logout success")});
    localStorage.clear();
    this.checkIfUserLoggedIn();
    this.router.navigate(['/ebooks']);

  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) { }
  users= [];

  ngOnInit() {
    this.getUsers();
  
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      users=> this.users = users
    )
  }

  promote(username) {
    if(confirm("Are you sure?")){
      this.userService.promote(username).subscribe(
        success=>{
          this.getUsers();
        }
      )
    }
  }


}

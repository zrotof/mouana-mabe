import { Component, OnInit } from '@angular/core';
import { AuthService } from '@mouanamabe/users';

@Component({
  selector: 'eshop-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log("yes")
  }

  logoutUser(){
    this.authService.logout();
  }

}

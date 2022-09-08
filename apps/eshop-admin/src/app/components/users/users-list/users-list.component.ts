import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService, User } from '@mouanamabe/users';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class UsersListComponent implements OnInit {

  usersList : User[] = []

  constructor(
    private usersServices : UsersService, 
    private messageService : MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.usersServices.getUsers().subscribe(
      (result: any)=>{
        if(result.success){
          if(result.message.length == 0) {
            this.usersList = result.message;
            this.messageService.add({ detail: 'Cette catégorie ne possède pas encore de produits'});
          }
          else{
            this.usersList = result.message;
          }
        }
      },
      (err =>{
        this.messageService.add({severity:'info', detail: 'Erreur contactez le webmaster'});
      })
    )   
  }

  editUser(userId: string){

  }

  deleteUser(userId: string){

  }
}

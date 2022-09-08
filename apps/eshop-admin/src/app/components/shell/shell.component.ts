import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eshop-admin-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("yes");

  }


}

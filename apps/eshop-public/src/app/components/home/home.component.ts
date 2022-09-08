import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@mouanamabe/products';

@Component({
  selector: 'eshop-public-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  topCategoriesList : Category[] = [];

  constructor(private categoryServices: CategoriesService) { }

  ngOnInit(): void {

   console.log('');

  }


}

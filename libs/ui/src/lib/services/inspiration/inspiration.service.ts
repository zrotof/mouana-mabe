import { Injectable } from '@angular/core';
import { Inspiration, InspirationControl } from '../../models/inspiration';

@Injectable({
  providedIn: 'root'
})
export class InspirationService {

  constructor() {
    //
   }


  getInspirationControlsData(){
    let inspirationControlList : InspirationControl[] = [];

    return inspirationControlList = [
      {
        imageUrl: '../../assets/img/banner-man.png',
        imageAlt: 'mouana mabe men dresses',
        name: 'hommes'
      },
      {
        imageUrl: '../../assets/img/banner-woman.png',
        imageAlt: 'mouana mabe women dresses',
        name: 'femmes'
      },
      {
        imageUrl: '../../assets/img/banner-children.png',
        imageAlt: 'mouana mabe children dresses',
        name: 'enfants'
      }
    ]
  }

  getInspirantData(){

    let inspirantList : Inspiration ;

    return inspirantList = {

      hommes:[
        {
          imageUrl: '../../assets/img/men-fashion-one.jpeg',
          imageAlt: 'mouana mabe men dresses'
        },

        {
          imageUrl: '../../assets/img/men-fashion-two.jpeg',
          imageAlt: 'mouana mabe men dresses'
        },

        {
          imageUrl: '../../assets/img/men-fashion-three.jpeg',
          imageAlt: 'mouana mabe men dresses'
        }
      ]
      ,
      femmes: [

        {
          imageUrl: '../../../assets/img/women-fashion-one.png',
          imageAlt: 'mouana mabe women dresses'
        },

        {
          imageUrl: '../../assets/img/women-fashion-two.jpeg',
          imageAlt: 'mouana mabe women dresses'
        },

        {
          imageUrl: '../../assets/img/women-fashion-three.jpeg',
          imageAlt: 'mouana mabe women dresses'
        }
      ],
      enfants: [

        {
          imageUrl: '../../assets/img/children-fashion-one.jpeg',
          imageAlt: 'mouana mabe children dresses'
        },

        {
          imageUrl: '../../assets/img/children-fashion-two.jpeg',
          imageAlt: 'mouana mabe children dresses'
        },

        {
          imageUrl: '../../assets/img/children-fashion-three.jpeg',
          imageAlt: 'mouana mabe children dresses'
        }
      ]
    }
  }
}

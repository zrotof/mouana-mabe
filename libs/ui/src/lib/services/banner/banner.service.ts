import { Injectable } from '@angular/core';
import { Slide } from '../../models/slide';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor() { 
    //
  }

  getBannerData(){
    let slidesList : Slide[] = [];

    return slidesList = [
      {
        title:"Mouana Mabe Paris",
        subtitle:"Découvrez nos meilleures ventes et reveiller le style en vous !",
        buttonText:"Top Ventes",
        imageUrl: "../../../assets/img/banner-man.png",
        imageAlt:"mouana mabe top product",
        link:'men'
      }
    ]
  }
}

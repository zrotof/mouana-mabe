import { Component, ViewEncapsulation, ViewChild, OnInit } from "@angular/core";
import { SwiperComponent } from "swiper/angular";
import { Inspiration, InspirationControl, InspirationModel } from '../../models/inspiration'
// import Swiper core and required modules
import SwiperCore, { EffectCube, Pagination } from "swiper";
import { InspirationService } from "../../services/inspiration/inspiration.service";
import { BehaviorSubject } from "rxjs";

// install Swiper modules
SwiperCore.use([EffectCube, Pagination]);
@Component({
  selector: 'ui-inspirations',
  templateUrl: './inspirations.component.html',
  styleUrls: ['./inspirations.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class InspirationsComponent implements OnInit {

  inspirationControlsList : InspirationControl[] = [];
  inspirantImages0bject!: Inspiration ;
  inspirantImagesList!: InspirationModel[];
  //$ : BehaviorSubject<InspirationModel[]> = new BehaviorSubject(this.getCart());

  constructor(
    private inspirationService: InspirationService
  ) {
    //
   }

  ngOnInit(): void {
    
    this.getInspirationControls();
    this.initInspirantImages();
  }

  //get data of controls for the cubic slider
  getInspirationControls(){
    this.inspirationControlsList = this.inspirationService.getInspirationControlsData();
  }

   //get data of controls for the cubic slider
  initInspirantImages(){
    this.inspirantImages0bject = this.inspirationService.getInspirantData();
    this.inspirantImagesList = this.inspirantImages0bject.hommes;
    console.log(this.inspirantImagesList);
  }

  //get inspirant Styles images
  showInspirantImages(param: string, index: number){

    if(param === 'hommes'){
      this.inspirantImagesList = this.inspirantImages0bject.hommes;
    }

    if(param === 'femmes'){
      this.inspirantImagesList = this.inspirantImages0bject.femmes;
    }

    if(param === 'enfants'){
      this.inspirantImagesList = this.inspirantImages0bject.enfants;
    }

    const controlsImage = <NodeListOf<HTMLElement>>document.querySelectorAll('.slide-control img')
    const controlsName = <NodeListOf<HTMLElement>>document.querySelectorAll('.slide-control span')

    //Remove active signs on image and name
    controlsImage.forEach(element =>{
      element.classList.remove("active-control-image");
    })

    controlsName.forEach(element =>{
      element.classList.remove("active-control-name");
    })

    //Add active signs on the clicked controls image and name
    controlsImage[index].classList.add("active-control-image");
    controlsName[index].classList.add("active-control-name");
    
    
  }



}

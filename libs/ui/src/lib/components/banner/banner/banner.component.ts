import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { Slide } from '../../../models/slide';
import { BannerService } from '../../../services/banner/banner.service';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination, Navigation  } from "swiper";
import { Router } from '@angular/router';

SwiperCore.use([Pagination, Navigation])

@Component({
  selector: 'ui-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class BannerComponent implements OnInit {

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;


  slidesList: Slide[] =[];

  constructor(
    private slideService : BannerService,
    private router: Router
    ){

  }

  ngOnInit(): void {
    this.initSlides();
    }

  initSlides(){
    this.slidesList = this.slideService.getBannerData();
  }

  arrowSlide(param: number){

    if(param > 0){
      this.swiper?.swiperRef.slideNext(700);
      console.log('inside');
    }
    else{
      this.swiper?.swiperRef.slidePrev(700);
    }
  }

  navigateTo(param: string){

    console.log(param)
    if(param === 'men'){
      this.router.navigateByUrl('/hommes');
      console.log('inside men')

    }

    if(param === 'women'){
      this.router.navigateByUrl('/');
    }

    if(param === 'children'){
      this.router.navigateByUrl('/');
    }
  }

}

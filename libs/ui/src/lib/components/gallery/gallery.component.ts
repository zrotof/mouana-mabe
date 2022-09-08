import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
@Input() imagesUrl: string[] = [];


quantity = 1;

currentImageUrl = '';
  constructor() {
    //
   }

  ngOnInit(): void {

    this.currentImageUrl = this.imagesUrl[0];
  }

  changeCurrentImage(imageUrl: string){
    this.currentImageUrl = imageUrl;
  }


}

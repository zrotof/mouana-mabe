import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner/banner.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SwiperModule } from 'swiper/angular';
import { InspirationsComponent } from './components/inspirations/inspirations.component';
import { NewletterComponent } from './components/newletter/newletter.component';
import { FacitiesAdvisesComponent } from './components/facities-advises/facities-advises.component';
@NgModule({
    imports: [
      CommonModule,
      SwiperModule
    ],
    declarations: [
      BannerComponent,
      GalleryComponent,
      InspirationsComponent,
      NewletterComponent,
      FacitiesAdvisesComponent
    ],
    exports: [
      BannerComponent,
      GalleryComponent,
      InspirationsComponent,
      NewletterComponent,
      FacitiesAdvisesComponent
    ]
})
export class UiModule {}

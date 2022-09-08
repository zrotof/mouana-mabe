import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { TopProductsComponent } from './components/top-products/top-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FilterComponent } from './components/filter/filter.component';
import { PageProductsComponent } from './components/page-products/page-products.component';
import { ForWhoComponent } from './components/for-who/for-who.component';
import {DividerModule} from 'primeng/divider';
import {CheckboxModule} from 'primeng/checkbox';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { UiModule } from '@mouanamabe/ui';
import { FormsModule } from '@angular/forms';
import {TooltipModule} from 'primeng/tooltip';

const routes: Routes = [
  {
    path:'hommes',
    component: PageProductsComponent
  },
  {
    path:'produits/:productid',
    component: ProductDetailsComponent
  }
];



@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      CarouselModule,
      CheckboxModule,
      DividerModule,
      InputNumberModule,
      UiModule,
      TooltipModule
    ],
    declarations: [
      CategoriesBannerComponent,
      ProductItemComponent,
      PageProductsComponent,
      FilterComponent,
      TopProductsComponent,
      ForWhoComponent,
      ProductDetailsComponent,
    ],
    exports: [
      CategoriesBannerComponent,
      TopProductsComponent,
      ProductItemComponent,
      PageProductsComponent,
      FilterComponent,
      ForWhoComponent,
      ProductDetailsComponent
      
    ]
})
export class ProductsModule {}

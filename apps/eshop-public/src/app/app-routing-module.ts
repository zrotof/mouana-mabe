import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes : Routes = [
    {
        path: '', 
        component: HomeComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }

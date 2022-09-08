import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@mouanamabe/users';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { CategoryAddEditFormComponent } from './components/categories/category-add-edit-form/category-add-edit-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductAddEditFormComponent } from './components/products/product-add-edit-form/product-add-edit-form.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ShellComponent } from './components/shell/shell.component';
import { UserAddEditComponent } from './components/users/user-add-edit/user-add-edit.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

const routes : Routes = [
    {path: '', 
    component: ShellComponent,
    canActivate: [AuthGuard],
        children:[
            {
                path:'',
                component: DashboardComponent
            },
            {
                path:'catégories',
                component: CategoriesListComponent
            },
            {
                path: 'categories/créer-catégorie',
                component: CategoryAddEditFormComponent
            },
            {
                path: 'categories/modifier-catégorie/:id',
                component: CategoryAddEditFormComponent
            },
            {
                path:'produits',
                component: ProductsListComponent
            },
            {
                path: 'produits/créer-produit',
                component: ProductAddEditFormComponent
            },
            {
                path: 'produits/modifier-produit/:id',
                component: ProductAddEditFormComponent
            },
            {
                path:'utilisateurs',
                component: UsersListComponent
            },
            {
                path: 'utilisateurs/créer-utilisateur',
                component: UserAddEditComponent
            },
            {
                path: 'utilisateurs/modifier-utilisateur/:id',
                component: UserAddEditComponent
            }

        ]
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { CategoryMenuComponent } from './Components/category-menu/category-menu.component';
import {RouterModule, Routes} from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProductCategoryComponent } from './Components/products/product-category/product-category.component';
import {HttpServiceService} from './Services/http-service.service';
import {HttpModule} from '@angular/http';
import { FooterComponent } from './Components/footer/footer.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MessagesComponent } from './Components/messages/messages.component';
import {MsgloaderService} from './Services/msgloader.service';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatSidenavModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { BlogComponent } from './Components/blog/blog.component';
import {NotfoundComponent} from './Components/notfound/notfound.component';
import {CartComponent} from './Components/cart/cart.component';
import { CartService } from './Services/cart.service';
import { LoginComponent } from './Components/login/login.component';
import { OrderFormComponent } from './Components/order-form/order-form.component';
import { AccountComponent } from './Components/account/account.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'product-category', component: ProductCategoryComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'search', component: ProductCategoryComponent},
  {path: 'search/:searchterm', component: ProductCategoryComponent},
  {path: 'search/:searchterm/:page', component: ProductCategoryComponent},
  {path: 'product-category/:category', component: ProductCategoryComponent},
  {path: 'product-category/:category/:page', component: ProductCategoryComponent},
  {path: 'not-found', component: NotfoundComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: AccountComponent},
  {path: '**', redirectTo: '/not-found'},
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryMenuComponent,
    HomePageComponent,
    ProductCategoryComponent,
    FooterComponent,
    SidebarComponent,
    MessagesComponent,
    PaginationComponent,
    BlogComponent,
    NotfoundComponent,
    CartComponent,
    LoginComponent,
    OrderFormComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    Ng2PageScrollModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [HttpServiceService, MsgloaderService, CookieService, CartService],
  bootstrap: [AppComponent],
  entryComponents: [MessagesComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import {RouterModule, Routes} from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductSingleComponent } from './product-category/product-single/product-single.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {HttpServiceService} from './http-service.service';
import {HttpModule} from '@angular/http';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MessagesComponent } from './messages/messages.component';
import {MsgloaderService} from './msgloader.service';
import { PaginationComponent } from './pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatSidenavModule, MatSelectModule, MatDialogModule
} from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { BlogComponent } from './blog/blog.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {CartComponent} from './cart/cart.component';
import { CartService } from './cart.service';
import { LoginComponent } from './login/login.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { AccountComponent } from './account/account.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'product-category', component: ProductCardComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'search', component: ProductCardComponent},
  {path: 'search/:searchterm', component: ProductCardComponent},
  {path: 'search/:searchterm/:page', component: ProductCardComponent},
  {path: 'product-category/:category', component: ProductCardComponent},
  {path: 'product-category/:category/:page', component: ProductCardComponent},
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
    ProductCategoryComponent,
    HomePageComponent,
    ProductSingleComponent,
    ProductCardComponent,
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

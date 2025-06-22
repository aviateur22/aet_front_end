import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { authorizeRouting } from './routing/authorize.routing';
import { CommonComponentModule } from "../common-component/common-component.module";



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    RouterModule.forChild(authorizeRouting),
    CommonModule,
    CommonComponentModule
]
})
export class AuthorizeModule { }

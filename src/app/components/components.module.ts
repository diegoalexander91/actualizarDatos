import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeadComponent } from './head/head.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeadComponent
  ],
  exports:[
    FooterComponent,
    HeadComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TelecommunicationPage } from './telecommunication.page';

const routes: Routes = [
  {
    path: '',
    component: TelecommunicationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TelecommunicationPage]
})
export class TelecommunicationPageModule {}

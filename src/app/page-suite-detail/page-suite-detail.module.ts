import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PageSuiteDetailPage } from './page-suite-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PageSuiteDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      ReactiveFormsModule
  ],
  declarations: [PageSuiteDetailPage]
})
export class PageSuiteDetailPageModule {}

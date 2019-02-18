import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'video',
      loadChildren: './video/video.module#VideoPageModule'
  },
  {
    path: 'television',
      loadChildren: './television/television.module#TelevisionPageModule'
  },
  {
    path: 'politique',
      loadChildren: './politique/politique.module#PolitiquePageModule'
  },
  {
    path: 'economie',
      loadChildren: './economie/economie.module#EconomiePageModule'
  },
  {
    path: 'societe',
      loadChildren: './societe/societe.module#SocietePageModule'
  },
  {
    path: 'telecommunication',
      loadChildren: './telecommunication/telecommunication.module#TelecommunicationPageModule'
  },
  {
    path: 'sport',
      loadChildren: './sport/sport.module#SportPageModule'
  },
  {
    path: 'international',
      loadChildren: './international/international.module#InternationalPageModule'
  },
  {
    path: 'presse',
      loadChildren: './presse/presse.module#PressePageModule'
  },
  {
    path: 'contact',
      loadChildren: './contact/contact.module#ContactPageModule'
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

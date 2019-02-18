import { Component, OnInit } from '@angular/core';
import {ActualiteModel} from "../models/actualite.model";
import {environment} from "../../environments/environment.prod";
import {PageSuiteDetailPage} from "../page-suite-detail/page-suite-detail.page";
import {ApiRepositoryService} from "../repository/api-repository.service";
import {Storage} from "@ionic/storage";
import {LoadingController, ModalController} from "@ionic/angular";

@Component({
  selector: 'app-politique',
  templateUrl: './politique.page.html',
  styleUrls: ['./politique.page.scss'],
})
export class PolitiquePage implements OnInit {
  donnees: any;
  slogan: string;
  totalPages: number;
  page: number = 1;
  actualites: any;

  constructor(private api: ApiRepositoryService,private storage: Storage,
              private modalCtrl: ModalController, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    this.slogan = environment.SLOGAN;

    let loading = await this.loadingCtrl.create({
        message : 'Chargement des données'
    });

    loading.present();
    this.onSearch();
    loading.dismiss();
  }

  onSearch(){
    this.api.getActualiteByCategorie('politique',this.page).subscribe(data => {
      this.donnees = data;
      this.totalPages = Math.ceil(this.donnees.meta.total / this.donnees.meta.per_page);

      this.actualites = this.donnees.data.map(d => {
        let actualite = new ActualiteModel();

        actualite.id = d.id;
        actualite.titre = d.titre;
        actualite.une = d.une;
        actualite.phare = d.phare;
        actualite.categorie = d.categorie;
        actualite.photo = d.photo;
        actualite.contenu = d.contenu;
        actualite.videos = d.videos;
        actualite.photos = d.photos;

        return actualite;
      });

      this.storage.set('politiques',this.actualites);
      },error => {
      this.storage.get('politiques').then(data => {
        this.donnees = data;

        this.actualites = this.donnees.map(d => {

          let actualite = new ActualiteModel();

          actualite.id = d.id;
          actualite.titre = d.titre;
          actualite.une = d.une;
          actualite.categorie = d.categorie;
          actualite.photo = d.photo;
          actualite.contenu = d.contenu;
          actualite.videos = d.videos;
          actualite.photos = d.photos;

          return actualite;
          });
      });
    });
  }

  doInfinite(event){
    if (this.page < this.totalPages){
      ++this.page;
      this.onSearch();
      event.target.complete();
    }
  }

  async onActualiteDetail(actualite: ActualiteModel){
    const modal = await this.modalCtrl.create({
            component: PageSuiteDetailPage,
            componentProps: {
              data: actualite,
                slogan: environment.SLOGAN
            }}
        );
    return await modal.present();
  }

}

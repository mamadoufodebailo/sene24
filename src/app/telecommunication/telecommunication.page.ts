import { Component, OnInit } from '@angular/core';
import {ApiRepositoryService} from "../repository/api-repository.service";
import {Storage} from "@ionic/storage";
import {LoadingController, ModalController} from "@ionic/angular";
import {environment} from "../../environments/environment.prod";
import {ActualiteModel} from "../models/actualite.model";
import {PageSuiteDetailPage} from "../page-suite-detail/page-suite-detail.page";

@Component({
  selector: 'app-telecommunication',
  templateUrl: './telecommunication.page.html',
  styleUrls: ['./telecommunication.page.scss'],
})
export class TelecommunicationPage implements OnInit {
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
    this.api.getActualiteByCategorie('tic',this.page).subscribe(data => {
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
      this.storage.set('telecommunications',this.actualites);
      },error => {
      this.storage.get('telecommunications').then(data => {
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

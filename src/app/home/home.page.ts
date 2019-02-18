import {Component, OnInit} from '@angular/core';
import {ApiRepositoryService} from "../repository/api-repository.service";
import {Storage} from "@ionic/storage";
import {LoadingController, ModalController} from "@ionic/angular";
import {ActualiteModel} from "../models/actualite.model";
import {PageSuiteDetailPage} from "../page-suite-detail/page-suite-detail.page";
import {environment} from "../../environments/environment.prod";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  donnees: any;
  slogan: string;
  totalPages: number;
  page: number = 1;
  actualites: any;
  actualite:ActualiteModel = new ActualiteModel();

  constructor(private api: ApiRepositoryService,private storage: Storage,
              private modalCtrl: ModalController,private loadingCtrl: LoadingController){}

  async ngOnInit(){
    this.slogan = environment.SLOGAN;

    let loading = await this.loadingCtrl.create({
        message : 'Chargement des données'
    });

    loading.present();
    this.getPhare();
    this.onSearch();
    loading.dismiss();
  }

  getPhare(){
    this.api.getActualitePhare().subscribe(data => {
      this.donnees = data;

      this.actualite.id = this.donnees.data.id;
      this.actualite.titre = this.donnees.data.titre;
      this.actualite.une = this.donnees.data.une;
      this.actualite.phare = this.donnees.data.phare;
      this.actualite.categorie = this.donnees.data.categorie;
      this.actualite.photo = this.donnees.data.photo;
      this.actualite.contenu = this.donnees.data.contenu;
      this.actualite.videos = this.donnees.data.videos;
      this.actualite.photos = this.donnees.data.photos;

      this.storage.set('phare',this.actualite);
    },error => {
      this.storage.get('phare').then(data => {
        this.donnees  = data;

        this.actualite.id = this.donnees.id;
        this.actualite.titre = this.donnees.titre;
        this.actualite.une = this.donnees.une;
        this.actualite.phare = this.donnees.phare;
        this.actualite.categorie = this.donnees.categorie;
        this.actualite.photo = this.donnees.photo;
        this.actualite.contenu = this.donnees.contenu;
        this.actualite.videos = this.donnees.videos;
        this.actualite.photos = this.donnees.photos;
      });
    });
  }

  onSearch(){
    this.api.getActualite(this.page).subscribe(data => {
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

      this.storage.set('actualites',this.actualites);

      },error => {
      this.storage.get('actualites').then(data => {
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

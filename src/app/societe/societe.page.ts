import { Component, OnInit } from '@angular/core';
import {ApiRepositoryService} from "../repository/api-repository.service";
import {ActualiteModel} from "../models/actualite.model";
import {LoadingController, ModalController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {environment} from "../../environments/environment.prod";
import {PageSuiteDetailPage} from "../page-suite-detail/page-suite-detail.page";

@Component({
  selector: 'app-societe',
  templateUrl: './societe.page.html',
  styleUrls: ['./societe.page.scss'],
})
export class SocietePage implements OnInit {
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
    this.api.getActualiteByCategorie('societe',this.page).subscribe(data => {
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

      this.storage.set('societes',this.actualites);
      },error => {
      this.storage.get('societes').then(data => {
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

import { Component, OnInit } from '@angular/core';
import {ApiRepositoryService} from "../repository/api-repository.service";
import {Storage} from "@ionic/storage";
import {LoadingController, ModalController} from "@ionic/angular";
import {environment} from "../../environments/environment.prod";
import {PageSuiteDetailPage} from "../page-suite-detail/page-suite-detail.page";
import {PresseModel} from "../models/presse.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-presse',
  templateUrl: './presse.page.html',
  styleUrls: ['./presse.page.scss'],
})
export class PressePage implements OnInit {
  donnees: any;
  slogan: string;
  totalPages: number;
  page: number = 1;
  presses: any;

  constructor(private api: ApiRepositoryService,private storage: Storage,
              private modalCtrl: ModalController, private loadingCtrl: LoadingController,
              private domsanitize: DomSanitizer) { }

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
    this.api.getPresse(this.page).subscribe(data => {
      this.donnees = data;
      this.totalPages = Math.ceil(this.donnees.meta.total / this.donnees.meta.per_page);

      this.presses = this.donnees.data.map(d => {
        let presse = new PresseModel();

        presse.id = d.id;
        presse.titre = d.titre;
        presse.video = this.domsanitize.bypassSecurityTrustResourceUrl(d.video);

        return presse;
      });

      this.storage.set('presses',this.presses);
      },error => {
      this.storage.get('presses').then(data => {
        this.donnees = data;

        this.presses = this.donnees.map(d => {

          let presse = new PresseModel();

          presse.id = d.id;
          presse.titre = d.titre;
          presse.video = d.video;

          return presse;
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

}

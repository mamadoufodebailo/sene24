import { Component, OnInit } from '@angular/core';
import {ApiRepositoryService} from "../repository/api-repository.service";
import {Storage} from "@ionic/storage";
import {LoadingController, ModalController} from "@ionic/angular";
import {DomSanitizer} from "@angular/platform-browser";
import {environment} from "../../environments/environment.prod";
import {PresseModel} from "../models/presse.model";
import {TelevisionModel} from "../models/television.model";

@Component({
  selector: 'app-television',
  templateUrl: './television.page.html',
  styleUrls: ['./television.page.scss'],
})
export class TelevisionPage implements OnInit {
  donnees: any;
  slogan: string;
  totalPages: number;
  page: number = 1;
  televisions: any;

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
    this.api.getTV(this.page).subscribe(data => {
      this.donnees = data;
      this.totalPages = Math.ceil(this.donnees.meta.total / this.donnees.meta.per_page);

      this.televisions = this.donnees.data.map(d => {
        let tv = new TelevisionModel();

        tv.id = d.id;
        tv.titre = d.titre;
        tv.video = this.domsanitize.bypassSecurityTrustResourceUrl(d.video);

        return tv;
      });

      this.storage.set('televisions',this.televisions);
      },error => {
      this.storage.get('televisions').then(data => {
        this.donnees = data;

        this.televisions = this.donnees.map(d => {

          let tv = new TelevisionModel();

          tv.id = d.id;
          tv.titre = d.titre;
          tv.video = d.video;

          return tv;
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

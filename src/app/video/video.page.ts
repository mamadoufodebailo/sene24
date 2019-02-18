import { Component, OnInit } from '@angular/core';
import {ApiRepositoryService} from "../repository/api-repository.service";
import {Storage} from "@ionic/storage";
import {LoadingController, ModalController} from "@ionic/angular";
import {DomSanitizer} from "@angular/platform-browser";
import {environment} from "../../environments/environment.prod";
import {VideoModel} from "../models/video.model";
import {PageSuiteDetailPage} from "../page-suite-detail/page-suite-detail.page";

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  donnees: any;
  slogan: string;
  totalPages: number;
  page: number = 1;
  videos: any;

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
    this.api.getVideo(this.page).subscribe(data => {
      this.donnees = data;
      this.totalPages = Math.ceil(this.donnees.meta.total / this.donnees.meta.per_page);

      this.videos = this.donnees.data.map(d => {
        let video = new VideoModel();

        video.id = d.id;
        video.titre = d.titre;
        video.photo = d.photo;
        video.url = this.domsanitize.bypassSecurityTrustResourceUrl(d.url);
        video.contenu = d.contenu;

        return video;
      });

      this.storage.set('videos',this.videos);
      },error => {
      this.storage.get('videos').then(data => {
        this.donnees = data;

        this.videos = this.donnees.map(d => {

          let video = new VideoModel();

            video.id = d.id;
            video.titre = d.titre;
            video.photo = d.photo;
            video.url = d.url;
            video.contenu = d.contenu;

          return video;
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

  async onVideoDetail(video: VideoModel){
    const modal = await this.modalCtrl.create({
            component: PageSuiteDetailPage,
            componentProps: {
                data: video,
                slogan: environment.SLOGAN
            }}
        );

    return await modal.present();
  }

}

import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, NavParams} from "@ionic/angular";
import {ActualiteModel} from "../models/actualite.model";
import {VideoModel} from "../models/video.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiRepositoryService} from "../repository/api-repository.service";
import {CommentaireModel} from "../models/commentaire.model";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-page-suite-detail',
  templateUrl: './page-suite-detail.page.html',
  styleUrls: ['./page-suite-detail.page.scss'],
})
export class PageSuiteDetailPage implements OnInit {
  actualite = null;
  video = null;
  donnees: any;
  slogan: string;
  commentaires: any;
  fgroup: FormGroup;
  isViewCommentaire = false;
  isAjoutCommentaire = false;
  actualite_id:number;
  totalPages: number;
  page: number = 1;
  message:string;

  constructor(private modalCtrl: ModalController,private navParam: NavParams,
              private fb: FormBuilder,private api: ApiRepositoryService,
              private storage: Storage,private loadingCtrl: LoadingController) {
    this.slogan = this.navParam.get('slogan');
    this.donnees = this.navParam.get('data');

    if (this.donnees instanceof ActualiteModel){
      this.actualite = this.donnees;
    }
    else if (this.donnees instanceof VideoModel){
      this.video = this.donnees;
    }

    this.fgroup = this.fb.group({
        'auteur' : [null,Validators.required],
        'email' : [null,Validators.compose([Validators.required,Validators.email])],
        'message' : [null,Validators.required],
    });
  }

  ngOnInit() {
  }

  doInfinite(event){
    if (this.page < this.totalPages){
      ++this.page;
      this.onSearch();
      event.target.complete();
    }
  }

  onClose(){
    this.modalCtrl.dismiss();
  }

  async openCommentaire(id){
    this.commentaire_id = id;
    this.isViewCommentaire = true;
    this.isAjoutCommentaire = false;
    let loading = await this.loadingCtrl.create({
          message : 'Chargement des commentaires'
    });

    loading.present();
    this.onSearch();
    loading.dismiss();
  }

  onSearch(){
    this.api.getCommentaireByactualite(this.commentaire_id,this.page).subscribe(data => {
      this.donnees = data;
      this.totalPages = Math.ceil(this.donnees.meta.total / this.donnees.meta.per_page);

      this.commentaires = this.donnees.data.map(d => {

        let commentaire = new CommentaireModel();

        commentaire.id = d.id;
        commentaire.auteur = d.auteur;
        commentaire.email = d.email;
        commentaire.message = d.message;

        return commentaire;
      });

      this.storage.set('commentaires',this.commentaires);
    },error => {
      this.storage.get('commentaires').then(data => {
        this.donnees = data;

        this.commentaires = this.donnees.map(d => {

          let commentaire = new CommentaireModel();

          commentaire.id = d.id;
          commentaire.auteur = d.auteur;
          commentaire.email = d.email;
          commentaire.message = d.message;

          return commentaire;
        });
      });
    });
  }

  openFormCommentaire(id){
    this.isAjoutCommentaire = true;
    this.isViewCommentaire = false;
    this.actualite_id = id;
  }

  addCommentaire(comment){
    let commentaire = new CommentaireModel();

    commentaire.auteur = comment.auteur;
    commentaire.email = comment.email;
    commentaire.message = comment.message;
    commentaire.actualite = this.actualite_id;

    this.api.sendCommentaire(commentaire).subscribe(data => {
      this.donnees = data;
      this.message = this.donnees.message;
      this.isAjoutCommentaire = false;
      this.initialiser();
    })
  }

  initialiser(){
    this.fgroup.controls['auteur'].setValue('');
    this.fgroup.controls['email'].setValue('');
    this.fgroup.controls['message'].setValue('');
    this.actualite_id = 0;
  }

  closeCommentaire(){
    this.isViewCommentaire = false;
  }

  resetCommentaire(){
    this.isAjoutCommentaire = false;
  }

}

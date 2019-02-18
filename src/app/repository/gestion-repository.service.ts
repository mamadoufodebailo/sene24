import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import {ApiRepositoryService} from "./api-repository.service";
import {LienModel} from "../models/lien.model";

@Injectable({
  providedIn: 'root'
})
export class GestionRepositoryService {
  donnees:any;
  lien: LienModel = new LienModel();

  constructor(private api: ApiRepositoryService,private storage: Storage) { }

  getElement(): LienModel{
    this.api.getContact().subscribe(data => {
      this.donnees = data;

      this.lien.id = this.donnees.data.id;
      this.lien.logo = this.donnees.data.logo;
      this.lien.telephone = this.donnees.data.telephone;
      this.lien.adresse = this.donnees.data.adresse;
      this.lien.email = this.donnees.data.email;

      this.storage.set('lien',this.lien);

      return this.lien;
      },error => {
      this.storage.get('lien').then(d => {
        this.lien.id = d.id;
        this.lien.logo = d.logo;
        this.lien.telephone = d.telephone;
        this.lien.adresse = d.adresse;
        this.lien.email = d.email;
      });
    });

    return this.lien;
  }

}

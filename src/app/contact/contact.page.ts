import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {ApiRepositoryService} from "../repository/api-repository.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GestionRepositoryService} from "../repository/gestion-repository.service";
import {LienModel} from "../models/lien.model";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  slogan: string;
  fgroup: FormGroup;
  lien: LienModel;
  message: string;
  donnees: any;

  constructor(private api: ApiRepositoryService,private fb: FormBuilder,
              private gestion: GestionRepositoryService) {
    this.fgroup = this.fb.group({
        'prenoms' : [null,Validators.required],
        'nom': [null,Validators.required],
        'email': [null,Validators.compose([Validators.required,Validators.email])],
        'message': [null,Validators.required]
    });
  }

  async ngOnInit() {
    this.slogan = environment.SLOGAN;
    this.lien = this.gestion.getElement();
  }

  sendContact(contact){
    this.api.sendContact(contact).subscribe(data=> {
      this.donnees = data;
      this.message = this.donnees.message;
    });
  }

}

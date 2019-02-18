import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ApiRepositoryService {

  constructor(private http:HttpClient) { }

  getContact(){
    return this.http.get(environment.API_URL+'/contact').pipe();
  }

  getActualite(page:number){
    return this.http.get(environment.API_URL+'/actualite?page='+page).pipe();
  }

  getCommentaireByactualite(id:number,page:number){
    return this.http.get(environment.API_URL+'/actualite/'+id+'?page='+page).pipe();
  }

  getActualitePhare(){
    return this.http.get(environment.API_URL+'/actualite-phare').pipe();
  }

  getActualiteByCategorie(categorie:string,page:number){
    return this.http.get(environment.API_URL+'/actualite/'+categorie+'?page='+page)
        .pipe();
  }

  getPresse(page:number){
    return this.http.get(environment.API_URL+'/presse?page='+page).pipe();
  }

  getTV(page:number){
    return this.http.get(environment.API_URL+'/television?page='+page).pipe();
  }

  getVideo(page:number){
    return this.http.get(environment.API_URL+'/video?page='+page).pipe();
  }

  sendContact(data:any){
    return this.http.post(environment.API_URL+'/contact',JSON.stringify(data),
        {headers : new HttpHeaders({'Content-Type' : 'application/json'})})
        .pipe();
  }

  sendCommentaire(data:any){
    return this.http.post(environment.API_URL+'/commentaire',JSON.stringify(data),
        {headers : new HttpHeaders({'Content-Type' : 'application/json'})})
        .pipe();
  }
}

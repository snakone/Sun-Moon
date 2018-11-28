import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Trainer } from 'src/app/models/trainer.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UploadFileService } from '../upload/upload-file.service';
import Swal from 'sweetalert2'
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TrainerService {

  trainer: Trainer;  // Trainer from Mongo, ID -> _id
  menu: any[] = [];
  token: string;
  auth2: any;

  constructor(private http: HttpClient,
              private _storage: StorageService,
              private _uploadFile: UploadFileService,
              private router: Router) {
    this.loadStoreTrainerData()
 }

 // CREATE //
 createTrainer(trainer: Trainer):Observable<any>{
   return this.http.post(URL_SERVICES + '/trainers', trainer)
    .pipe(catchError(err => {
          Swal('Error', err.error.message, 'error');
          return throwError(err);
        }));
 }

 // READ //
  getTrainerList(){
    return this.http.get(URL_SERVICES + '/trainers');
  }

  getTrainerListSort(from:number){
    return this.http.get(URL_SERVICES + '/sort-trainers?offset=' + from);
  }

  getTrainerByName(name:string){
    return this.http.get(URL_SERVICES + '/trainer-name/' + name)
    .pipe(map((res:any) => {
       return res.trainer[0];
    }));
  }

  isNameTaken(name:string):Observable<Boolean>{
    return this.http.get(URL_SERVICES + '/trainer-name/' + name)
    .pipe(map((res:any) => {
      return res ? true : null;
    }));
  }

  searchTrainer(value: string){
    return this.http.get(URL_SERVICES + '/search/data/trainers/' + value)
    .pipe(map((res:any) => res.trainers));
  }

  // UPDATE //
  updateTrainer(trainer: Trainer){
    return this.http.put(URL_SERVICES + `/trainers/${trainer._id}?token=${this.token}`, trainer)
     .pipe(map((data:any)=> {
         if (trainer._id === this.trainer._id) {
           let updatedTrainer: Trainer = data.trainer;
           this.saveTrainerToLocalStorage(updatedTrainer._id, this.token, updatedTrainer, this.menu);
         }
         return data.trainer;
     }));
  }

  // DELETE //
  deleteTrainer(id: string){
    return this.http.delete(URL_SERVICES + `/trainers/${id}?token=${this.token}`)
  }

  // SIGN IN //
  // TRAINER NAME & PASSWORD //
  signInTrainer(trainerSignIn: Trainer, remember: boolean):Observable<any>{
    return this.http.post(URL_SERVICES + '/login', trainerSignIn)
    .pipe(map((res:any) => {   // NORMAL SIGN UP
        this.saveTrainerToLocalStorage(res._id, res.token, res.trainer, res.menu);
        remember ? localStorage.setItem('email', res.trainer.email) :
        localStorage.removeItem('email');
        return res;  // Return The Trainer Who Signed In
    }), catchError(err => {
          Swal('Error', err.error.message, 'error');
          return throwError(err);
        })
      ); // End of Map + Pipe
  }

  // GOOGLE SIGN IN //
  googleSignIn(token){
    return this.http.post(URL_SERVICES + '/login/google', {token})
     .pipe(map((res:any) => {
       this.saveTrainerToLocalStorage(res._id, res.token ,res.trainer , res.menu);
       return true;   // Return Sign In OK
     }));
  }

  areYouOnline():boolean{
    return this.token.length > 5 ? true : false;
  }

  // LOG OUT //
  trainerLogOut():boolean {
    if (!this.areYouOnline()) return false;
    if (this.auth2 != undefined) this.auth2.disconnect();
    this.trainer = null;
    this.token = '';
    this.menu = [];
    this._storage.remove();
    return true;
  }

  // REFRESH TOKEN //
  refreshToken(){
    return this.http.get(URL_SERVICES + `/refresh-token?token=${this.token}`)
     .pipe(map((res:any) => {
         this.token = res.token;
         localStorage.setItem('token', this.token);
         return true;
       }), catchError(err => {
             Swal('Error', 'Couldn\'t renew Token!', 'error');
             this.router.navigate(['/home']);
             return throwError(err);
           })
      );
  }

  // LOCAL STORAGE //
  saveTrainerToLocalStorage(id: string, token: string, trainer: Trainer, menu: any):void{
    this._storage.save(id,token,trainer,menu);
    this.trainer = trainer;
    this.token = token;
    this.menu = menu;
  }

  loadStoreTrainerData():void{
    if (localStorage.getItem('token')){  // If Token Exist
      this.token = localStorage.getItem('token');
      this.trainer = JSON.parse(localStorage.getItem('trainer'));  // String to JSON
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.trainer = <Trainer>{};
      this.menu = [];
    }
  }

  // CHANGE PICTURE //
  changePicture(file: File, id: string){
    this._uploadFile.uploadFile(file, 'trainers', id)
     .then((res:any) => {
       Swal('Alright!', 'Picture Updated', 'success');
        if (res.updatedTrainer._id === this.trainer._id) {
            // Update your Image only if the updated Trainer It's You
            this.trainer.image = res.updatedTrainer.image;
            this.saveTrainerToLocalStorage(this.trainer._id, this.token, this.trainer, this.menu);
          }
     }).catch(err => {
       console.log(err)
     });
  }

}

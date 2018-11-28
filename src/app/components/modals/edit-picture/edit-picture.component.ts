import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainerService} from 'src/app/services/services.index';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
  styleUrls: ['./edit-picture.component.scss']
})

export class EditPictureComponent implements OnInit {

  uploadPictureForm: FormGroup;
  disabled: boolean = false;
  fileToUpload: File;
  temporalImage: string;
  imagePattern: string = "^.+\.(([pP][nN][gG])|([jJ][pP][gG]))$";  // Png, Jpg

  constructor(private _trainer: TrainerService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createSignUpForm();
  }

  createSignUpForm():void {
    this.uploadPictureForm = new FormGroup({
        image: new FormControl('', [  // PASSWORD
                                     Validators.required,
                                     Validators.minLength(4),
                                     Validators.maxLength(69),
                                     Validators.pattern(this.imagePattern)])
    });
  }

  uploading(event, file: File){
    event.preventDefault();
    if (!file) {
      this.fileToUpload = null;
      return false;
    }
    if (!file.type.includes('image')){
      Swal('Error', 'Only Images!', 'error');
      return false;
    }

    if (file.size > 512000){
      Swal('Error', 'Max Size: 512kb!', 'error');
      return false;
    }

    this.fileToUpload = file;
    let reader = new FileReader();
    reader.readAsDataURL(file);  // Read the File to show Temporal Image before Submit
    reader.onloadend = () => {this.temporalImage = reader.result.toString();
}
  }

  onSubmitPicture(){
    if (this.data.collection == "Trainer")
    this._trainer.changePicture(this.fileToUpload, this.data._id);
  }

}

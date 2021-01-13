import { ActionSheetController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Photo, PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.page.html',
  styleUrls: ['./contact-form.page.scss'],
})
export class ContactFormPage implements OnInit {

  myForm: FormGroup;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController) { 
      this.myForm = this.formBuilder.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      email: ['', Validators.required ],
      phone: ['', Validators.required ],
      category: ['', Validators.required ],
    });
  }

  ngOnInit() {
    this.photoService.loadSaved();
  }
  async closeModal(){
    await this.modalController.dismiss();
  }
  logForm(){
    console.log(this.myForm.value)
  }
  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }
}

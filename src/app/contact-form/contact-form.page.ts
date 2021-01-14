import { FormularioService } from './../services/formulario.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Photo, PhotoService } from '../services/photo.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.page.html',
  styleUrls: ['./contact-form.page.scss'],
})
export class ContactFormPage implements OnInit {

  myForm: FormGroup;
  img: any;
  avatar = 'assets/icon/avatar.png';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public photoService: PhotoService,
    private sanitizer: DomSanitizer,
    public actionSheetController: ActionSheetController,
    private formService: FormularioService) {

      this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      email: ['', Validators.required ],
      phone: ['', Validators.required ],
      category: [true],
      image: [this.avatar],
    });
  }

  ngOnInit() {
    this.photoService.loadSaved();
  }

  async closeModal(){
    await this.modalController.dismiss({
      'form': this.myForm.value
    });
  }
  logForm(){
    console.log(this.myForm.value);
    this.formService.writeStorage(this.myForm.value);
    this.closeModal();
  }
  async addphoto(){
    const imagen = await this.photoService.addNewToGallery();
    this.img = this.sanitizer.bypassSecurityTrustResourceUrl(imagen.webviewPath);
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

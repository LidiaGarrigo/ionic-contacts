import { FormularioService } from './../services/formulario.service';
import { MyInterface } from './../my-interface';
import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ContactFormPage } from '../contact-form/contact-form.page';
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss'],
})
export class ContactListPage implements OnInit {

  contacts: MyInterface[] = [];
  suscription: Subscription[];
  img: any;

  constructor(
    private apiService: ContactService,
    public modalController: ModalController,
    private formService: FormularioService,
    private sanitizer: DomSanitizer,
    public photoService: PhotoService,) {
      this.suscription = [];
    }
    
    /* contacts = this.apiService.getContacts(); */
  
  ngOnInit() {
    
    this.formService.readStorage().then((datos) => {
      this.contacts = this.contacts.concat(datos);
      console.log(this.contacts);
    });
    this.apiService.getContacts$().subscribe((datos: any) => {console.log(datos); 
      this.contacts = this.contacts.concat(datos.contacts);
      console.log(this.contacts);
    });
  }

  /////////// FATLA SANITIZAR LA IMAGEN CUANDO SE AÑADE UN NUEVO CONTACTO EN LA LISTA /////////
  
    /* const imagen = await this.photoService.addNewToGallery();
    this.img = this.sanitizer.bypassSecurityTrustResourceUrl(imagen.webviewPath); */


  async openModal(){
    const modal = await this.modalController.create({
      component: ContactFormPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
  }


}
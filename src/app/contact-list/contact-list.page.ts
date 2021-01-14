import { FormularioService } from './../services/formulario.service';
import { MyInterface } from './../my-interface';
import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import * as contacts from '../../assets/contacts.json';
import { Observable } from 'rxjs';
import { ContactFormPage } from '../contact-form/contact-form.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss'],
})
export class ContactListPage implements OnInit {

  contacts: MyInterface[] = [];

  constructor(
    private apiService: ContactService, 
    public modalController: ModalController,
    private formService: FormularioService) { }

  ngOnInit() {
    
    this.formService.readStorage().then((datos) => {
      console.log(datos);
      this.contacts = this.contacts.concat(datos);
      console.log(this.contacts);
    });
    this.apiService.getContacts().subscribe((datos) => {
      console.log(datos); 
      this.contacts = this.contacts.concat(datos);
    });
  }


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
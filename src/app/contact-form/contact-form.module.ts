import { ContactListPage } from './../contact-list/contact-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactFormPageRoutingModule } from './contact-form-routing.module';

import { ContactFormPage } from './contact-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [ContactFormPage],
})
export class ContactFormPageModule {}

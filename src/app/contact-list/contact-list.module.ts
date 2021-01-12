import { ContactFormPageModule } from './../contact-form/contact-form.module';
import { ContactFormPage } from './../contact-form/contact-form.page';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactListPageRoutingModule } from './contact-list-routing.module';

import { ContactListPage } from './contact-list.page';

@NgModule({
  entryComponents: [
    ContactFormPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactListPageRoutingModule,
    ContactFormPageModule,
  ],
  declarations: [ContactListPage]
})
export class ContactListPageModule {}

import { MyInterface } from '../my-interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
/* import * as list from '../../assets/contacts.json'; */

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    /* public contactos; */
    private API_URL = '../../assets/contacts.json';

constructor(private http: HttpClient) { 
    /* this.contactos = JSON.parse(JSON.stringify(list.contacts)); */
}

getContacts$(): Observable<MyInterface[]>{
    return this.http.get<MyInterface[]>(this.API_URL).pipe(tap(result => console.log(result)));
 /*    return this.contactos; */
}

}

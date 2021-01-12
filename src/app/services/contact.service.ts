import { MyInterface } from '../my-interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private API_URL = 'http://localhost:3000/contacts';

constructor(private http: HttpClient) { }

getContacts(): Observable<MyInterface[]>{
    return this.http.get<MyInterface[]>(this.API_URL).pipe(tap(result => console.log(result)));
}

}

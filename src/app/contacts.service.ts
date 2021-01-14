import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item{
    id:number;
    title: string;
    value: string;
    modified: string;
}

const ITEMS_KEY = "my-items";

@Injectable({
    providedIn: 'root'
})
export class ContactsService {

constructor(private storage: Storage) { }

//Create
addItem(item: Item): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
if(items){
    items.push(item);
    return this.storage.set(ITEMS_KEY, items);
} else {
    return this.storage.set(ITEMS_KEY, [item]);
}
    });
}

//Read
getItems(): Promise<Item[]>{
return this.storage.get(ITEMS_KEY);
}

//Update
updateItem(item: Item): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
        if(!items || items.length === 0){
            return null;
        } 
        let newItems: Item[] = [];
        for(let i of items){
            if(i.id === item.id){
                newItems.push(item);
            } else {
                newItems.push(i);
            }
        }
        return this.storage.set(ITEMS_KEY, newItems);
        });
    }

//Delete
deleteItem(id: number): Promise<Item>{
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
        if(!items || items.length === 0){
            return null;
        } 
        let toKeep: Item[] = [];
        for(let i of items){
            if(i.id !== id ){
                toKeep.push(i);
            }
        }
        return this.storage.set(ITEMS_KEY, toKeep);

    });
}

}

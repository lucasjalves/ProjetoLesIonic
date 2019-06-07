import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    itemValue = new Subject();

    setItem(key: string, value: string) {
        localStorage.setItem(key, value);
        this.itemValue.next(value);
    }
}

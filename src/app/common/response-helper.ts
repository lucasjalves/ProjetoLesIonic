import { Serializable } from './serializable.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResponseHelper {
    private entity: Serializable<any>;

    withEntity(entity: Serializable<any>) {
        this.entity = entity;
    }

    deserialize(object: any): Serializable<any> {
        return this.entity.deserialize(object);
    }
}

import { Serializable } from './serializable.interface';
import { Type } from '@angular/compiler';

export class Resultado<T> implements Serializable<Resultado<T>> {

    public mensagens: Array<string> = new Array();
    public entidades: Array<T> = new Array();
    private conversor: Serializable<T>;
    deserialize(object: any): Resultado<T> {
        this.mensagens = new Array();
        this.entidades = new Array();
        object.mensagem.forEach(element => {
            this.mensagens.push(element);
        });

        object.entidades.forEach(element => {
            this.entidades.push(this.conversor.deserialize(element));
        });
        return this;
    }
    serialize() {
        return {

        };
    }

    constructor(object: Serializable<T>) {
        this.conversor = object;
    }
}

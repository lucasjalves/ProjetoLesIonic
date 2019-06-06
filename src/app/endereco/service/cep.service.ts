import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CepService {

    constructor(private httpClient: HttpClient) {
    }

    public getCep(cep: string) {
        return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`);
    }
}

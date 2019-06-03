import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cartao } from '../model/cartao.model';

@Injectable({
  providedIn: 'root'
})
export class CartaoService {
  private urlBase: string = environment.urlBase;

  constructor(private httpClient: HttpClient) {

   }

   getCartoes() {
    return this.httpClient.get(`${this.urlBase}/rest/cartao/get`);
   }

   cadastrar(cartao: Cartao) {
    return this.httpClient.post(`${this.urlBase}/rest/cartao/cadastrar`, cartao.serialize());
   }
}

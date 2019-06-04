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

   getCartoes(cpf: string) {
    return this.httpClient.get(`${this.urlBase}/rest/cartao/get/${cpf}`);
   }

   cadastrar(cartao: Cartao, cpf: string) {
    return this.httpClient.post(`${this.urlBase}/rest/cartao/cadastrar/${cpf}`, cartao.serialize());
   }

   getCartoesId(cpf: string, id: string) {
     return this.httpClient.get(`${this.urlBase}/rest/cartao/get/${cpf}/${id}`);
   }

   alterar(cartao: Cartao) {
     return this.httpClient.put(`${this.urlBase}/rest/cartao/alterar`, cartao.serialize());
   }

   deletar(cartao: Cartao) {
     return this.httpClient.delete(`${this.urlBase}/rest/cartao/deletar/${cartao.id}`);
   }
}

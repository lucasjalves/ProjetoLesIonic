import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Endereco } from '../model/endereco.model';
import { Resultado } from '../../common/resultado.model';
@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private httpClient: HttpClient) { }

  public getEnderecos(cpf: string) {
    return this.httpClient.get(`${environment.urlBase}/rest/endereco/getAll/${cpf}`);
  }

  public salvarEndereco(cpf: string, endereco: Endereco) {
    return this.httpClient.post(`${environment.urlBase}/rest/endereco/salvar/${cpf}`, endereco);
  }

  public getEnderecoId(id: string) {
    return this.httpClient.get(`${environment.urlBase}/rest/endereco/get/${id}`);
  }

  public deletar(id: string) {
    return this.httpClient.delete(`${environment.urlBase}/rest/endereco/deletar/${id}`);
  }

  public alterar(endereco: Endereco) {
    return this.httpClient.put(`${environment.urlBase}/rest/endereco/alterar`, endereco);
  }
}

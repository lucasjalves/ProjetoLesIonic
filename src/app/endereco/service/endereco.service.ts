import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private httpClient: HttpClient) { }

  public getEnderecos(cpf: string) {
    return this.httpClient.get(`${environment.urlBase}/rest/endereco/get/${cpf}`);
  }
}

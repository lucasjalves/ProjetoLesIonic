import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { ClienteService } from '../cliente/service/cliente.service';
import { Cliente } from '../cliente/model/cliente.model';
import { StatusClienteService } from '../common/service/status-cliente-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];  route: ActivatedRouteSnapshot;

  constructor(private clienteService: ClienteService,
              private router: Router,
              private statusClienteService: StatusClienteService) {

  }
   canActivate(): Observable<boolean>|boolean {
    let cliente: Cliente;
    if (localStorage.getItem('logged') === null) {
      this.router.navigate(['/cliente/login']);
      return false;
    } else {
      cliente = this.clienteService.getClienteLogado();
      const observable =  this.clienteService.isAdmin(cliente.cpfCnpj) as Observable<boolean>;
      observable.subscribe(res => {
        this.statusClienteService.isAdmin.next(res);
      });
      return observable;
    }
  }
}

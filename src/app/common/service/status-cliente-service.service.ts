import { Injectable } from '@angular/core';
import { ClienteService } from 'src/app/cliente/service/cliente.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusClienteService {
  public isAdmin = new Subject();
  public isActive = new Subject();
  constructor() { }

}

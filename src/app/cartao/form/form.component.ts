import { Component, OnInit, Input } from '@angular/core';
import { Cartao } from '../model/cartao.model';

@Component({
  selector: 'app-form-cartao',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormCartaoComponent implements OnInit {

  @Input() public cartao: Cartao = new Cartao();
  @Input() public funcao: () => void;
  @Input() public tituloBotao: string;
  constructor() { }

  ngOnInit() {}

}

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoListaPage } from './cartao.page';

describe('CartaoListaPage', () => {
  let component: CartaoListaPage;
  let fixture: ComponentFixture<CartaoListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartaoListaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CartaoService } from './cartao.service';

describe('CartaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartaoService = TestBed.get(CartaoService);
    expect(service).toBeTruthy();
  });
});

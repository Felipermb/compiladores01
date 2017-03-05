/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServicoAlgoritmoService } from './servico-algoritmo.service';

describe('ServicoAlgoritmoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicoAlgoritmoService]
    });
  });

  it('should ...', inject([ServicoAlgoritmoService], (service: ServicoAlgoritmoService) => {
    expect(service).toBeTruthy();
  }));
});

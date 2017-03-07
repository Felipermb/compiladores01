import { Component, OnInit } from '@angular/core';

import { ServicoAlgoritmoService } from './servico-algoritmo.service';

@Component({
  selector: 'app-posfixa-component',
  templateUrl: './posfixa-component.component.html',
  styleUrls: ['./posfixa-component.component.css']
})
export class PosfixaComponentComponent implements OnInit {

  algoritmo: ServicoAlgoritmoService;
  constructor(algoritmo: ServicoAlgoritmoService) { this.algoritmo = algoritmo; }

  ngOnInit() {
  }

  posfixa: any;
  validade: any;
  verificacao: any;

  converterInfixa(expressao: string){
    if(expressao){
      this.algoritmo.imprimirMensagemLog(expressao);
      this.posfixa = this.algoritmo.analiseLexica(expressao);

      this.verificacao = this.algoritmo.verificarExpressao(this.posfixa); //Campo Booleano

       if(this.verificacao){
         this.validade = " Expressão Válida";
       }else{
         this.validade = " Expressão Inválida";
       }

    }
  }

}

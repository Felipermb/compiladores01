import { Injectable } from '@angular/core';

@Injectable()
export class ServicoAlgoritmoService {

  posfixa: string[];
  pilha: string[];
  ponto: boolean;
  parentese;

  analiseLexica(expressao: string){
      var p = this.percorrerExpressao(expressao);
      return p;
  }

  percorrerExpressao(mensagem: string){
    this.inicializa();
    var contadora = 0;

    for (var char of mensagem) {
        var caractere:string = char;
        switch(caractere) {
            case simbolosConstantes.parAbrir: {
              if(this.ponto){
                this.operador(simbolosConstantes.concatena);
                this.ponto = false;
              }
              this.parenteseAbrir();
              break;
           }
           case simbolosConstantes.parFechar: {
              this.ponto = true;
              this.parenteseFechar();
              break;
           }
           case simbolosConstantes.concatena: {
              this.ponto = false;
              this.operador(caractere);
              break;
           }
           case simbolosConstantes.kleen: {
             this.ponto = true;
             this.operador(caractere);
             break;
           }
           case simbolosConstantes.ou: {
             this.ponto = false;
             this.operador(caractere);
             break;
           }
           default: {
              if(this.ponto){
                  this.operador(simbolosConstantes.concatena);
              }
              this.ponto = true;
              this.operando(caractere);
              break;
           }
        }
    } // fim do for
    this.desempilhamentoFinal();
    var aux = '';
    for(var char of this.posfixa){
      aux += char;
    }
    return aux;
  }

  inicializa(){
    this.posfixa = [];
    this.pilha = [];
    this.parentese = 0;
    this.ponto = false;
  }

  operando(caractere: string){
    this.posfixa.push(caractere);
  }

  parenteseAbrir(){
    this.empilhar(simbolosConstantes.parAbrir);
    this.parentese++;
  }

  parenteseFechar(){
    var aux = this.desempilhar();
    if(this.parentese > 0){
       while(aux != simbolosConstantes.parAbrir && this.pilha.length > 0){
          this.posfixa.push(aux);
          aux = this.desempilhar();
        }
        this.parentese--;
    }else{
        this.posfixa.push(simbolosConstantes.parFechar);
    }
  }

  operador(operador: string){
    if(this.pilha.length > 0){
      var top = this.pilha[0];
      var aux;
      while(this.precedencia(top) >= this.precedencia(operador)){
        aux = this.desempilhar();
        this.posfixa.push(aux);
        if(this.pilha.length > 0){
          top = this.pilha[0];
        }else{
          break;
        }
      }
    }
    this.empilhar(operador);
  }

  empilhar(caractere: string){
    this.pilha.unshift(caractere); //Primeira posição
  }

  desempilhar(){
    var elemento:string = this.pilha.shift();
    return elemento;
  }

  desempilhamentoFinal(){
    var aux = this.desempilhar();
    while(aux != null){
      this.posfixa.push(aux);
      aux = this.desempilhar();
    }
  }

  precedencia(caractere: string){
    switch(caractere){
      case simbolosConstantes.kleen:
        return 3;
      case simbolosConstantes.concatena:
        return 2;
      case simbolosConstantes.ou:
        return 1;
      case simbolosConstantes.parAbrir:
        return 0;
    }
  }

  imprimirMensagemLog(mensagem: string){
    console.log(mensagem);
  }

  verificarExpressao(mensagem: string){
      this.inicializa();
      for (var char of mensagem) {
         var caractere:string = char;
         switch(caractere) {
           case simbolosConstantes.concatena: {
               if(this.pilha.length > 0){
                  var op2 = this.pilha.shift();
                  if(this.pilha.length > 0){
                      var op1 = this.pilha.shift();
                      this.pilha.unshift(op2);
                  }
              }
              break;
           }
           case simbolosConstantes.kleen: {
             if(this.pilha.length > 0){
                var op2 = this.pilha.shift();
                this.pilha.unshift(op2);
              }
             break;
           }
           case simbolosConstantes.ou: {
             if(this.pilha.length > 0){
                var op2 = this.pilha.shift();
                if(this.pilha.length > 0){
                    var op1 = this.pilha.shift();
                    this.pilha.unshift(op2);
                }
              }
             break;
           }
           case simbolosConstantes.parAbrir: {
             this.parentese++;
             break;
           }
           case simbolosConstantes.parFechar: {
             this.parentese--;
             if(this.parentese < 0) return false;
             break;
           }
           default: {
              this.pilha.unshift(caractere);
              break;
           }
        }
      }
      return this.pilha.length-1 == 0;
    }
}

class simbolosConstantes {
  static concatena = ".";
  static ou = "+";
  static kleen = "*";
  static parAbrir = "(";
  static parFechar = ")";
}

/*1. Varrer a expressão caractere por caractere da esquerda para
a direita:

I. Se caractere é um operando, então o copie para a expressão posfixa;

II. Se caractere é um ‘(‘, então empilhar ´(´;

III. Se caractere é um ‘)’, então
  a) enquanto o topo da pilha for diferente de '(‘, desempilhe topo e
  o coloque na expressão posfixa;
  b) desempilhe ‘(‘ e descarte-o.

IV. Se caractere é um operador, então:
  a) Enquanto a precedência do topo da pilha for maior do que o do
  operador atual, então desempilha o topo copiando-o para a
  expressão posfixa; Precedência:  * >> . >> + >> (
  b) Empilhar o operador atual.

2. Enquanto houver operador na pilha, desempilhá-lo
copiando-o para a expressão posfixa;*/

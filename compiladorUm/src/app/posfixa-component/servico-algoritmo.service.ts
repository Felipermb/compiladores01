import { Injectable } from '@angular/core';

@Injectable()
export class ServicoAlgoritmoService {

  posfixa: string[];
  pilha: string[];
  ponto: boolean;

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
              // if(contadora >= 1){
              //   this.operador(simbolosConstantes.concatena);
              //   contadora = 0 ;
              // }
              this.parenteseAbrir();

              break;
           }
           case simbolosConstantes.parFechar: {
              this.parenteseFechar();

              break;
           }
           case simbolosConstantes.concatena: {
              // this.operador(caractere);
              // if(contadora >= 1){
              //   contadora = 0 ;
              // }
              break;
           }
           case simbolosConstantes.kleen: {
             this.operador(caractere);
            //  if(contadora >= 1){
            //     contadora = 0 ;
            //   }
             break;
           }
           case simbolosConstantes.ou: {
             this.operador(caractere);
            //  if(contadora >= 1){
            //     contadora = 0 ;
            //   }
             break;
           }
           default: {
              // if(contadora >= 1){
              //   this.operador(simbolosConstantes.concatena);
              //   contadora = 0;
              // }else{
              //   contadora++;
              // }
              // contadora++;
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
    this.ponto = true;
  }

  operando(caractere: string){
    this.posfixa.push(caractere);
    //this.imprimirMensagemLog("Operando");
  }

  parenteseAbrir(){
    this.empilhar(simbolosConstantes.parAbrir);
    //this.imprimirMensagemLog("Parentese Abrir");
  }

  parenteseFechar(){
    var aux = this.desempilhar();
    while(aux != simbolosConstantes.parAbrir || aux == null){
      this.posfixa.push(aux);
      aux = this.desempilhar();
    }
    //this.imprimirMensagemLog("Parentese Fechar");
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
    //this.imprimirMensagemLog("Operador");
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
               if(this.pilha != null){
                  var op2 = this.pilha.shift();

                  if(this.pilha != null){
                      var op1 = this.pilha.shift();

                      this.pilha.push('op2');
                  }
              }
              break;
           }
           case simbolosConstantes.kleen: {
             if(this.pilha != null){
                var op2 = this.pilha.shift();
                this.pilha.push('op2');
              }
             break;
           }
           case simbolosConstantes.ou: {
             if(this.pilha != null){
                var op2 = this.pilha.shift();

                if(this.pilha != null){
                    var op1 = this.pilha.shift();

                    this.pilha.push('op2');
                }
              }
             break;
           }
           default: {
              this.pilha.push(caractere);
              break;
           }
        }
      }

      return this.resultadoVerificacao(this.pilha);

    }

    resultadoVerificacao(pilhaTeste){
      pilhaTeste.shift();
      return pilhaTeste.length == 0;
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

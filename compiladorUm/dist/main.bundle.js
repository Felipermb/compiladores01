webpackJsonp([1,4],{

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicoAlgoritmoService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ServicoAlgoritmoService = (function () {
    function ServicoAlgoritmoService() {
    }
    ServicoAlgoritmoService.prototype.analiseLexica = function (expressao) {
        var p = this.percorrerExpressao(expressao);
        return p;
    };
    ServicoAlgoritmoService.prototype.percorrerExpressao = function (mensagem) {
        this.inicializa();
        var contadora = 0;
        for (var _i = 0, mensagem_1 = mensagem; _i < mensagem_1.length; _i++) {
            var char = mensagem_1[_i];
            var caractere = char;
            switch (caractere) {
                case simbolosConstantes.parAbrir: {
                    if (this.ponto) {
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
                    if (this.ponto) {
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
        for (var _a = 0, _b = this.posfixa; _a < _b.length; _a++) {
            var char = _b[_a];
            aux += char;
        }
        return aux;
    };
    ServicoAlgoritmoService.prototype.inicializa = function () {
        this.posfixa = [];
        this.pilha = [];
        this.parentese = 0;
        this.ponto = false;
    };
    ServicoAlgoritmoService.prototype.operando = function (caractere) {
        this.posfixa.push(caractere);
    };
    ServicoAlgoritmoService.prototype.parenteseAbrir = function () {
        this.empilhar(simbolosConstantes.parAbrir);
        this.parentese++;
    };
    ServicoAlgoritmoService.prototype.parenteseFechar = function () {
        var aux = this.desempilhar();
        if (this.parentese > 0) {
            while (aux != simbolosConstantes.parAbrir && this.pilha.length > 0) {
                this.posfixa.push(aux);
                aux = this.desempilhar();
            }
            this.parentese--;
        }
        else {
            this.posfixa.push(simbolosConstantes.parFechar);
        }
    };
    ServicoAlgoritmoService.prototype.operador = function (operador) {
        if (this.pilha.length > 0) {
            var top = this.pilha[0];
            var aux;
            while (this.precedencia(top) >= this.precedencia(operador)) {
                aux = this.desempilhar();
                this.posfixa.push(aux);
                if (this.pilha.length > 0) {
                    top = this.pilha[0];
                }
                else {
                    break;
                }
            }
        }
        this.empilhar(operador);
    };
    ServicoAlgoritmoService.prototype.empilhar = function (caractere) {
        this.pilha.unshift(caractere); //Primeira posição
    };
    ServicoAlgoritmoService.prototype.desempilhar = function () {
        var elemento = this.pilha.shift();
        return elemento;
    };
    ServicoAlgoritmoService.prototype.desempilhamentoFinal = function () {
        var aux = this.desempilhar();
        while (aux != null) {
            this.posfixa.push(aux);
            aux = this.desempilhar();
        }
    };
    ServicoAlgoritmoService.prototype.precedencia = function (caractere) {
        switch (caractere) {
            case simbolosConstantes.kleen:
                return 3;
            case simbolosConstantes.concatena:
                return 2;
            case simbolosConstantes.ou:
                return 1;
            case simbolosConstantes.parAbrir:
                return 0;
        }
    };
    ServicoAlgoritmoService.prototype.imprimirMensagemLog = function (mensagem) {
        console.log(mensagem);
    };
    ServicoAlgoritmoService.prototype.verificarExpressao = function (mensagem) {
        this.inicializa();
        for (var _i = 0, mensagem_2 = mensagem; _i < mensagem_2.length; _i++) {
            var char = mensagem_2[_i];
            var caractere = char;
            switch (caractere) {
                case simbolosConstantes.concatena: {
                    if (this.pilha.length > 0) {
                        var op2 = this.pilha.shift();
                        if (this.pilha.length > 0) {
                            var op1 = this.pilha.shift();
                            this.pilha.unshift(op2);
                        }
                    }
                    break;
                }
                case simbolosConstantes.kleen: {
                    if (this.pilha.length > 0) {
                        var op2 = this.pilha.shift();
                        this.pilha.unshift(op2);
                    }
                    break;
                }
                case simbolosConstantes.ou: {
                    if (this.pilha.length > 0) {
                        var op2 = this.pilha.shift();
                        if (this.pilha.length > 0) {
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
                    if (this.parentese < 0)
                        return false;
                    break;
                }
                default: {
                    this.pilha.unshift(caractere);
                    break;
                }
            }
        }
        return this.pilha.length - 1 == 0;
    };
    ServicoAlgoritmoService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], ServicoAlgoritmoService);
    return ServicoAlgoritmoService;
}());
var simbolosConstantes = (function () {
    function simbolosConstantes() {
    }
    simbolosConstantes.concatena = ".";
    simbolosConstantes.ou = "+";
    simbolosConstantes.kleen = "*";
    simbolosConstantes.parAbrir = "(";
    simbolosConstantes.parFechar = ")";
    return simbolosConstantes;
}());
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
//# sourceMappingURL=C:/Users/Kleyson/Desktop/AngulaJS/compiladores01/compiladorUm/src/servico-algoritmo.service.js.map

/***/ }),

/***/ 343:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 343;


/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(453);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/Kleyson/Desktop/AngulaJS/compiladores01/compiladorUm/src/main.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(611),
            styles: [__webpack_require__(609)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/Kleyson/Desktop/AngulaJS/compiladores01/compiladorUm/src/app.component.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__posfixa_component_posfixa_component_component__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__posfixa_component_servico_algoritmo_service__ = __webpack_require__(300);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__posfixa_component_posfixa_component_component__["a" /* PosfixaComponentComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_6__posfixa_component_servico_algoritmo_service__["a" /* ServicoAlgoritmoService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/Kleyson/Desktop/AngulaJS/compiladores01/compiladorUm/src/app.module.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__servico_algoritmo_service__ = __webpack_require__(300);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PosfixaComponentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PosfixaComponentComponent = (function () {
    function PosfixaComponentComponent(algoritmo) {
        this.algoritmo = algoritmo;
    }
    PosfixaComponentComponent.prototype.ngOnInit = function () {
    };
    PosfixaComponentComponent.prototype.converterInfixa = function (expressao) {
        if (expressao) {
            this.algoritmo.imprimirMensagemLog(expressao);
            this.posfixa = this.algoritmo.analiseLexica(expressao);
            this.verificacao = this.algoritmo.verificarExpressao(this.posfixa); //Campo Booleano
            if (this.verificacao) {
                this.validade = " Expressão Válida";
            }
            else {
                this.validade = " Expressão Inválida";
            }
        }
    };
    PosfixaComponentComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* Component */])({
            selector: 'app-posfixa-component',
            template: __webpack_require__(612),
            styles: [__webpack_require__(610)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__servico_algoritmo_service__["a" /* ServicoAlgoritmoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__servico_algoritmo_service__["a" /* ServicoAlgoritmoService */]) === 'function' && _a) || Object])
    ], PosfixaComponentComponent);
    return PosfixaComponentComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Kleyson/Desktop/AngulaJS/compiladores01/compiladorUm/src/posfixa-component.component.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/Kleyson/Desktop/AngulaJS/compiladores01/compiladorUm/src/environment.js.map

/***/ }),

/***/ 609:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 610:
/***/ (function(module, exports) {

module.exports = "div.container {\r\n    width: 100%;\r\n    border: 1px solid gray;\r\n}\r\n\r\nheader, footer {\r\n    padding: 1em;\r\n    color: white;\r\n    background-color: black;\r\n    clear: left;\r\n    text-align: center;\r\n}\r\n\r\nnav {\r\n    float: left;\r\n    max-width: 160px;\r\n    margin: 0;\r\n    padding: 1em;\r\n}\r\n\r\nnav ul {\r\n    list-style-type: none;\r\n    padding: 0;\r\n}\r\n\r\nnav ul a {\r\n    text-decoration: none;\r\n}\r\n\r\narticle {\r\n    margin-left: 170px;\r\n    border-left: 1px solid gray;\r\n    padding: 1em;\r\n    overflow: hidden;\r\n}\r\n"

/***/ }),

/***/ 611:
/***/ (function(module, exports) {

module.exports = "<app-posfixa-component></app-posfixa-component>\n"

/***/ }),

/***/ 612:
/***/ (function(module, exports) {

module.exports = "\n\n<body>\n  <header>\n    <h1>Compiladores</h1>\n  </header>\n\n  <nav>\n      <ul>\n        <li><a href=\"#\">Trabalho 1</a></li>\n        <li><a href=\"#\">Trabalho 2</a></li>\n        <li><a href=\"#\">Trabalho 3</a></li>\n      </ul>\n  </nav>\n\n  <article>\n    <h2>Posfixa</h2>\n    <input #expressao\n      (keyup.enter) = \"converterInfixa(expressao.value); expressao.value = ''\"\n      (blur) = \"converterInfixa(expressao.value); expressao.value = ''\">\n\n\n    <button (click)=\"converterInfixa(expressao.value)\">Converter</button>\n    <br>\n    <br>\n    <h4>Resultado:{{ validade}}</h4>\n    <label>  {{ posfixa }} </label>\n  </article>\n</body>\n"

/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(344);


/***/ })

},[625]);
//# sourceMappingURL=main.bundle.map
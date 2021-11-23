'use strict';

const display = document.getElementById("display");
const bts = document.querySelectorAll('[id*=tc]');
const sinals = document.querySelectorAll('[id*=op_]');

//novo_num responsavel pela atualização do display e guardar primeiro valor
let novo_Num = true;
let Op;
let n1;

const Op_pendente = () => Op !== undefined;

const calcular = () => {
    if (Op_pendente()){
        const n2 = parseFloat(display.textContent);
        novo_Num = true;
        if  (Op == '+'){
            console.log(n1)
            console.log(n2)
            atualizarDisplay( n1 + n2 );
            
        }
    }
}

//enquanto for novo_numero concatena no display...
const atualizarDisplay = (texto) => {
    if(novo_Num){
       display.textContent = texto; 
        novo_Num = false;
    }else{
        display.textContent += texto;
    }
}
// o evento pega o texto do botão...
const addNumber = ( evento ) => atualizarDisplay(evento.target.textContent);

// Para cada tecla de numero clicada adiciona um evento...
bts.forEach (number => number.addEventListener('click', addNumber));

const addOp = (evento) => {
    if (!novo_Num) {
        calcular();
        novo_Num = true;
        //pegando operador
        Op = evento.target.textContent;
        n1 = parseFloat(display.textContent); 
    }
}

//identifica qual botao operador foi pressionado...
sinals.forEach (operador => operador.addEventListener('click',addOp))
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

const resultClick = () =>{
    calcular();
    Op = undefined;
}
document.getElementById("result").addEventListener('click', resultClick);

const clean = () => display.textContent = "";
document.getElementById('clean').addEventListener('click',clean)

const turnOff = () => {
    clean();
    novo_Num = true;
    Op = undefined;
    n1 = undefined;
}
document.getElementById('turnOff').addEventListener('click', turnOff)


const backspace = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', backspace);


const invertSnl = () => {
        novo_Num = true;
        atualizarDisplay (display.textContent*-1);
}
document.getElementById('invert').addEventListener('click', invertSnl)


const existDcm = () => display.textContent.indexOf('.') !== -1;
const existVlr = () => display.textContent.length > 0 ;
const insertDcm = () => {
    if (!existDcm()){
        if (existVlr()){
            atualizarDisplay('.');
        }else{
            atualizarDisplay('0.');
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertDcm);


//Mapeamento para usar o teclado...

const mapTec = {
    '0' : 'tc0',
    '1' : 'tc1',
    '2' : 'tc2',
    '3' : 'tc3',
    '4' : 'tc4',
    '5' : 'tc5',
    '6' : 'tc6',
    '7' : 'tc7',
    '8' : 'tc8',
    '9' : 'tc9',
    '/' : 'op_share',
    '*' : 'op_mult',
    '-' : 'op_sub',
    '+' : 'op_add',
    '=' : 'result',
    'Enter' : 'result',
    'Backspace' : 'backspace',
    'c' : 'clean',
    '.' : 'decimal',
    'Escape' : 'turnOff',
    'i' : 'invert',
}
const mapeandoTec = (evento) => {
    const tc = evento.key;
    const tc_mapeado = () => Object.keys(mapTec).indexOf(tc) !== -1;
    if (tc_mapeado())document.getElementById(mapTec[tc]).click();
}

document.addEventListener('keydown', mapeandoTec);

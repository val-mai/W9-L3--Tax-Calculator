"use strict";
class Lavoratore {
    constructor(firstName, lastName, ral, inps, irpef) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._ral = ral;
        this._inps = inps / 100;
        this._irpef = irpef / 100;
    }
    get inps() {
        return this._inps;
    }
    get irpef() {
        return this._irpef;
    }
    get ral() {
        return this._ral;
    }
    getTasseInps() {
        return this._inps * this._ral;
    }
    getTasseIrpef() {
        return this._irpef * this._ral;
    }
}
class Autonomo extends Lavoratore {
    constructor(firstName, lastName, ral, inps, irpef, codredd) {
        super(firstName, lastName, ral, inps, irpef);
        this._codredd = codredd / 100;
    }
    getUtileTasse() {
        return this.ral * this._codredd;
    }
    getTasseInps() {
        return this.inps * this.getUtileTasse();
    }
    getTasseIrpef() {
        return this.irpef * this.getUtileTasse();
    }
    getRedditoAnnuoNetto() {
        return this.ral - this.getTasseInps() - this.getTasseIrpef();
    }
}
let inputName = document.querySelector('#inputName');
let inputLastName = document.querySelector('#inputLastName');
let inputRAL = document.querySelector('#inputRAL');
let inputInps = document.querySelector('#inputInps');
let inputIrpef = document.querySelector('#inputIrpef');
let inputCR = document.querySelector('#inputCR');
let btn = document.querySelector('button');
btn.addEventListener('click', addUser);
let utenti = [];
function addUser() {
    let firstName = inputName.value;
    let lastName = inputLastName.value;
    let RAL = +inputRAL.value;
    let Inps = +inputInps.value;
    let Irpef = +inputIrpef.value;
    let CR = +inputCR.value;
    let utente = new Autonomo(firstName, lastName, RAL, Inps, Irpef, CR);
    utenti.push(utente);
    let input = document.querySelectorAll('input');
    input.forEach(input => {
        input.value = '';
    });
    printTable();
}
function printTable() {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    utenti.forEach((utente, i) => {
        tbody.innerHTML += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${utente.firstName}</td>
            <td>${utente.lastName}</td>
            <td>${utente.ral}€</td>
            <td>${Math.floor(utente.getRedditoAnnuoNetto())}€</td>
            <td>${Math.floor(utente.getTasseInps())}€</td>
            <td>${Math.floor(utente.getTasseIrpef())}€</td>
        </tr>`;
    });
}
/* let valerio = new Autonomo('Valerio','Maiolini',25000,10,15,80);

console.log(valerio.ral);

console.log(valerio.getRedditoAnnuoNetto()); */ 

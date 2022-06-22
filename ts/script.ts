abstract class Lavoratore {

    firstName: string;
    lastName: string;
    private _ral: number;
    private _inps: number;
    private _irpef: number;

    constructor(firstName: string, lastName: string, ral: number, inps: number, irpef: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this._ral = ral;
        this._inps = inps / 100;
        this._irpef = irpef / 100;
    }

    get inps(): number {
        return this._inps;
    }

    get irpef(): number {
        return this._irpef;
    }

    get ral() {
        return this._ral;
    }

    getTasseInps(): number {
        return this._inps * this._ral;
    }
    getTasseIrpef(): number {
        return this._irpef * this._ral;
    }

    abstract getRedditoAnnuoNetto(): number
}

class Autonomo extends Lavoratore {

    private _codredd: number;

    constructor(firstName: string, lastName: string, ral: number, inps: number, irpef: number, codredd: number) {
        super(firstName, lastName, ral, inps, irpef);
        this._codredd = codredd / 100;
    }

    getUtileTasse(): number {
        return this.ral * this._codredd;
    }

    getTasseInps(): number {
        return this.inps * this.getUtileTasse();
    }

    getTasseIrpef(): number {
        return this.irpef * this.getUtileTasse();
    }

    getRedditoAnnuoNetto(): number {
        return this.ral - this.getTasseInps() - this.getTasseIrpef();
    }
}

let inputName = <HTMLInputElement>document.querySelector('#inputName');
let inputLastName = <HTMLInputElement>document.querySelector('#inputLastName');
let inputRAL = <HTMLInputElement>document.querySelector('#inputRAL');
let inputInps = <HTMLInputElement>document.querySelector('#inputInps');
let inputIrpef = <HTMLInputElement>document.querySelector('#inputIrpef');
let inputCR = <HTMLInputElement>document.querySelector('#inputCR');

let btn = document.querySelector('button');

btn!.addEventListener('click', addUser);

let utenti:Lavoratore[] = [];

function addUser() {
    let firstName = inputName.value;
    let lastName = inputLastName.value;
    let RAL = +inputRAL.value;
    let Inps = +inputInps.value;
    let Irpef = +inputIrpef.value;
    let CR = +inputCR.value;

    let utente = new Autonomo(firstName,lastName, RAL, Inps, Irpef, CR)
    utenti.push(utente);

    let input = document.querySelectorAll('input');
    input.forEach(input =>{
        input!.value = '';
    })

    printTable();
}

function printTable() {
    let tbody = document.querySelector('tbody');
    tbody!.innerHTML = '';
    utenti.forEach((utente,i) => {
        tbody!.innerHTML += `
        <tr>
            <th scope="row">${i+1}</th>
            <td>${utente.firstName}</td>
            <td>${utente.lastName}</td>
            <td>${utente.ral}€</td>
            <td>${Math.floor(utente.getRedditoAnnuoNetto())}€</td>
            <td>${Math.floor(utente.getTasseInps())}€</td>
            <td>${Math.floor(utente.getTasseIrpef())}€</td>
        </tr>`
    })
}

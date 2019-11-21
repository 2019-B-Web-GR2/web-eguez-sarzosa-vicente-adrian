import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}

// Typescript
// var nombre:string = "Adrian";
let apellido: string = "Eguez"; // Mutable
const cedula: string = "1718..."; // Inmutable OK
apellido = "Sarzosa"; // RE ASIGNANDO "=" Mutable
// cedula = "18"; // :( INMUTABLE - NO RE ASIGNAR
const casado: boolean = false; // boolean
const edad: number = 30; // number
const sueldo: number = 12.12; // number
let hijos = 0; // null
hijos = null;
let ojos; // undefined

// TRUTY - FALSY
if (0) {
    console.log('Truty');
} else {
    console.log('Falsy'); // FALSY
}
if (-1) {
    console.log('Truty'); // Truty
} else {
    console.log('Falsy');
}
if (1) {
    console.log('Truty'); // Truty
} else {
    console.log('Falsy');
}
if ("") {
    console.log('Truty');
} else {
    console.log('Falsy'); // Falsy
}
if ("abc") {
    console.log('Truty'); // Truty
} else {
    console.log('Falsy');
}

if ([]) {
    console.log('Truty'); // truty
} else {
    console.log('Falsy');
}

if ({}) {
    console.log('Truty'); // truty
} else {
    console.log('Falsy');
}

class Usuario {
    public cedula: string = "1871233";
    cedula2 = "1871233"; // public : string
    private holaMundo(): void {
        console.log("Hola")
    }

    holaMundo2() {
        console.log("Hola")
    }
}





















import {BadRequestException, Controller, Get, HttpCode, InternalServerErrorException, Post} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('pepito') // segmento url -> "/"
export class AppController {
    constructor(private readonly appService: AppService) {
    } // http://localhost:4000/pepito/ GET
    @Get() // -> url "hola-mundo"
    getHello(): string {
        return this.appService.getHello();
    }

    // http://localhost:4000/pepito/ POST
    @HttpCode(200)
    @Post('esPar')
    adiosMundo(): string {
        const segundos = this.obtenerSegundos();
        if(segundos % 2 === 0){
            return 'Adios mundo!';
        }else{
            throw new InternalServerErrorException(
                'Es  impar'
            );
        }

    }

    private obtenerSegundos(): number {
        return new Date().getSeconds();
    }

}


/*
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

// class Usuario {
//     public cedula: string = "1871233";
//     cedula2 = "1871233"; // public : string
//     constructor(
//         public nombre:string, // Crear una Propiedad
//                              // Llamada nombre y
//                              // Recibir un parametro
//                              // Y asignarlo a la propiedad
//                              // nombre
//         public apellido:string
//     ){
//
//     }
//
//
//     private holaMundo(): void {
//         console.log("Hola")
//     }
//
//     holaMundo2() {
//         console.log("Hola")
//     }
// }
// const adrian = new Usuario("Nombre");

class Usuario2 {
    constructor(
        public nombre: string, // parametro requerido
        public apellido?: string, // parametro opcional
    ) {
    }
}

const adrian = new Usuario2("Adrian");
const vicente = new Usuario2("Vicente", "Eguez");

class Empleado extends Usuario2 {
    constructor(
        nombre: string,
        public numeroContrato: string,
        apellido?: string,
    ) {
        super(nombre, apellido);
    }
}

const empleadoAdrian = new Empleado("Adrian",
    "1234");

interface Pelota {
    diametro: number;
    color?: string;
}

const balonFutbol: Pelota = {
    diametro: 1,
    color: "amazul",
    // peso: 12,
};


class Juego implements Pelota {
    diametro: number;
}


interface Entrenador {
    id: number;
    nombre: string;
}

interface Pokemon {
    id: number;
    nombre: string;
    entrenador: Entrenador | number; // Foreign Key
}

const ash: Entrenador = {
    id: 1,
    nombre: 'Ash',
};
const pikachu: Pokemon = {
    id: 1,
    nombre: 'Pikachu',
    entrenador: 1
};

const suma = pikachu.entrenador as number + pikachu.id;
const suma2 = <number>pikachu.entrenador + pikachu.id;

*/

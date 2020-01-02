import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {DeleteResult} from "typeorm";

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly _usuarioService: UsuarioService,
    ) {

    }


    // GET /modelo/:id
    @Get(':id')
    obtenerUnUsuario(
        @Param('id') identificador: string,
    ): Promise<UsuarioEntity | undefined> {
        return this._usuarioService
            .encontrarUno(
                Number(identificador)
            );
    }

    @Post()
    crearUnUsuario(
        @Body() usuario: UsuarioEntity,
    ): Promise<UsuarioEntity> {
        return this._usuarioService
            .crearUno(
                usuario
            );
    }

    @Put(':id')
    actualizarUnUsuario(
        @Body() usuario: UsuarioEntity,
        @Param('id') id: string,
    ): Promise<UsuarioEntity> {
        return this._usuarioService
            .actualizarUno(
                +id,
                usuario
            );
    }

    @Delete(':id')
    eliminarUno(
        @Param('id') id: string,
    ): Promise<DeleteResult> {
        return this._usuarioService
            .borrarUno(
                +id
            );
    }

    @Get('hola')
    hola(): string {
        return 'Hola';
    }
}
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req, Res,
    Session
} from '@nestjs/common';
import {UsuarioService} from './usuario.service';
import {UsuarioEntity} from './usuario.entity';
import {DeleteResult} from 'typeorm';
import * as Joi from '@hapi/joi';
import {UsuarioCreateDto} from './usuario.create-dto';
import {validate} from 'class-validator';
import {UsuarioUpdateDto} from './usuario.update-dto';

// JS const Joi = require('@hapi/joi');

@Controller('usuario')
export class UsuarioController {
    constructor(
        private readonly _usuarioService: UsuarioService,
    ) {

    }

    @Get('ejemploejs')
    ejemploejs(
        @Res() res,
    ) {
        res.render('ejemplo', {
            datos: {
                nombre: 'Adrian',
                suma: this.suma, // Definicion de la funcion
                joi: Joi,
            },
        });
    }

    suma(numUno, numDos) {
        return numUno + numDos;
    }

    @Post('login')
    login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Session() session,
    ) {
        console.log('Session', session);
        if (username === 'adrian' && password === '1234') {
            session.usuario = {
                nombre: 'Adrian',
                userId: 1,
                roles: ['Administrador'],
            };
            return 'ok';
        }
        if (username === 'vicente' && password === '1234') {
            session.usuario = {
                nombre: 'Vicente',
                userId: 2,
                roles: ['Supervisor'],
            };
            return 'ok';
        }
        throw new BadRequestException('No envia credenciales');
    }

    @Get('sesion')
    sesion(
        @Session() session,
    ) {
        return session;
    }

    @Get('logout')
    logout(
        @Session() session,
        @Req() req,
    ) {
        session.usuario = undefined;
        req.session.destroy();
        return 'Deslogueado';
    }

    @Get('hola')
    hola(
        @Session() session,
    ): string {
        let contenidoHTML = '';
        if (session.usuario) {
            contenidoHTML = '<ul>';
            session.usuario
                .roles
                .forEach(
                    (nombreRol) => {
                        contenidoHTML = contenidoHTML + `<li>${nombreRol}</li>`;
                    },
                );
            contenidoHTML += '</ul>';
        }


        return `
<html>
        <head> <title>EPN</title> </head>
        <body>
        <--! CONDICION ? SI : NO -->
        <h1> Mi primera pagina web ${
            session.usuario ? session.usuario.nombre : ''
        }</h1>
        ${contenidoHTML}
</body>
</html>`;
    }

    // GET /modelo/:id
    @Get(':id')
    obtenerUnUsuario(
        @Param('id') identificador: string,
    ): Promise<UsuarioEntity | undefined> {
        return this._usuarioService
            .encontrarUno(
                Number(identificador),
            );
    }

    @Post()
    async crearUnUsuario(
        @Body() usuario: UsuarioEntity,
    ): Promise<UsuarioEntity> {
        const usuarioCreateDTO = new UsuarioCreateDto();
        usuarioCreateDTO.nombre = usuario.nombre;
        usuarioCreateDTO.cedula = usuario.cedula;
        const errores = await validate(usuarioCreateDTO);
        if (errores.length > 0) {
            throw new BadRequestException('Error validando');
        } else {
            return this._usuarioService
                .crearUno(
                    usuario,
                );
        }

    }

    @Put(':id')
    async actualizarUnUsuario(
        @Body() usuario: UsuarioEntity,
        @Param('id') id: string,
    ): Promise<UsuarioEntity> {
        const usuarioUpdateDTO = new UsuarioUpdateDto();
        usuarioUpdateDTO.nombre = usuario.nombre;
        usuarioUpdateDTO.cedula = usuario.cedula;
        usuarioUpdateDTO.id = +id;
        const errores = await validate(usuarioUpdateDTO);
        if (errores.length > 0) {
            throw new BadRequestException('Error validando');
        } else {
            return this._usuarioService
                .actualizarUno(
                    +id,
                    usuario,
                );
        }

    }

    @Delete(':id')
    eliminarUno(
        @Param('id') id: string,
    ): Promise<DeleteResult> {
        return this._usuarioService
            .borrarUno(
                +id,
            );
    }

    @Get()
    async buscar(
        @Query('skip') skip?: string | number,
        @Query('take') take?: string | number,
        @Query('where') where?: string,
        @Query('order') order?: string,
    ): Promise<UsuarioEntity[]> {
        if (order) {
            try {
                order = JSON.parse(order);
            } catch (e) {
                order = undefined;
            }
        }
        if (where) {
            try {
                where = JSON.parse(where);
            } catch (e) {
                where = undefined;
            }
        }
        if (skip) {
            skip = +skip;
            // const nuevoEsquema = Joi.object({
            //     skip: Joi.number()
            // });
            // try {
            //     const objetoValidado = await nuevoEsquema
            //         .validateAsync({
            //             skip: skip
            //         });
            //     console.log('objetoValidado', objetoValidado);
            // } catch (error) {
            //     console.error('Error',error);
            // }
        }
        if (take) {
            take = +take;
        }
        return this._usuarioService
            .buscar(
                where,
                skip as number,
                take as number,
                order,
            );
    }

}

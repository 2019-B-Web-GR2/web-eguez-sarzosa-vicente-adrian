import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario/usuario.entity';
import {UsuarioModule} from './usuario/usuario.module';
import {UsuarioService} from './usuario/usuario.service';
import {MascotasModule} from "./mascotas/mascotas.module";
import {MascotasEntity} from "./mascotas/mascotas.entity";

@Module({
    imports: [
        UsuarioModule,
        MascotasModule,
        TypeOrmModule.forRoot(
            {
                name: 'default', // Nombre cadena de Conex.
                type: 'mysql',
                host: '172.31.108.148',
                port: 32769,
                username: 'LazaMH',
                password: '1234',
                database: 'Prueba',
                dropSchema: true,
                entities: [
                    UsuarioEntity,
                    MascotasEntity,
                ],
                synchronize: true, // Crear -> true , Conectar -> false
            },
        ),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(
        private _usuarioService: UsuarioService,
    ) {

    }
}
//
//
const criterioBusqueda = {
    "where":{
        "moduloCurso":{}
    }
};
//






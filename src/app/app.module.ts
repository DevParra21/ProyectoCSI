import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';

import { InicioComponent } from './inicio/inicio.component';
import { PrincipalComponent } from './principal/principal.component';
import { MaestrosComponent } from './maestros/maestros.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { MateriasComponent } from './materias/materias.component';
import { GruposComponent } from './grupos/grupos.component';
import { RegistraAlumnoComponent } from './registra-alumno/registra-alumno.component';
import { RegistraMaestroComponent } from './registra-maestro/registra-maestro.component';
import { RegistraMateriaComponent } from './registra-materia/registra-materia.component';
import { RegistraGrupoComponent } from './registra-grupo/registra-grupo.component';
import { InscribirMateriaComponent } from './inscribir-materia/inscribir-materia.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'registra-alumno', component: RegistraAlumnoComponent},
  {path: 'inscripcion', component: InscribirMateriaComponent},
  {path: 'maestros', component: MaestrosComponent},
  {path: 'registra-maestro', component: RegistraMaestroComponent},
  {path: 'materias', component: MateriasComponent},
  {path: 'registra-materia', component: RegistraMateriaComponent},
  {path: 'grupos', component: GruposComponent},
  {path: 'registra-grupo', component: RegistraGrupoComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    PrincipalComponent,
    MaestrosComponent,
    AlumnosComponent,
    MateriasComponent,
    GruposComponent,
    RegistraAlumnoComponent,
    RegistraMaestroComponent,
    RegistraMateriaComponent,
    RegistraGrupoComponent,
    InscribirMateriaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    RouterModule.forRoot(routes)
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';

import { InicioComponent } from './inicio/inicio.component';
import { PrincipalComponent } from './principal/principal.component';

import { MaestrosComponent } from './maestros/maestros.component';
import { MaestroFormComponent } from './maestros/maestro-form.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { AlumnoFormComponent } from './alumnos/alumno-form.component';
import { MateriasComponent } from './materias/materias.component';
import { MateriaFormComponent } from './materias/materia-form.component';
import { GruposComponent } from './grupos/grupos.component';
import { GrupoFormComponent } from './grupos/grupo-form.component';
import { InscribirMateriaComponent } from './inscribir-materia/inscribir-materia.component';

import { MaestroService } from './maestros/maestro.service';
import { AlumnoService } from './alumnos/alumno.service';
import { MateriaService } from './materias/materia.service';
import { GrupoService } from './grupos/grupo.service';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent},
  {path: 'principal', component: PrincipalComponent},
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'alumnos/registra-alumno', component: AlumnoFormComponent},
  {path: 'alumnos/modifica-alumno/:id', component: AlumnoFormComponent},
  {path: 'inscripcion', component: InscribirMateriaComponent},
  {path: 'maestros', component: MaestrosComponent},
  {path: 'maestros/registra-maestro', component: MaestroFormComponent},
  {path: 'maestros/modifica-maestro/:id', component: MaestroFormComponent},
  {path: 'materias', component: MateriasComponent},
  {path: 'materias/registra-materia', component: MateriaFormComponent},
  {path: 'materias/modifica-materia/:id', component: MateriaFormComponent},
  {path: 'grupos', component: GruposComponent},
  {path: 'grupos/registra-grupo', component: GrupoFormComponent},
  {path: 'grupos/modifica-grupo/:id', component: GrupoFormComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InicioComponent,
    PrincipalComponent,
    MaestrosComponent,
    MaestroFormComponent,
    AlumnosComponent,
    AlumnoFormComponent,
    MateriasComponent,
    MateriaFormComponent,
    GruposComponent,
    GrupoFormComponent,
    InscribirMateriaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
    ],
  providers: [
    MaestroService,
    AlumnoService,
    MateriaService,
    GrupoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

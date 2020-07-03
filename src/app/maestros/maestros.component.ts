import { Component, OnInit } from '@angular/core';
import { Maestro } from './maestro';
import { MaestroService } from './maestro.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.css']
})
export class MaestrosComponent implements OnInit {

  maestros:Maestro[];
  
  constructor(private maestroService:MaestroService) { }

  ngOnInit(): void {
    this.maestroService.getMaestros().subscribe( res => this.maestros = res );
  }

  delete(maestro:Maestro):void{
    Swal.fire({
      title: 'Eliminación de Maestro',
      text: "¿Deseas Continuar? Esta acción no será reversible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.value) {
        this.maestroService.delete(maestro.numeroEmpleado).subscribe(response =>{
          this.maestros = this.maestros.filter(alu => alu !== maestro)
          Swal.fire(
            'Maestro Eliminado',
            'El registro ha sido eliminado correctamente.',
            'success'
          )
        })
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { Maestro } from './maestro';
import { MaestroService } from './maestro.service';
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

}

import { Component, OnInit } from '@angular/core';
import { RegistroService } from "../services/registro.service";
import { Registro } from "../models/registro";

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.css']
})
export class IncidentsListComponent implements OnInit {
  modalId: number = -1;

  constructor(
    public registroService : RegistroService
  ) { }

  ngOnInit() {
    this.getRegisters();
  }

  getRegisters () {
    this.registroService.getRegisters()
      .subscribe(res => {
        this.registroService.regs = res as Registro[];
      },
      err => console.log(err)
      )
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  selectedRegistro : Registro;
  readonly URL_API = 'http://localhost:3000/api/registros';
  regs: Registro[];
  
  constructor(
    private http : HttpClient
  ) {
    this.selectedRegistro = new Registro();
  }

  getRegisters(){
    return this.http.get(this.URL_API);
  }

}

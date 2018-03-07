import { Component, OnInit } from "@angular/core";
import { GLOBAL } from "../../services/global";

@Component({
  selector: "app-interacciones",
  templateUrl: "./interacciones.component.html",
  styleUrls: ["./interacciones.component.css"]
})
export class InteraccionesComponent implements OnInit {
  public showInteraccion: Boolean = false;
  public showButton: Boolean = false;
  public redes;
  public facebook;
  public chat;
  public correo;
  public whatsapp;
  public linea;
  public twitter;
  public items;
  constructor() {}

  ngOnInit() {}

  mostrar(cadena: string) {

    this.showInteraccion = !this.showInteraccion;
    this.redes = cadena;
  }
  consulta(cadena:string){
    console.log(cadena);
    if(cadena==="facebook"){
      // this.items=GLOBAL.consultas
    }
  }
}

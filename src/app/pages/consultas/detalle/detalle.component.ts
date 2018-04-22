import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"]
})
export class DetalleComponent implements OnInit {
  public detalleConsula;
  id: number;
  nombre;
  descripcion;
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.getSolicitudes();
  }
  getSolicitudes() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    this._httpService.buscarId("solicitudes", this.id).subscribe(result => {
      this.nombre = result.nombre;
      this.descripcion = result.descripcion;
    });
  }
}

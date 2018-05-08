import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GLOBAL } from "../../../services/global";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";

@Component({
  selector: "app-reporte",
  templateUrl: "./reporte.component.html",
  styleUrls: ["./reporte.component.css"]
})
export class ReporteComponent implements OnInit {
  public departamentos = GLOBAL.departamentos;
  public cadena: string;
  public showReporte: Boolean = false;
  public showForm: Boolean = false;
  public departamento;
  public desde;
  public hasta;
  data$;
  dataGeneral$;
  reporteForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.reporteForm = new FormGroup({
      departamento: new FormControl("", Validators.required)
    });
  }
  onSubmit() {
    console.log(this.reporteForm.controls["departamento"].value);
    this.departamento = this.reporteForm.controls["departamento"].value;
    this.showReporte = false;
    this._httpService
      .obtenerReporte("reclamos/reportes", this.departamento)
      .subscribe(resp => {
        console.log(resp);
        this.data$ = resp;
        this._httpService
          .obtenerReporte("reclamos/reportes", "TODO")
          .subscribe(response => {
            this.dataGeneral$ = response;
            this.showReporte = true;
            console.log(response);
          });
      });
  }
  excel() {
    this.showForm = true;
    console.log(this.desde, this.hasta);
  }
}

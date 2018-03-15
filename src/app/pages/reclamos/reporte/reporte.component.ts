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
  public departamento;
  public showForm: Boolean = false;
  public desde;
  public hasta;

  data$;
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
    console.log(this.departamento);
    this.showReporte = false;
    this.data$ = this.reporteForm.controls["departamento"].value;
    this._httpService
      .obtenerReporte(
        "reclamos/reportes",
        this.reporteForm.controls["departamento"].value
      )
      .subscribe(resp => {
        this.data$ = resp;
        this.showReporte = true;
        console.log(resp);
      });
    // console.log(this.data$);
  }
  excel() {
    this.showForm=true;
    console.log(this.desde,this.hasta)
  }
}

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
  public canales = GLOBAL.canales;
  public showReporte: Boolean = false;
  public showForm: Boolean = false;
  public canal;
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
      canal: new FormControl("", Validators.required)
    });
  }
  onSubmit() {
    this.canal = this.reporteForm.controls["canal"].value;
    this.showReporte = false;
    this._httpService
      .obtenerReporte("instancias/graficas", this.canal)
      .subscribe(resp => {
        console.log(resp);
        this.data$ = resp;
        this._httpService
          .obtenerReporte("instancias/graficas", "TODO")
          .subscribe(response => {
            this.dataGeneral$ = response;
            this.showReporte = true;
            console.log(response);
          });
      });
  }
}

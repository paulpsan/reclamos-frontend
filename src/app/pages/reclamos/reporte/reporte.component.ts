import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GLOBAL } from "../../../services/global";

@Component({
  selector: "app-reporte",
  templateUrl: "./reporte.component.html",
  styleUrls: ["./reporte.component.css"]
})
export class ReporteComponent implements OnInit {
  public departamentos = GLOBAL.departamentos;
  reporteForm: FormGroup;
  constructor() {}

  ngOnInit() {
    this.reporteForm = new FormGroup({
      departamento: new FormControl("", Validators.required)
    });
  }
  onSubmit() {}
}

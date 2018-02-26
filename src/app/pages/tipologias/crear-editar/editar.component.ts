import { UsePipeTransformInterfaceRule } from "codelyzer";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";
import { GLOBAL } from "../../../services/global";

@Component({
  selector: "app-editar",
  templateUrl: "./editar.component.html",
  styleUrls: ["./editar.component.css"]
})
export class EditarComponent implements OnInit {
  public tipologia;
  public identity;
  public tipologias;
  public cargando:Boolean=false;
  id: number;
  private sub: any;
  tipologiaForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"];
    });
    if (localStorage.getItem("identity")) {
      this.identity = JSON.parse(localStorage.getItem("identity"));
      console.log(this.identity);
    }
    this.tipologiaForm = new FormGroup({
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("")
    });

    this.obtenerConsulta();
  }

  obtenerConsulta() {
    this._httpService.buscarId("tipologias", this.id).subscribe(result => {
      this.tipologia = result;
      this.cargarDatos();
    });
  }
  cargarDatos() {
    console.log(this.tipologia);
    this.tipologiaForm.setValue({
      nombre: this.tipologia.nombre,
      descripcion: this.tipologia.descripcion
    });
  }

  onSubmit() {
    console.log(this.tipologia);
    if (this.tipologiaForm.valid) {
      let tipologia = {_id:this.tipologia._id, nombre: this.tipologiaForm.controls["nombre"].value, descripcion: this.tipologiaForm.controls["descripcion"].value };
      this._httpService.editar("tipologias", tipologia).subscribe(res => {
        setTimeout(() => {
          this.tipologiaForm.reset();
          this.router.navigate(["/tipologias"]);
        }, 1000);
      });
    }
  }
}

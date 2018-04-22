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
  public Consulta;
  public identity;
  public tipologias;
  public cargando:Boolean=false;
  id: number;
  private sub: any;

  solicitudesForm: FormGroup;
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
    }
    this.tipologiaForm = new FormGroup({
      nombreTipologia: new FormControl("", Validators.required),
      descripcionTipologia: new FormControl("")
    });

    this.solicitudesForm = new FormGroup({
      tipologia: new FormControl("", Validators.required),
      nombre: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      prioridad: new FormControl("", Validators.required)
    });
    this._httpService.obtener("tipologias").subscribe(result => {
      this.tipologias = result;
    });
    this.obtenerConsulta();
  }

  obtenerConsulta() {
    this._httpService.buscarId("solicitudes", this.id).subscribe(result => {
      this.Consulta = result;
      this.cargarDatos();
    });
  }
  cargarDatos() {
    this.solicitudesForm.setValue({
      tipologia: this.Consulta.Tipologia._id,
      nombre: this.Consulta.nombre,
      descripcion: this.Consulta.descripcion,
      prioridad: this.Consulta.prioridad
    });
  }

  onSubmit() {
    if (this.solicitudesForm.valid) {
      let Consulta = {
        _id: this.Consulta._id,
        fk_tipologia: parseInt(this.solicitudesForm.controls["tipologia"].value),
        nombre: this.solicitudesForm.controls["nombre"].value,
        descripcion: this.solicitudesForm.controls["descripcion"].value,
        prioridad: parseInt(this.solicitudesForm.controls["prioridad"].value),
      };
      this._httpService.editar("solicitudes", Consulta).subscribe(res => {
        setTimeout(() => {
          this.solicitudesForm.reset();
          this.router.navigate(["/consultas"]);
        }, 1000);
      });
    }
  }
}

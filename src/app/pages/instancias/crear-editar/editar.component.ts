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
  public instancia;
  public entradas = GLOBAL.canales;
  public categorias = GLOBAL.categorias;
  public identity;
  id: number;
  private sub: any;

  userForm: FormGroup;

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
    this.obtenerInstancia();
    this.userForm = new FormGroup({
      entrada: new FormControl("", Validators.required),
      categoria: new FormControl("", Validators.required),
      subcategoria: new FormControl("", Validators.required),
      descripcion: new FormControl("")
    });
  }
  obtenerInstancia() {
    this._httpService.buscarId("interacciones", this.id).subscribe(result => {
      this.instancia = result;
      this.cargarDatos();
    });
  }
  cargarDatos() {
    console.log(this.instancia);
    this.userForm.setValue({
      entrada: this.instancia.entrada,
      categoria: this.instancia.categoria,
      subcategoria: this.instancia.subcategoria,
      descripcion: this.instancia.descripcion
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let instancia = {
        _id: this.instancia._id,
        entrada: this.userForm.controls["entrada"].value,
        categoria: this.userForm.controls["categoria"].value,
        subcategoria: this.userForm.controls["subcategoria"].value,
        descripcion: this.userForm.controls["descripcion"].value
      };
      this._httpService.editar("interacciones", instancia).subscribe(res => {
        setTimeout(() => {
          this.userForm.reset();
          if (this.identity.rol === "ADMIN") {
            this.router.navigate(["/instancias"]);
          }
        }, 1000);
      });
    }
  }
  cancel() {
    console.log(this.identity.rol);
    if (this.identity.rol === "ADMIN") {
      this.router.navigate(["/instancias"]);
    }
  }
}

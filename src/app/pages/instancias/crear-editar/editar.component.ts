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
  checkForm: Boolean = false;
  public identity;
  id: number;
  private sub: any;

  instanForm: FormGroup;

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
    this.instanForm = new FormGroup({
      entrada: new FormControl("", Validators.required),
      categoria: new FormControl("", Validators.required),
      subcategoria: new FormControl("", Validators.required),
      descripcion: new FormControl(""),
      checkForm: new FormControl(this.checkForm),
      campo1: new FormControl(""),
      campo2: new FormControl(""),
      campo3: new FormControl(""),
      campo4: new FormControl(""),
      campo5: new FormControl(""),
      campo6: new FormControl(""),
      campo7: new FormControl(""),
      campo8: new FormControl("")
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
    if (this.instancia.formulario) {
      this.checkForm = true;
      this.instanForm.setValue({
        entrada: this.instancia.entrada,
        categoria: this.instancia.categoria,
        subcategoria: this.instancia.subcategoria,
        descripcion: this.instancia.descripcion,
        checkForm: this.checkForm,
        campo1: this.instancia.formulario.campo1,
        campo2: this.instancia.formulario.campo2,
        campo3: this.instancia.formulario.campo3,
        campo4: this.instancia.formulario.campo4,
        campo5: this.instancia.formulario.campo5,
        campo6: this.instancia.formulario.campo6,
        campo7: this.instancia.formulario.campo7,
        campo8: this.instancia.formulario.campo8
      });
    } else {
      this.instanForm.setValue({
        entrada: this.instancia.entrada,
        categoria: this.instancia.categoria,
        subcategoria: this.instancia.subcategoria,
        descripcion: this.instancia.descripcion,
        checkForm: this.checkForm,
        campo1: "",
        campo2: "",
        campo3: "",
        campo4: "",
        campo5: "",
        campo6: "",
        campo7: "",
        campo8: ""
      });
    }
  }
  createForm() {
    this.checkForm = !this.checkForm;
  }
  onSubmit() {
    if (this.instanForm.valid) {
      let instancia = {};
      if (this.checkForm) {
        instancia = {
          _id: this.instancia._id,
          entrada: this.instanForm.controls["entrada"].value,
          categoria: this.instanForm.controls["categoria"].value,
          subcategoria: this.instanForm.controls["subcategoria"].value,
          descripcion: this.instanForm.controls["descripcion"].value,
          formulario: {
            campo1: this.instanForm.controls["campo1"].value,
            campo2: this.instanForm.controls["campo2"].value,
            campo3: this.instanForm.controls["campo3"].value,
            campo4: this.instanForm.controls["campo4"].value,
            campo5: this.instanForm.controls["campo5"].value,
            campo6: this.instanForm.controls["campo6"].value,
            campo7: this.instanForm.controls["campo7"].value,
            campo8: this.instanForm.controls["campo8"].value
          }
        };
      } else {
        instancia = {
          _id: this.instancia._id,
          entrada: this.instanForm.controls["entrada"].value,
          categoria: this.instanForm.controls["categoria"].value,
          subcategoria: this.instanForm.controls["subcategoria"].value,
          descripcion: this.instanForm.controls["descripcion"].value,
          formulario: null
        };
      }
      this._httpService.editar("interacciones", instancia).subscribe(res => {
        setTimeout(() => {
          this.instanForm.reset();
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

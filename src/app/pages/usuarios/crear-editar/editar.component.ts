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
  public usuario;
  public roles = GLOBAL.roles;
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
    this.obtenerUsuario();
    this.userForm = new FormGroup({
      usuario: new FormControl("", Validators.required),
      rol: new FormControl(""),
      password: new FormControl(""),
      persona_nombres: new FormControl(""),
      persona_amaterno: new FormControl(""),
      persona_apaterno: new FormControl(""),
      persona_genero: new FormControl(""),
      persona_fecha_nacimiento: new FormControl("")
    });
  }
  obtenerUsuario() {
    this._httpService.buscarId("usuarios", this.id).subscribe(result => {
      this.usuario = result;
      this.cargarDatos();
    });
  }
  cargarDatos() {
    console.log(this.usuario);
    this.userForm.setValue({
      usuario: this.usuario.usuario,
      rol: this.usuario.rol,
      password: this.usuario.password,
      persona_nombres: this.usuario.nombres,
      persona_amaterno: this.usuario.amaterno,
      persona_apaterno: this.usuario.apaterno,
      persona_genero: this.usuario.genero,
      persona_fecha_nacimiento: this.usuario.fecha_nacimiento
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      let usuario = {
        _id: this.usuario._id,
        usuario: this.userForm.controls["usuario"].value,
        rol: this.userForm.controls["rol"].value,
        password: this.userForm.controls["password"].value,
        nombres: this.userForm.controls["persona_nombres"].value,
        amaterno: this.userForm.controls["persona_amaterno"].value,
        apaterno: this.userForm.controls["persona_apaterno"].value,
        genero: this.userForm.controls["persona_genero"].value,
        fecha_nacimiento: this.userForm.controls["persona_fecha_nacimiento"]
          .value
      };
      this._httpService.editar("usuarios", usuario).subscribe(res => {
        setTimeout(() => {
          this.userForm.reset();
          if (this.identity.rol === "ADMIN") {
            this.router.navigate(["/usuarios"]);
          }else
          this.router.navigate(["/reclamos"]);
        }, 1000);
      });
    }
  }
  cancel() {
    console.log(this.identity.rol);
    if (this.identity.rol === "ADMIN") {
      this.router.navigate(["/usuarios"]);
    }else
    this.router.navigate(["/reclamos"]);
  }
}

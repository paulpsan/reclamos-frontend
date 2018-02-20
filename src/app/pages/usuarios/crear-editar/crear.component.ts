import { Usuario } from "./../../../models/usuario";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../../services/http.service";
import { GLOBAL } from "../../../services/global";

@Component({
  selector: "app-crear",
  templateUrl: "./crear.component.html",
  styleUrls: ["./crear.component.css"]
})
export class CrearComponent implements OnInit {
  public roles = GLOBAL.roles;
  id: number;
  acciones: string;
  private sub: any;
  userForm: FormGroup;
  identity;
  usuario: Usuario;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    console.log("hola");
    this.userForm = new FormGroup({
      usuario: new FormControl("", Validators.required),
      rol: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      persona_nombres: new FormControl("", Validators.required),
      persona_amaterno: new FormControl(""),
      persona_apaterno: new FormControl(""),
      persona_genero: new FormControl(""),
      persona_fecha_nacimiento: new FormControl("")
    });
  }
  onSubmit() {
    let objeto = {
      usuario: this.userForm.controls["usuario"].value,
      rol: this.userForm.controls["rol"].value,
      password: this.userForm.controls["password"].value,
      nombres: this.userForm.controls["persona_nombres"].value,
      amaterno: this.userForm.controls["persona_amaterno"].value,
      apaterno: this.userForm.controls["persona_apaterno"].value,
      genero: this.userForm.controls["persona_genero"].value,
      fecha_nacimiento: this.userForm.controls["persona_fecha_nacimiento"].value,
    };
    console.log(objeto);
    this._httpService.adicionar("usuarios", objeto).subscribe(response => {
      this.router.navigate(["/usuarios"]);
    });
    this.userForm.reset();
  }
}

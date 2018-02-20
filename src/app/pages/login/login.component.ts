import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "../../services/http.service";
import { Usuario } from "../../models/usuario";
import { GLOBAL } from "./../../services/global";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public usuario: Usuario;
  public identity;
  public warning: boolean = false;
  public warning_message;
  constructor(private router: Router, private _httpService: HttpService) {}

  ngOnInit() {
    localStorage.removeItem("identity");
    localStorage.clear();
    this.loginForm = new FormGroup({
      user: new FormControl("", [
        Validators.required
        // Validators.pattern("[^ @]*@[^ @]*")
      ]),
      password: new FormControl("", Validators.required)
    });
  }

  onSubmit() {
    let user = this.loginForm.controls["user"].value;
    let pass = this.loginForm.controls["password"].value;

    this._httpService.login(user, pass).subscribe(
      resp => {
        this.identity = resp;
        localStorage.setItem("identity", JSON.stringify(this.identity));
        this.router.navigate(["/reclamos"]);
      },
      err => {
        this.warning = true;
        console.log(err.status);
        if (err.status == "404") {
          console.log(err);
          this.warning_message = "Usuario o Contraseña Incorrecta";
        } else {
          this.warning_message = err.message;
        }
      }
    );
  }
}

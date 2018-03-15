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
  public entradas = GLOBAL.canales;
  public categorias = GLOBAL.categorias;
  id: number;
  acciones: string;
  private sub: any;
  userForm: FormGroup;
  identity;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      entrada: new FormControl("", Validators.required),
      categoria: new FormControl("", Validators.required),
      subcategoria: new FormControl("", Validators.required),
      descripcion: new FormControl("")
    });
  }
  onSubmit() {
    let objeto = {
      entrada: this.userForm.controls["entrada"].value,
      categoria: this.userForm.controls["categoria"].value,
      subcategoria: this.userForm.controls["subcategoria"].value,
      descripcion: this.userForm.controls["descripcion"].value
    };
    console.log(objeto);
    this._httpService.adicionar("interacciones", objeto).subscribe(response => {
      this.userForm.reset();
      this.router.navigate(["/instancias"]);
    });
  }
}

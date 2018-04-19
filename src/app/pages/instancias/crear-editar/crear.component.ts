import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormsModule,
  FormGroup,
  Validators
} from "@angular/forms";
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
  checkForm: Boolean = false;
  private sub: any;
  instanForm: FormGroup;
  identity;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
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
  onSubmit() {
    let objeto = {};
    console.log(objeto);
    console.log(this.checkForm);
    if (!this.checkForm) {
      objeto = {
        entrada: this.instanForm.controls["entrada"].value,
        categoria: this.instanForm.controls["categoria"].value,
        subcategoria: this.instanForm.controls["subcategoria"].value,
        descripcion: this.instanForm.controls["descripcion"].value,
        formulario: null
      };
    } else {
      objeto = {
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
    }

    this._httpService.adicionar("interacciones", objeto).subscribe(response => {
      this.instanForm.reset();
      this.router.navigate(["/instancias"]);
    });
  }
  createForm() {
    this.checkForm = !this.checkForm;
    console.log(this.checkForm);
  }
}

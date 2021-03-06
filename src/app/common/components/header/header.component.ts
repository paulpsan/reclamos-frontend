import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../../models/usuario";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  public identity;
  public login: boolean = false;
  title = "app";
  navLinks: any[] = [
    {
      label: "Reclamos",
      path: "/reclamos",
      access: ""
    },
    {
      label: "Usuarios",
      path: "/usuarios",
      access: "ADMIN"
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("identity")) {
      this.login = true;
      this.identity = JSON.parse(localStorage.getItem("identity"));
    }
  }
  logout() {
    this.login = false;
    localStorage.removeItem("identity");
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}

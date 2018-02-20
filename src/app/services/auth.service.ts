import { Component, Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpParams } from "@angular/common/http";
import "rxjs/Rx";
import { Observable } from "rxjs/Rx";
import { GLOBAL } from "./global";

@Injectable()
export class AuthService {
  public identity;
  public token;
  private url: string;

  constructor(
    private _http : HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  login(nombre: string, objeto: any) {
    return this._http
      .post(this.url + nombre, objeto)
      .map((res: Response) => {
        localStorage.setItem('token',res['token']);
        return res['usuario'];
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
  }
  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'))
    if(identity!="undefined"){
      this.identity=identity;
    }else{
      this.identity=null;
    }
    return this.identity;
  }
  getToken() {
    let token = localStorage.getItem('token')
    if(token!="undefined"){
      this.token=token;
    }else{
      this.token=null;
    }
    return this.token;
  }
}

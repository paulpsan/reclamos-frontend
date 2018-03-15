import { Component, Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import "rxjs/Rx";
import { Observable } from "rxjs/Rx";
import { GLOBAL } from "./global";

@Injectable()
export class HttpService {
  public identity;
  public token;
  private url: string;
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login(user: string, pass: string): Observable<any> {
    let objeto = {
      usuario: user,
      password: pass
    };
    console.log(objeto);
    return this._http
      .post(this.url + "autenticacion", objeto)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  //obtiene datos de forma general
  obtener(nombre: string): Observable<any[]> {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http
      .get(this.url + nombre + "?tsp=" + Date.now())
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  obtenerPor(nombre: string, id: Number, nombre2: string): Observable<any[]> {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http
      .get(this.url + nombre + "/" + id + "/" + nombre2 + "?tsp=" + Date.now())
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  //obtiene datos de forma general
  obtenerPaginado(nombre: string, obj): Observable<any[]> {
    let myParams = new HttpParams();
    myParams = myParams.append("pagina", obj.pagina);
    myParams = myParams.append("limite", obj.limite);
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http
      .get(this.url + nombre + "?tsp=" + Date.now(), { params: myParams })
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }
  //obtiene los usuarios de un proyecto
  obtenerReporte(nombre: string, param: string): Observable<any> {
    return this._http
      .get(this.url + nombre + "/" + param.toUpperCase() + "?tsp=" + Date.now())
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  buscarId(nombre: string, id): Observable<any> {
    let headers = new Headers({ "Content-Type": "application/json" });
    return this._http
      .get(this.url + nombre + "/" + id + "?tsp=" + Date.now())
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Error"));
  }

  adicionar(nombre: string, objeto: any): Observable<any> {
    return this._http
      .post(this.url + nombre, objeto)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  post(url: string, objeto: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8"
    });
    return this._http
      .post(url, objeto, { headers })
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  buscar(nombre: string, objeto: any): Observable<any> {
    return this._http
      .post(this.url + nombre, objeto)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  editar(nombre: string, objeto: any): Observable<any[]> {
    return this._http
      .put(this.url + nombre + "/" + objeto._id, objeto)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  eliminarId(nombre: string, id: number): Observable<boolean> {
    return this._http
      .delete(this.url + nombre + "/" + id)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw(error || "Server error"));
  }

  // obtener(){
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   // headers.append('Authorization', pin);
  //   // let options = new RequestOptions({ headers: headers });
  //   return this._http.get(this.url).map(res => res.json());
  // }
}

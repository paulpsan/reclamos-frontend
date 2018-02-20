export class Usuario {
    public _id: number;
    public nombre: string;
    public email: string;
    public password: string;
    public role: string;
    public tipo:string;
    public login:string;
    public datos: any[];
    constructor(
        _id: number,
        nombre: string,
        email: string,
        password: string,
        role: string,
        login:string,
        tipo:string,
        datos: any[],

    ) {
        this._id = _id;
        this.nombre= nombre;
        this.email=email;
        this.password=password;
        this.role=role;
        this.tipo=tipo;
        this.datos=datos;
    }
}

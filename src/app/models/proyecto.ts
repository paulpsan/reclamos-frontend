export class Proyecto {
    constructor(
        public _id: string,
        public nombre: string,
        public descripcion: string,
        public urlRepositorio: string,
        public id_usuario:number,
        public tipo:string,
        public datos: any[]
    ) { }
}

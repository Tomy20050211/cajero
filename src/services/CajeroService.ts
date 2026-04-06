import{
    tipoTransaccion
} from '../models/CuentaBancaria'

//creacion de una clase que contendra mi logica de negocio
export abstract class CuentaBancaria{
    public id: number;
    public titular: string;
     public saldo: number; 

    constructor(id: number, titular: string, saldo: number){
        this.id = id;
        this.titular = titular;
        this.saldo = saldo;
    
    }
    

}

//creacion de una clase hija para la funcionalidad del cajero
export class cajero extends CuentaBancaria{
    constructor(id: number, titular: string, saldo: number) {
        super(id, titular, saldo);
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    depositar(monto: number): tipoTransaccion {
        if (monto > 0) {
            this.saldo += monto;
            return "Exito";
        }
        return "Error";
    }

    retirar(monto: number): tipoTransaccion {
        if (monto > 0 && monto <= this.saldo) {
            this.saldo -= monto;
            return "Exito";
        }
        return "Error";
    }
   

}

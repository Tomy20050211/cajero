import { CuentaBancaria } from "../models/CuentaBancaria";
import { CajeroService } from "../services/CajeroService";

export const cuentaPrincipal = new CuentaBancaria(1, "Thomas", 300000);
export const cuentaPremium = new CuentaBancaria(2, "Andrea", 800000);
export const cajeroPrincipal = new CajeroService(500000);

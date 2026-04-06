import { CuentaBancaria } from "../models/CuentaBancaria";
import { crearResultadoOperacion, validarMonto } from "../utils/validaciones";

export interface ResultadoOperacion<T> {
  exito: boolean;
  mensaje: string;
  datos?: T;
}

export interface ICajeroService {
  consultarSaldo(cuenta: CuentaBancaria): ResultadoOperacion<number>;
  depositar(cuenta: CuentaBancaria, monto: number): ResultadoOperacion<number>;
  retirar(cuenta: CuentaBancaria, monto: number): ResultadoOperacion<number>;
  consultarFondosCajero(): number;
}

export class CajeroService implements ICajeroService {
  constructor(private efectivoDisponible: number) {}

  public consultarFondosCajero(): number {
    return this.efectivoDisponible;
  }

  public consultarSaldo(cuenta: CuentaBancaria): ResultadoOperacion<number> {
    return crearResultadoOperacion(
      true,
      `Saldo consultado correctamente para la cuenta de ${cuenta.getTitular()}.`,
      cuenta.consultarSaldo(),
    );
  }

  public depositar(
    cuenta: CuentaBancaria,
    monto: number,
  ): ResultadoOperacion<number> {
    try {
      validarMonto(monto);
      cuenta.depositar(monto);
      this.efectivoDisponible += monto;

      return crearResultadoOperacion(
        true,
        `Deposito realizado con exito por ${monto}.`,
        cuenta.consultarSaldo(),
      );
    } catch (error) {
      return crearResultadoOperacion(false, this.obtenerMensajeError(error));
    }
  }

  public retirar(
    cuenta: CuentaBancaria,
    monto: number,
  ): ResultadoOperacion<number> {
    try {
      validarMonto(monto);

      if (monto > this.efectivoDisponible) {
        throw new Error("El cajero no tiene fondos suficientes para entregar ese monto.");
      }

      cuenta.retirar(monto);
      this.efectivoDisponible -= monto;

      return crearResultadoOperacion(
        true,
        `Retiro realizado con exito por ${monto}.`,
        cuenta.consultarSaldo(),
      );
    } catch (error) {
      return crearResultadoOperacion(false, this.obtenerMensajeError(error));
    }
  }

  private obtenerMensajeError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return "Ocurrio un error inesperado en la operacion.";
  }
}

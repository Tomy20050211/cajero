import type { ResultadoOperacion } from "../services/CajeroService";

export function validarMonto(monto: number): void {
  if (!Number.isFinite(monto) || monto <= 0) {
    throw new Error("El monto debe ser un numero mayor a cero.");
  }
}

export function crearResultadoOperacion<T>(
  exito: boolean,
  mensaje: string,
  datos?: T,
): ResultadoOperacion<T> {
  return {
    exito,
    mensaje,
    datos,
  };
}

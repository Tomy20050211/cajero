import {
  cajeroPrincipal,
  cuentaPremium,
  cuentaPrincipal,
} from "./data/cuentas.data";
import { ResultadoOperacion } from "./services/CajeroService";

function mostrarResultado(
  titulo: string,
  resultado: ResultadoOperacion<number>,
): void {
  console.log(`\n${titulo}`);
  console.log(`Estado: ${resultado.exito ? "OK" : "ERROR"}`);
  console.log(`Mensaje: ${resultado.mensaje}`);

  if (typeof resultado.datos === "number") {
    console.log(`Saldo actual: ${resultado.datos}`);
  }
}

console.log("=== PRUEBA MANUAL DEL CAJERO ===");
console.log(`Titular: ${cuentaPrincipal.getTitular()}`);
console.log(`Fondos iniciales del cajero: ${cajeroPrincipal.consultarFondosCajero()}`);

mostrarResultado(
  "1. Consulta de saldo",
  cajeroPrincipal.consultarSaldo(cuentaPrincipal),
);

mostrarResultado(
  "2. Deposito de 50000",
  cajeroPrincipal.depositar(cuentaPrincipal, 50000),
);

mostrarResultado(
  "3. Retiro valido de 100000",
  cajeroPrincipal.retirar(cuentaPrincipal, 100000),
);

mostrarResultado(
  "4. Retiro mayor al saldo disponible",
  cajeroPrincipal.retirar(cuentaPrincipal, 300000),
);

mostrarResultado(
  "5. Retiro mayor a los fondos del cajero",
  cajeroPrincipal.retirar(cuentaPremium, 600000),
);

console.log(`Fondos finales del cajero: ${cajeroPrincipal.consultarFondosCajero()}`);

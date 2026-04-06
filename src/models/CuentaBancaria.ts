export interface ICuentaBancaria {
  consultarSaldo(): number;
  depositar(monto: number): void;
  retirar(monto: number): void;
}

export class CuentaBancaria implements ICuentaBancaria {
  private saldo: number;

  constructor(
    private readonly id: number,
    private readonly titular: string,
    saldoInicial: number,
  ) {
    this.saldo = saldoInicial;
  }

  public getId(): number {
    return this.id;
  }

  public getTitular(): string {
    return this.titular;
  }

  public consultarSaldo(): number {
    return this.saldo;
  }

  public depositar(monto: number): void {
    this.saldo += monto;
  }

  public retirar(monto: number): void {
    if (monto > this.saldo) {
      throw new Error("Fondos insuficientes en la cuenta.");
    }

    this.saldo -= monto;
  }
}

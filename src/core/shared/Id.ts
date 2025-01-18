import { v4 as uuid } from 'uuid'

export default class Id {
    readonly valor: string

    constructor(valor?: string) {
        this.valor = valor ?? uuid()
    }

    static novo() {
        return new Id()
    }

    igual(id: Id) {
        return this.valor === id.valor
    }

    diferente(id: Id) {
        return this.valor !== id.valor
    }
}
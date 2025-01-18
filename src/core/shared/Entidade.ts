import Id from './Id'

export interface EntidadeProps {
    id?: string
}

export default abstract class Entidade<Props extends EntidadeProps> {
    readonly id: string
    readonly props: Props

    constructor(props: Props) {
        this.id = new Id(props.id).valor
        this.props = {
            ...props,
            id: this.id,
        }
    }

    igual(entidade: Entidade<Props>): boolean {
        return this.id === entidade.id
    }

    diferente(entidade: Entidade<Props>): boolean {
        return this.id !== entidade.id
    }
}

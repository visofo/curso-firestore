import Entidade, { EntidadeProps } from '../shared/Entidade'

export interface UsuarioProps extends EntidadeProps {
    nome?: string
    email?: string
    criadoEm?: Date
    tags?: string[]
}

export default class Usuario extends Entidade<UsuarioProps> {
    readonly nome: string
    readonly email: string
    readonly criadoEm: Date
    readonly tags: string[]

    constructor(props: UsuarioProps) {
        super({
            ...props,
            criadoEm: props.criadoEm ?? new Date(),
            tags: (props.tags ?? []).map(t => t.trim().toLowerCase()).filter(t => t)
        })
        this.nome = this.props.nome!
        this.email = this.props.email!
        this.criadoEm = this.props.criadoEm!
        this.tags = this.props.tags!
    }

    clone(props: UsuarioProps) {
        return new Usuario({ ...this.props, ...props })
    }
}

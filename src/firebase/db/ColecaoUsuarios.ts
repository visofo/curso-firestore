import RepositorioUsuario from '../../core/usuario/RepositorioUsuario'
import Usuario from '../../core/usuario/Usuario'
import { pesquisar } from '../algolia'
import Colecao from './Colecao'

export default class ColecaoUsuarios implements RepositorioUsuario {
    private readonly COLECAO = 'usuarios'

    constructor(
        private colecao: Colecao = new Colecao({
            toFirestore(usuario: Usuario): any {
                return usuario.props
            },
            fromFirestore(snapshot: any): Usuario {
                return new Usuario(snapshot.data())
            },
        })
    ) {}

    salvar(usuario: Usuario): Promise<void> {
        return this.colecao.salvar(usuario, this.COLECAO, usuario.email)
    }

    excluir(usuario: Usuario): Promise<void> {
        return this.colecao.excluir(this.COLECAO, usuario.email)
    }

    consultar(): Promise<Usuario[]> {
        return this.colecao.consultar(this.COLECAO)
    }

    consultarPorEmail(email: string): Promise<Usuario | null> {
        return this.colecao.consultarPorId(this.COLECAO, email) ?? null
    }

    consultarPorNome(nome: string): Promise<Usuario[]> {
        return this.colecao.consultarComFiltro('usuarios', [
            { atributo: 'nome', op: '>=', valor: nome },
            { atributo: 'nome', op: '<=', valor: nome + '\uffff' },
        ])
    }

    consultarPorAnoMesCadastro(ano: number, mes: number): Promise<Usuario[]> {
        const dataInicial = new Date(ano, mes - 1, 1)
        const dataFinal = new Date(ano, mes, 0, 23, 59, 59)
        return this.colecao.consultarComFiltro('usuarios', [
            { atributo: 'criadoEm', op: '>=', valor: dataInicial },
            { atributo: 'criadoEm', op: '<=', valor: dataFinal },
        ])
    }

    consultarPorTag(tag: string): Promise<Usuario[]> {
        return this.colecao.consultarComFiltro('usuarios', [
            { atributo: 'tags', op: 'array-contains', valor: tag },
        ])
    }

    async consultarPorTexto(texto: string): Promise<Usuario[]> {
        const emails = await pesquisar('indice-usuarios', texto)
        return this.colecao.consultarPorCampo('usuarios', emails, 'email')
    }
}

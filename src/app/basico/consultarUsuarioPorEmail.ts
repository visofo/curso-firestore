import Usuario from '../../core/usuario/Usuario'
import ColecaoUsuarios from '../../firebase/db/ColecaoUsuarios'
import exibirUsuario from '../shared/exibirUsuario'
import TerminalUtil from '../utils/TerminalUtil'

export default async function consultarUsuarioPorEmail() {
    TerminalUtil.titulo('Consultar Usuário por Email')

    const email = await TerminalUtil.campoRequerido('Email')
    const colecao = new ColecaoUsuarios()
    const usuario = await colecao.consultarPorEmail(email)

    TerminalUtil.mensagem(usuario instanceof Usuario ? 'SIM!!!!' : 'não... :(')

    exibirUsuario(usuario)
    await TerminalUtil.esperarEnter()
}

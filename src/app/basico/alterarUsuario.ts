import Colecao from '../../firebase/db/Colecao'
import ColecaoUsuarios from '../../firebase/db/ColecaoUsuarios'
import exibirUsuario from '../shared/exibirUsuario'
import TerminalUtil from '../utils/TerminalUtil'

export default async function alterarUsuario() {
    TerminalUtil.titulo('Alterar Usuário')

    TerminalUtil.mensagem('Consultando usuário')
    const emailPesquisa = await TerminalUtil.campoRequerido('Email')

    const colecao = new ColecaoUsuarios()
    const usuarioAtual = await colecao.consultarPorEmail(emailPesquisa)

    if (!usuarioAtual) {
        exibirUsuario(usuarioAtual)
        await TerminalUtil.esperarEnter()
        return
    }

    const nome = await TerminalUtil.campoRequerido('Nome', usuarioAtual.nome)
    const tagsBrutas = await TerminalUtil.campoRequerido('Tags [,]', usuarioAtual.tags.join(','))
    const tags = tagsBrutas.split(',')

    const usuario = usuarioAtual.clone({ nome, tags })
    await colecao.salvar(usuario)

    TerminalUtil.sucesso('Usuário foi atualizado com sucesso!')
    await TerminalUtil.esperarEnter()
}

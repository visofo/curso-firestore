import ColecaoUsuarios from '../../firebase/db/ColecaoUsuarios'
import exibirUsuarios from '../shared/exibirUsuarios'
import TerminalUtil from '../utils/TerminalUtil'

export default async function consultarUsuariosPorTag() {
    TerminalUtil.titulo('Consultar Usuários por Tag')

    const tag = await TerminalUtil.campoRequerido('Tag')

    const colecao = new ColecaoUsuarios()
    const usuarios = await colecao.consultarPorTag(tag.toLowerCase())

    exibirUsuarios(usuarios)
    await TerminalUtil.esperarEnter()
}

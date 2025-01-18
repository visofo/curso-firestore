import Usuario from '../../core/usuario/Usuario'
import ColecaoUsuarios from '../../firebase/db/ColecaoUsuarios'
import TerminalUtil from '../utils/TerminalUtil'

export async function salvarUsuario() {
    TerminalUtil.titulo('Salvar Usuário')

    const nome = await TerminalUtil.campoRequerido('Nome')
    const email = await TerminalUtil.campoRequerido('Email')
    const tagsBrutas = await TerminalUtil.campoRequerido('Tags [,]')
    const tags = tagsBrutas.split(',')

    const usuario = new Usuario({ nome, email, tags })
    await new ColecaoUsuarios().salvar(usuario)

    TerminalUtil.sucesso('Usuário foi salvo com sucesso')
    await TerminalUtil.esperarEnter()
}

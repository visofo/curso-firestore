import Usuario from "../../core/usuario/Usuario";
import TerminalUtil from "../utils/TerminalUtil";

export default function exibirUsuario(usuario: Usuario | null) {
    if(!usuario) {
        return TerminalUtil.advertencia('Usuário não encontrado')
    }

    TerminalUtil.mensagem('Id: ')
    TerminalUtil.info(usuario.id, false)
    TerminalUtil.mensagem('Nome: ')
    TerminalUtil.info(usuario.nome, false)
    TerminalUtil.mensagem('Email: ')
    TerminalUtil.info(usuario.email, false)
    TerminalUtil.mensagem('Tags: ')
    TerminalUtil.info(usuario.tags.join(','), false)
    TerminalUtil.mensagem('Data: ')
    TerminalUtil.info(usuario.criadoEm.toLocaleDateString('pt-br'), false)
}
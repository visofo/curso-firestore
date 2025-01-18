import Usuario from "../../core/usuario/Usuario";
import TerminalUtil from "../utils/TerminalUtil";
import exibirUsuario from "./exibirUsuario";

export default function exibirUsuarios(usuarios: Usuario[]) {
    if(!usuarios || !usuarios.length) {
        return TerminalUtil.advertencia('Usuários não encontrados')
    }

    TerminalUtil.sucesso(`${usuarios.length} usuário(s) encontrado(s)!`)
    TerminalUtil.mensagem('------------------------------')
    usuarios.forEach(usuario => {
        exibirUsuario(usuario)
        TerminalUtil.mensagem('------------------------------')
    })
}
import ColecaoUsuarios from "../../firebase/db/ColecaoUsuarios";
import exibirUsuarios from "../shared/exibirUsuarios";
import TerminalUtil from "../utils/TerminalUtil";

export default async function consultarUsuariosPorNome() {
    TerminalUtil.titulo('Consultar Usuários por Nome')

    const nome = await TerminalUtil.campoRequerido('Nome')

    const colecao = new ColecaoUsuarios()
    const usuarios = await colecao.consultarPorNome(nome)

    exibirUsuarios(usuarios)
    await TerminalUtil.esperarEnter()
}
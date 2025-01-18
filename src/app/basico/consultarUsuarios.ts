import ColecaoUsuarios from "../../firebase/db/ColecaoUsuarios";
import exibirUsuarios from "../shared/exibirUsuarios";
import TerminalUtil from "../utils/TerminalUtil";

export default async function consultarUsuarios() {
    TerminalUtil.titulo('Consultar Usuários')

    const colecao = new ColecaoUsuarios()
    const usuarios = await colecao.consultar()

    exibirUsuarios(usuarios)
    await TerminalUtil.esperarEnter()
}
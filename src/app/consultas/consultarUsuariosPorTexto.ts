import ColecaoUsuarios from "../../firebase/db/ColecaoUsuarios";
import exibirUsuarios from "../shared/exibirUsuarios";
import TerminalUtil from "../utils/TerminalUtil";

export default async function consultarUsuariosPorTexto() {
    TerminalUtil.titulo('Consultar Usuários por Texto')

    const texto = await TerminalUtil.campoRequerido('Texto')

    const colecao = new ColecaoUsuarios()
    const usuarios = await colecao.consultarPorTexto(texto)

    exibirUsuarios(usuarios)
    await TerminalUtil.esperarEnter()
}
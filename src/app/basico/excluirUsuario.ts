import ColecaoUsuarios from "../../firebase/db/ColecaoUsuarios";
import exibirUsuario from "../shared/exibirUsuario";
import TerminalUtil from "../utils/TerminalUtil";

export default async function excluirUsuario() {
    TerminalUtil.titulo('Excluir Usuário')

    const email = await TerminalUtil.campoRequerido('Email')

    const colecao = new ColecaoUsuarios()
    const usuario = await colecao.consultarPorEmail(email)

    TerminalUtil.linhaEmBranco()
    exibirUsuario(usuario)
    TerminalUtil.linhaEmBranco()
    
    if(usuario) {
        const resposta = await TerminalUtil.confirmacao('Deseja excluir o usuário?')
    
        if(resposta) {
            await colecao.excluir(usuario)
            TerminalUtil.sucesso('Usuário excluído com sucesso!')
        }
    }

    await TerminalUtil.esperarEnter()
}
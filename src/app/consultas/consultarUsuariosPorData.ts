import ColecaoUsuarios from '../../firebase/db/ColecaoUsuarios'
import exibirUsuarios from '../shared/exibirUsuarios'
import TerminalUtil from '../utils/TerminalUtil'

export default async function consultarUsuariosPorData() {
    TerminalUtil.titulo('Consultar Usuários por Data')

    const [_, ano] = await TerminalUtil.opcoes(
        'Selecionar o ano',
        ['2022' ,'2023', '2024']
    )

    const [indiceMes] = await TerminalUtil.opcoes(
        'Selecionar o mês',
        ['jan' ,'fev', 'mar', 'abr' ,'mai', 'jun', 'jul' ,'ago', 'set', 'out' ,'nov', 'dez']
    )

    const colecao = new ColecaoUsuarios()
    const usuarios = await colecao.consultarPorAnoMesCadastro(+ano, indiceMes + 1)

    exibirUsuarios(usuarios)
    await TerminalUtil.esperarEnter()
}

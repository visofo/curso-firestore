import algoliasearch from 'algoliasearch'

export async function pesquisar(indice: string, texto: string): Promise<string[]> {
    const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_KEY!)
    const index = client.initIndex(indice)

    const resposta = await index.search(texto)
    return resposta.hits.map(hit => hit.objectID)
}

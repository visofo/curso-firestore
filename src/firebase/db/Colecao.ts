import {
    OrderByDirection,
    WhereFilterOp,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    setDoc,
    where,
} from 'firebase/firestore'
import app from '../config/app'
import Conversor from './Conversor'

export interface Filtro {
    atributo: string
    op: WhereFilterOp
    valor: any
}

export default class Colecao {
    constructor(private conversor: Conversor, private db = getFirestore(app)) {}

    async salvar(entidade: any, caminho: string, id?: string): Promise<void> {
        const colRef = collection(this.db, caminho).withConverter(this._conversor)
        const docRef = doc(colRef, id ?? entidade.id)
        await setDoc(docRef, entidade)
    }

    async consultar(caminho: string): Promise<any[]> {
        const colRef = collection(this.db, caminho).withConverter(this._conversor)
        const resultado = await getDocs(colRef)
        return resultado.docs.map((doc) => doc.data())
    }

    async consultarPorId(caminho: string, id: string): Promise<any> {
        if (!id) return null
        const docRef = doc(this.db, caminho, id).withConverter(this._conversor)
        const resultado = await getDoc(docRef)
        return resultado.data()
    }

    async consultarPorCampo(caminho: string, valores: string[], nomeCampo: string = 'id') {
        if (!valores || !valores.length) return []
        const colRef = collection(this.db, caminho).withConverter(this._conversor)
        const consulta = query(colRef, where(nomeCampo, 'in', valores))
        const resultado = await getDocs(consulta)
        return resultado.docs.map((doc) => doc.data()) ?? []
    }

    async consultarComFiltro(
        caminho: string,
        filtros: Filtro[],
        ordernarPor?: string,
        direcao?: OrderByDirection
    ) {
        const colRef = collection(this.db, caminho).withConverter(this._conversor)

        const filtrosWhere = filtros?.map((f) => where(f.atributo, f.op, f.valor))
        const ordenacao = ordernarPor ? [orderBy(ordernarPor, direcao)] : []

        const consulta = query(colRef, ...filtrosWhere, ...ordenacao)
        const resultado = await getDocs(consulta)
        return resultado.docs.map((doc) => doc.data()) ?? []
    }

    excluir(caminho: string, id: string) {
        const docRef = doc(this.db, caminho, id)
        return deleteDoc(docRef)
    }

    private get _conversor(): Conversor {
        return {
            toFirestore: this.conversor.toFirestore,
            fromFirestore: (snapshot: any) => {
                const dados = this._converterDatas(snapshot.data())
                return this.conversor.fromFirestore({ ...snapshot, data: () => dados })
            },
        }
    }

    private _converterDatas(original: any) {
        const objeto = { ...original }
        for (const prop in objeto) {
            if (objeto[prop].toDate) objeto[prop] = objeto[prop].toDate()
        }
        return objeto
    }
}

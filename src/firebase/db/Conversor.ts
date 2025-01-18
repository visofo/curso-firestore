export default interface Conversor {
    fromFirestore(snapshot: any): any
    toFirestore(entidade: any): any
}
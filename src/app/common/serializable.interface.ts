export interface Serializable<T> {

    deserialize(object: any): T;
    serialize(): any;
}

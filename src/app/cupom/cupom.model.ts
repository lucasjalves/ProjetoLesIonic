import { Serializable } from '../common/serializable.interface';

export class Cupom implements Serializable<Cupom> {
    public id: string;
    public codigo: string;
    public status: boolean;
    public dataVencimento: string;
    public valorDesconto: number;

    deserialize(object: any): Cupom {
        const c =  new Cupom();
        c.codigo = object.codigo;
        c.status = object.status;
        c.dataVencimento = object.dataVencimento;
        c.valorDesconto = object.valorDesconto;
        return c;
    }
    serialize() {
       return {
            id: this.id,
            codigo: this.codigo,
            status: this.status,
            dataVencimento: this.dataVencimento,
            valorDesconto: this.valorDesconto
       };
    }
}

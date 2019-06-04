import { Serializable } from '../../common/serializable.interface';

export class Cartao implements Serializable<Cartao> {

    public id: string = null;
    public bandeira;
    public cvv;
    public numero;
    public dtVencimento;
    public dtFormatado;
    public ativo;
    constructor() {}

    deserialize(object: any): Cartao {
        const c = new Cartao();
        c.id = object.id;
        c.bandeira = object.bandeira;
        c.cvv = object.cvv;
        c.numero = object.numero;
        c.dtVencimento = object.dtVencimento;
        c.ativo = object.ativo;
        return c;
    }
    serialize() {
        return {
            id : this.id,
            bandeira: this.bandeira,
            cvv: this.cvv,
            numero: this.numero,
            dtVencimento: this.dtFormatado,
            ativo: this.ativo
        };
    }
}

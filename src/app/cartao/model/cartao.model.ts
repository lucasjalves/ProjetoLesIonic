import { Serializable } from '../../common/serializable.interface';

export class Cartao implements Serializable<Cartao> {

    public bandeira;
    public cvv;
    public numero;
    public dtVencimento;
    public dtFormatado;
    constructor() {}

    deserialize(object: any): Cartao {
        const c = new Cartao();
        c.bandeira = object.bandeira;
        c.cvv = object.cvv;
        c.numero = object.numero;
        c.dtVencimento = object.dtVencimento;
        return c;
    }
    serialize() {
        return {
            bandeira: this.bandeira,
            cvv: this.bandeira,
            numero: this.numero,
            dtVencimento: this.dtFormatado
        };
    }
}

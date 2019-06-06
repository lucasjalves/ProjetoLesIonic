import { Serializable } from '../../common/serializable.interface';
import { Cartao } from '../../cartao/model/cartao.model';

export class Endereco implements Serializable<Endereco> {

    public id: string = null;
    public nome: string;
    public pais: string;
    public uf: string;
    public cidade: string;
    public bairro: string;
    public cep: string;
    public rua: string;
    public numero: string;
    public complemento: string;

    deserialize(object: any): Endereco {
        const e = new Endereco();
        e.id = object.id;
        e.nome = object.nome;
        e.pais = object.pais;
        e.uf = object.uf;
        e.cidade = object.cidade;
        e.bairro = object.bairro;
        e.cep = object.cep;
        e.rua = object.rua;
        e.numero = object.numero;
        e.complemento = object.complemento;
        return e;
    }
    serialize() {
        return {
            id: this.id,
            nome: this.nome,
            pais: this.pais,
            uf: this.uf,
            cidade: this.cidade,
            bairro: this.bairro,
            cep: this.cep,
            rua: this.rua,
            numero: this.numero,
            complemento: this.complemento
        };
    }
}

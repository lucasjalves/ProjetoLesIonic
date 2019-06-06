import { Serializable } from '../../common/serializable.interface';

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
        this.id = object.id;
        this.nome = object.nome;
        this.pais = object.pais;
        this.uf = object.uf;
        this.cidade = object.cidade;
        this.bairro = object.bairro;
        this.cep = object.cep;
        this.rua = object.rua;
        this.numero = object.numero;
        this.complemento = object.complemento;
        return this;
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

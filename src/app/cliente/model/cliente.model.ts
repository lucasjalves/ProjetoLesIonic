import { Serializable } from '../../common/serializable.interface';

export class Cliente implements Serializable<Cliente> {
    public cpfCnpj;
    public nome;
    public dtNascimento;
    public username;
    public senha;
    public email;
    public genero;
    public ativo;
    public dtFormatada;
    public creditoDisponivel = '0';

    deserialize(object: any): Cliente {
        this.cpfCnpj = object.cpfCnpj;
        this.nome = object.nome;
        this.dtNascimento = object.dtNascimento;
        this.username = object.username;
        this.senha = object.senha;
        this.email = object.email;
        this.genero = object.genero;
        this.ativo = object.ativo;
        this.creditoDisponivel = object.creditoDisponivel;
        return this;
    }
    serialize() {
        return {
            cpfCnpj : this.cpfCnpj,
            nome : this.nome,
            dtNascimento : this.dtFormatada,
            username: this.username,
            senha: this.senha,
            email: this.email,
            genero: this.genero,
            ativo: this.ativo
        };
    }
    constructor() {

    }
}

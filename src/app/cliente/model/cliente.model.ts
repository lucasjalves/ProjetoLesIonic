import { Serializable } from '../../common/serializable.interface';
import { Endereco } from 'src/app/endereco/model/endereco.model';
import { Cartao } from '../../cartao/model/cartao.model';

export class Cliente implements Serializable<Cliente> {
    public id = null;
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
    public enderecos: Array<Endereco> = new Array();
    public cartoes: Array<Cartao> = new Array();

    deserialize(object: any): Cliente {
        this.id = object.id;
        this.cpfCnpj = object.cpfCnpj;
        this.nome = object.nome;
        this.dtNascimento = object.dtNascimento;
        this.username = object.username;
        this.senha = object.senha;
        this.email = object.email;
        this.genero = object.genero;
        this.ativo = object.ativo;
        this.creditoDisponivel = object.creditoDisponivel;

        if (object.enderecos !== undefined) {
            for (const endereco of object.enderecos) {
                const e = new Endereco().deserialize(endereco);
                this.enderecos.push(e);
            }
        }

        if (object.cartoes !== undefined) {
            for (const cartao of object.cartoes) {
                const c = new Cartao().deserialize(cartao);
                this.cartoes.push(c);
            }
        }

        return this;
    }
    serialize() {
        return {
            id: this.id,
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

import { Serializable } from '../../common/serializable.interface';

export class Produto implements Serializable<Produto> {
    private id;
    private nome;
    private descricao;
    private precoCompra;
    private precoVenda;
    private marca;
    private modelo;
    private altura;
    private largura;
    private comprimento;
    private peso;
    private especificacoes;
    private codigoBarras;
    private categoria;
    private estoque;
    private conteudoEmbalagem;
    private ativo;

    deserialize(object: any): Produto {
        this.id = object.id;
        this.nome = object.nome;
        this.descricao = object.descricao;
        this.precoCompra = object.precoCompra;
        this.precoVenda = object.precoVenda;
        this.marca = object.marca;
        this.modelo = object.modelo;
        this.altura = object.altura;
        this.largura = object.largura;
        this.comprimento = object.comprimento;
        this.peso = object.peso;
        this.especificacoes = object.especificacoes;
        this.peso = object.peso;
        this.especificacoes = object.especificacoes;
        this.codigoBarras = object.codigoBarras;
        this.categoria = object.categoria;
        this.estoque = object.estoque;
        this.conteudoEmbalagem = object.conteudoEmbalagem;
        this.ativo = object.ativo;
        return this;
    }
    serialize() {
       return {

       };
    }

    constructor() {
    }
}

import { Produto } from 'src/app/produto/model/produto.model';
import { Serializable } from 'src/app/common/serializable.interface';

export class ProdutoPedido extends Produto implements Serializable<ProdutoPedido> {
    public idProduto: number;

    deserialize(object: any): ProdutoPedido {
        const produtoPedido: ProdutoPedido = super.deserialize(object) as ProdutoPedido;
        produtoPedido.idProduto = object.idProduto;
        return produtoPedido;
    }

    serialize(): any {
        const json: any = super.serialize();
        json.idProduto = this.idProduto;

        return json;
    }
}

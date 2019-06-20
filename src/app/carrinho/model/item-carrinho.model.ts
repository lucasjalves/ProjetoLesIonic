import { Serializable } from '../../common/serializable.interface';
import { Produto } from '../../produto/model/produto.model';

export class ItemCarrinho implements Serializable<ItemCarrinho> {
    public qtde: number;
    public produto = new Produto();
    public valorTotal: string;

    deserialize(object: any): ItemCarrinho {
        const item: ItemCarrinho = new ItemCarrinho();
        item.qtde = object.qtde;
        item.produto = this.produto.deserialize(object.produto);
        item.valorTotal =  object.valorTotal;
        return item;
    }

    serialize() {
        return {
            qtde: this.qtde,
            produto: this.produto.serialize(),
            valorTotal: this.valorTotal
        };
    }
}

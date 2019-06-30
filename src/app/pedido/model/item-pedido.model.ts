import { Serializable } from 'src/app/common/serializable.interface';
import { ProdutoPedido } from './produto-pedido.model';

export class ItemPedido implements Serializable<ItemPedido> {
    public produtoPedido: ProdutoPedido;
    public valorTotal: string;
    public quantidade: number;

    deserialize(object: any): ItemPedido {
        const item: ItemPedido = new ItemPedido();
        item.produtoPedido = new ProdutoPedido().deserialize(object.produto);
        item.valorTotal = object.valorTotal;
        item.quantidade = object.quantidade;
        return item;
    }

    serialize() {
        return {
            produtoPedido: this.produtoPedido.serialize(),
            valorTotal: this.valorTotal,
            quantidade: this.quantidade
        };
    }
}

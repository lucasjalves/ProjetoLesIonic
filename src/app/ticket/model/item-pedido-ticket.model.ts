import { Serializable } from '../../common/serializable.interface';
import { ItemPedido } from '../../pedido/model/item-pedido.model';

export class ItemPedidoTiket implements Serializable<ItemPedidoTiket> {
    public quantidade: number;
    public idItem: number;

    deserialize(object: any): ItemPedidoTiket {
        const itemPedido = new ItemPedidoTiket();
        itemPedido.idItem = object.idItem;
        itemPedido.quantidade = object.item;

        return itemPedido;
    }
    serialize() {
        throw new Error('Method not implemented.');
    }

}

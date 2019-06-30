import { Serializable } from 'src/app/common/serializable.interface';
import { ItemPedido } from './item-pedido.model';
import { CupomPedido } from './cupom-pedido.model';
import { CartaoPedido } from './cartao-pedido.model';
import { EnderecoPedido } from './endereco-pedido.model';

export class Pedido implements Serializable<Pedido> {

    public id: number;
    public itemPedido: Array<ItemPedido> = new Array();
    public status: string;
    public dtPedido: string;
    public total: string;
    public frete: string;
    public desconto: string;
    public totalCompra: string;
    public idCliente: number;
    public cupomPedido: CupomPedido;
    public cartoes: Array<CartaoPedido> = new Array();
    public endereco: EnderecoPedido;
    public creditoUtilizado: string;
    public trocado: boolean;

    deserialize(object: any): Pedido {
       
        const p = new Pedido();
        p.id = object.id;
        p.status = object.status;
        p.dtPedido = object.dtPedido;
        p.total = object.total;
        p.frete = object.frete;
        p.desconto = object.desconto;
        p.totalCompra = object.totalCompra;
        p.idCliente = object.idCliente;
        p.cupomPedido = new CupomPedido().deserialize(object.cupomPedido !== null ? object.cupomPedido : new CupomPedido());
        p.endereco = new EnderecoPedido().deserialize(object.endereco);
        p.creditoUtilizado = object.creditoUtilizado;
        p.trocado = object.trocado;

        for (const item of object.itensPedido) {
            p.itemPedido.push(new ItemPedido().deserialize(item));
        }

        for (const cartao of object.cartoes) {
            p.cartoes.push(new CartaoPedido().deserialize(cartao));
        }
        return p;
    }

    serialize() {
        return {

        };
    }
 }

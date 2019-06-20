import { Cupom } from '../../cupom/cupom.model';
import { ItemCarrinho } from './item-carrinho.model';
import { Serializable } from '../../common/serializable.interface';

export class Carrinho implements Serializable<Carrinho> {
    public total: string;
    public frete: string;
    public desconto: string;
    public totalCompra: string;
    public cupom: Cupom = new Cupom();
    public itensCarrinho: Array<ItemCarrinho> = new Array();

    deserialize(object: any): Carrinho {
        const c = new Carrinho();
        c.total = object.total;
        c.frete = object.frete;
        c.desconto = object.desconto;
        c.totalCompra = object.totalCompra;
        c.cupom = new Cupom().deserialize(object.cupom);
        for (const itemCarrinho of object.itensCarrinho) {
            c.itensCarrinho.push(new ItemCarrinho().deserialize(itemCarrinho));
        }
        return c;
    }
    serialize() {
        const objArray = new Array();
        for (const itemCarrinho of this.itensCarrinho) {
            objArray.push(itemCarrinho.serialize());
        }

        return {
            total: this.total,
            frete: this.frete,
            desconto: this.desconto,
            totalCompra: this.totalCompra,
            cupom: this.cupom.serialize(),
            itensCarrinho: objArray
        };
    }
}

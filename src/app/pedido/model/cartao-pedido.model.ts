import { Cartao } from 'src/app/cartao/model/cartao.model';
import { Serializable } from 'src/app/common/serializable.interface';

export class CartaoPedido extends Cartao implements Serializable<CartaoPedido> {
    public valor: string;
    public idCartao: number;

    deserialize(object: any): CartaoPedido {
        const c: CartaoPedido = super.deserialize(object) as CartaoPedido;
        c.valor = object.valor;
        c.idCartao = object.idCartao;

        return c;
    }

    serialize() {
        const json: any = super.serialize();
        json.valor = this.valor;
        json.idCartao = this.idCartao;

        return json;
    }
}

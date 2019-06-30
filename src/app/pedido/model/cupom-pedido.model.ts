import { Serializable } from 'src/app/common/serializable.interface';
import { Cupom } from 'src/app/cupom/cupom.model';

export class CupomPedido extends Cupom implements Serializable<CupomPedido> {

    deserialize(object: any): CupomPedido {
        const cupom = super.deserialize(object) as CupomPedido;
        return cupom;
    }

    serialize() {
        return super.serialize();
    }
}

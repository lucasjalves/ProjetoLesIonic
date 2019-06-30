import { Serializable } from 'src/app/common/serializable.interface';
import { Endereco } from 'src/app/endereco/model/endereco.model';

export class EnderecoPedido extends Endereco implements Serializable<Endereco> {

    deserialize(object: any): EnderecoPedido {
        return super.deserialize(object) as EnderecoPedido;
    }

    serialize() {
        return super.serialize();
    }
}

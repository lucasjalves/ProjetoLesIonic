import { Serializable } from '../../common/serializable.interface';
import { ItemPedidoTiket } from './item-pedido-ticket.model';

export class Ticket implements Serializable<Ticket> {
    public id: number;
    public dtPedido: string;
    public hora: string;
    public statusTicket: string;
    public tipoTicket: string;
    public idCliente: number;
    public idPedido: number;
    public obs: string;
    public itens: Array<ItemPedidoTiket> = new Array();

    deserialize(object: any): Ticket {
        const ticket = new Ticket();
        ticket.id = object.id;
        ticket.dtPedido = object.dtPedido;
        ticket.hora = object.hora;
        ticket.statusTicket = object.statusTicket;
        ticket.tipoTicket = object.tipoTicket;
        ticket.idCliente = object.idCliente;
        ticket.idPedido = object.idPedido;
        ticket.obs = object.obs;

        for (const item of object.itens) {
            const itemTicket = new ItemPedidoTiket().deserialize(item);
            ticket.itens.push(itemTicket);
        }

        return ticket;
    }
    serialize() {
        throw new Error('Method not implemented.');
    }
}

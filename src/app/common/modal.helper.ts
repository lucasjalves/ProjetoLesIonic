import { AlertController } from '@ionic/angular';
import { Resultado } from './resultado.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalHelper {

    async mostrarModal(alertController: AlertController, titulo: string, msg: string, resultado?: Resultado<any>, funcao?: () => void) {
        if (resultado === undefined || resultado === null) {
            return alertController.create({
                header: titulo,
                message: msg,
                buttons: ['OK']
            });
        }
        if (resultado.mensagens.length === 0) {
            return alertController.create({
                header: titulo,
                message: msg,
                buttons: [{
                    text: 'OK',
                    handler: () => {
                        (funcao !== undefined) ? funcao() : console.log();
                    }
                }]
            });
        } else {
            return alertController.create({
                header: titulo,
                message: resultado.mensagens[0],
                buttons: ['OK']
            });
        }

    }
}

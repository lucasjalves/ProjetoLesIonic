import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appMascara]'
})
export class MaskDirective {
    private chars = ['-', '.' , '/', '(' , ')', ' ', ',' , '%'];
    @Input('appMascara') mascara: string;


    constructor(private el: ElementRef) {
    }

    @HostListener('window:keyup', ['$event'])
    keyUpListener(event: KeyboardEvent) {
        this.el.nativeElement.value = this.aplicarMascara(this.el.nativeElement.value);
    }

    aplicarMascara(texto: string) {
        let boleanoMascara;
        const exp = /\-|\.|\/|\(|\)| /g;
        texto = texto.replace(exp, '');
        let posicaoCampo = 0;
        let textoComMascara = '';
        let tamanhoMascara = texto.length;

        for (let i = 0; i < tamanhoMascara; i++) {
            boleanoMascara = ((this.mascara.charAt(i) === '-') || (this.mascara.charAt(i) === '.')
                || (this.mascara.charAt(i) === '/'));
            boleanoMascara = boleanoMascara || ((this.mascara.charAt(i) === '(')
                || (this.mascara.charAt(i) === ')') || (this.mascara.charAt(i) === ' ') ||
                (this.mascara.charAt(i) === ',') || (this.mascara.charAt(i) === '%'));
            if (boleanoMascara) {
                textoComMascara += this.mascara.charAt(i);
                tamanhoMascara++;
            } else {
                textoComMascara += texto.charAt(posicaoCampo);
                posicaoCampo++;
            }

        }
        return textoComMascara;
    }


}

import { AbstractControl, ValidatorFn, Validator, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[ngModel][appCpf], [formControlName][appCpf], [formControl][appCpf]',
    providers: [
      { provide: NG_VALIDATORS, useExisting: CpfValidator, multi: true }
    ]
})
export class CpfValidator implements Validator {
    validator: ValidatorFn;

    validate(c: AbstractControl): { [key: string]: any; } {
        return this.validator(c);
    }

    constructor() {
        this.validator = (c: AbstractControl) => {
            const isValid = this.validarCPF(c.value);
            if (isValid) {
                return null;
            } else {
                return {
                    cpfCnpj: false
                };
            }
        };
    }
    validarCPF(cpf) {
        if (cpf === null || cpf === undefined) {
            return false;
        }
        cpf = cpf.replace(/\D/g, '');
        if (cpf === '') {
            return false;
        }

        if (cpf.length !== 11 ||
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999') {
                return false;
        }
        let add = 0;
        let rev = 0;
        for (let i = 0; i < 9; i ++)	{
            add += parseInt(cpf.charAt(i), 10) * (10 - i);
        }
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }

        if (rev !== parseInt(cpf.charAt(9), 10)) {
            return false;
        }

        add = 0;

        for (let i = 0; i < 10; i ++) {
            add += parseInt(cpf.charAt(i), 10) * (11 - i);
        }
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        if (rev !== parseInt(cpf.charAt(10), 10)) {
            return false;
        }

        return true;
    }
}

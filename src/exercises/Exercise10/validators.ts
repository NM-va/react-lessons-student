import isNumber from "lodash/isNumber";
import { ErrorDict } from './types/checkout';

export function validateBankCard(cardNumber: number | string | undefined | null): { errors: string[], isValid: boolean } {
    let isValid: boolean = false;
    const errors: string[] = [];

    if (!cardNumber) {
        isValid = false;
        errors.push(ErrorDict.CARDEMPTY);
    }

    if (`${cardNumber}`.length === 16 && isNumber(Number(cardNumber))) {
        isValid = true;
    }

    if (`${cardNumber}`.length && `${cardNumber}`.length !== 16) {
        isValid = false;
        errors.push(ErrorDict.CARDLENGTH);
    }

    return { isValid, errors };
}

export function validateDelivery(address): { errors: string[], isValid: boolean } {
    let isValid: boolean = false;
    const errors: string[] = [];
    
    if (address === '') {
        isValid = false;
        errors.push(ErrorDict.ADDRESSEMPTY);
    }
    
    return {isValid, errors}
};
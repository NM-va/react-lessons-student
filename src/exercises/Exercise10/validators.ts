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
    let isValid: boolean = true;
    const errors: string[] = [];
    
    if (address === '') {
        isValid = false;
        errors.push(ErrorDict.ADDRESSEMPTY);
    }
    
    return {isValid, errors}
}

export function validateCart(products) {
    let isValid: boolean = true;
    const errors: string[] = [];

    if (products.length === 0) {
        isValid = false;
        errors.push(ErrorDict.EMPTYBUSKET);
    }
    
    let zeroItem = products.some((item) => item.quantity !== 0);
    if (!zeroItem) {
        isValid = false;
        errors.push(ErrorDict.QUANTITYZERO);
    }
    
    return {isValid, errors};
}

export function validateConfirmation(products, balance) {
    let isValidConfirmation: boolean = true;
    const errors: string[] = [];
    
    const totalPriceBasket = products?.reduce(
        (sum, product) => sum + product.price * product.quantity, 0
    );
    
    if (balance - totalPriceBasket < 0) {
        isValidConfirmation = false;
        errors.push(ErrorDict.NOTENOUGHMONEY);
    }
    
    return {isValidConfirmation, errors}
}
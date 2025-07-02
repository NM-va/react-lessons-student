import isNumber from "lodash/isNumber";

export function validateBankCard(cardNumber: number | string | undefined | null): { errors: string[], isValid: boolean } {
    let isValid: boolean = false;
    const errors: string[] = [];

    if (!cardNumber) {
        isValid = false;
        errors.push('Номер не может быть пустым');
    }

    if (`${cardNumber}`.length === 16 && isNumber(Number(cardNumber))) {
        isValid = true;
    }

    if (`${cardNumber}`.length && `${cardNumber}`.length !== 16) {
        isValid = false;
        errors.push('Номер карты должен состоять из 16 цифр');
    }

    return { isValid, errors };
}
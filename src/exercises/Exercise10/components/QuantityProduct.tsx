import cls from '../CheckoutStepper.module.css'

interface QuantityProductProps {
    addedProduct: () => void;
    removeProduct: () => void;
    price: number;
}

export const QuantityProduct = (props: QuantityProductProps) => {
    const {addedProduct, removeProduct, price, quantity, availableQuantityItem} = props;
    const totalPrice = quantity * price;
    
    return (
        <div>
            <button type="button" onClick={addedProduct}>+</button>
            <span className={cls.quantityItem}>{quantity}</span>
            <button type="button" onClick={removeProduct}>-</button>
            <span className={cls.totalPriceItem}>{totalPrice}</span>
            <span>в наличии: <span className={cls.availableQuantityItem}>{availableQuantityItem}</span></span>
        </div>
    )
}
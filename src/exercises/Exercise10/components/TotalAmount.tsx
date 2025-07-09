export const TotalAmount = ({totalPriceBasket, deliveryCost}) => {
    const totalAmount = totalPriceBasket + deliveryCost;
    
    return (
        <div>
            <div>Стоимость товаров: {totalPriceBasket} р.</div>
            <div>Доставка: {deliveryCost} р.</div>
            <div>Итого: {totalAmount} р.</div>
        </div>
    )
}
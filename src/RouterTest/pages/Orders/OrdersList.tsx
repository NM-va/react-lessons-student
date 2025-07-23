import React from 'react';
import { orders } from '../../utils/constants';

export const OrdersList = () => {
    
    return (
        <div>
            {
                orders.map((order) => {
                    return (
                        <div>
                            {order.id}
                        </div>
                    )
                })
            }
        </div>
    );
};

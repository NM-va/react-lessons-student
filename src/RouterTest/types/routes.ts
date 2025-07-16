import React  from 'react';

export type RoutesType = {
    path: string,
    label?: string, // русскоязычное название //todo 
    component: () => React.JSX.Element,
    index?: boolean;
}
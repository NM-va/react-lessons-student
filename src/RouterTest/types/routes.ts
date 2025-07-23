import React  from 'react';

export type RoutesType = {
    path: string,
    label?: string, // русскоязычное название //Done
    element: () => React.JSX.Element,
    index?: boolean;
}
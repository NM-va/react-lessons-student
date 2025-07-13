import React from 'react';

type PropsType = {
    item: string;
}

export const Breadcrumbs = ({item}: PropsType) => {
    
    return (
        <div>
            {item}
        </div>
    );
};

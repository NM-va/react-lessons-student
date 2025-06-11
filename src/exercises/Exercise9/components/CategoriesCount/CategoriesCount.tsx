import React from "react";

interface Props<T extends Record<string, any> = Record<string, any>> {
    data: T[];
    categoryName: keyof T;
}

export function CategoriesCount<T extends Record<string, any> = Record<string, any>>(props: Props<T>): React.JSX.Element {
    const { data, categoryName } = props;
    
    const categoriesCount = (data || [])?.reduce((acc: Record<string, any>, categoryItem) => {
        const key: string  = categoryItem[categoryName];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
    
    return (
        <div>
            {
                Object.entries(categoriesCount).map(([key, value]) => {
                    return <span key={key} style={{display: "inline-block", marginRight: "10px", padding: "2px 4px", border: "1px solid var(--button-bg)", borderRadius: "6px"}}>{`${key}: ${value} `}</span>
                })
            }
        </div>
    );
};
interface CategoriesCountProps<T extends Record<string, any> = Record<string, any>> {
    data: T[];
    categoryName: string;
}

export const CategoriesCount = ({data, categoryName}: CategoriesCountProps) => {
    
    const categoriesCount = (data || [])?.reduce((acc, categoryItem) => {
        const key = categoryItem[categoryName];
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
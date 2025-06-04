export interface BaseItem {
    id: number;
    name: string;
    category: string;
    [key: string]: any; // для дополнительных полей
}

export interface CategoryOption {
    value: string;
    label: string;
    count?: number; // количество элементов в категории
}

export interface SearchFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    categorySlot?: React.ReactNode;
    onClear?: () => void;
}

export interface LiveSearchSelectProps<T extends BaseItem> {
    data: T[];
    searchQuery: string;
    selectedCategory: string;
    onSearchChange: (query: string) => void;
    onCategoryChange: (category: string) => void;
    categoryOptions: CategoryOption[];
    renderItem: (item: T) => React.ReactNode;
    gridColumns?: number;
}
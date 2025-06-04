export interface BaseItem {
    id: number;
    name: string;
    category: string;
    [key: string]: any;
}

export interface CategoryOption {
    value: string;
    label: string;
    count?: number;
}

export interface MonoSelectProps {
    options: CategoryOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    showCount?: boolean;
}

export interface SearchFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    categorySlot?: React.ReactNode;
    onClear?: () => void;
}

export interface Product extends BaseItem {
    price: number;
    description: string;
    tags: string[];
}
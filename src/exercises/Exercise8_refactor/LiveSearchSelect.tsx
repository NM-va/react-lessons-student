import { MonoSelect } from "../../components/LiveSearchSelect/MonoSelect";
import { SearchField } from "../../components/LiveSearchSelect/SearchField";
import "./styles/LiveSearchSelect.css";

// Упрощенный интерфейс - только для UI поиска
interface SimplifiedLiveSearchSelectProps {
    searchQuery: string;
    selectedCategory: string;
    onSearchChange: (query: string) => void;
    onCategoryChange: (category: string) => void;
    categoryOptions: Array<{
        value: string;
        label: string;
        count?: number;
    }>;
}

export function LiveSearchSelect({
    searchQuery,
    selectedCategory,
    onSearchChange,
    onCategoryChange,
    categoryOptions
}: SimplifiedLiveSearchSelectProps) {

    const categorySlot = (
        <MonoSelect
            options={categoryOptions}
            value={selectedCategory}
            onChange={onCategoryChange}
            showCount={true}
        />
    );

    const onClear = () => {
        onSearchChange('');
    };

    return (
        <div className="live-search-select">
            <div className="search-controls">
                <SearchField
                    value={searchQuery}
                    onChange={onSearchChange}
                    categorySlot={categorySlot}
                    placeholder="Поиск по названию, описанию или тегам..."
                    onClear={onClear}
                />
            </div>
        </div>
    );
}
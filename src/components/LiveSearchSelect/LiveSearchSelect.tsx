import { LiveSearchSelectProps } from './types';

export const LiveSearchSelect = () => {
    const {data, searchQuery, selectedCategory, onSearchChange, onCategoryChange, categoryOptions, renderItem, gridColumns} = props;
    
    
    
    return (
        <div >
            {
                data.filter((item) => {
                   return (selectedCategory === item.category) && (searchQuery === item.name);
                })
            }
        </div>
    );
};
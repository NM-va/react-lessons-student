import React, { useEffect, useState } from 'react';
import { UniversalInput } from '../UniversalInput';
import { Highlight } from './Highlight';
import { useDebounce } from '../../hooks/useDebounce';

type SearchProps = {
    listData: string[];
};

export const HighlightSearch = (props: SearchProps) => {
    const {listData} = props;
    const [searchValue, setSearchValue] = useState<string>('');
    const [filteredArr, setFilteredArr] = useState<string[]>([]);
    const debounceSearchValue = useDebounce(searchValue, 3000);
    const onChangeValue = (newValue) => {
        setSearchValue(newValue);
    };

    useEffect(() => {
    
        if (!debounceSearchValue && setFilteredArr.length !== 0) {
            setFilteredArr([]);
        }
        
        const regex = new RegExp(`${debounceSearchValue}`, "i");
        
        const regFilteredArr = listData.filter((item: string) => {
            return regex.test(item);
        });
        
        if (debounceSearchValue) {
            setFilteredArr(regFilteredArr);
        }

    }, [debounceSearchValue]);

    
    
    return (
        <div>
            <UniversalInput value={searchValue} onChange={onChangeValue} />
       
            <div data-id="container" style={{ 'color': '#000' }}>
                {filteredArr.length > 0 && <div>Найдено: {filteredArr.length}</div>}
                <ul>
                    {
                        filteredArr.map((item) =>(
                            <li key={item} id={`${item}`}>
                                <Highlight text={item} searchValue={debounceSearchValue} />
                            </li>)
                        )
                    }
                </ul>
                {debounceSearchValue && (filteredArr.length === 0) && <div>По запросу {debounceSearchValue} не найдено</div>}
            </div>

        </div>
    );
}

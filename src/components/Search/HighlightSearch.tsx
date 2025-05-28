import { ChangeEvent, useEffect, useState } from 'react';
import { UniversalInput } from '../UniversalInput';
import { Highlight } from './Highlight';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type SearchProps = {
    listData: string[];
};

export const HighlightSearch = (props: SearchProps) => {
    const {listData} = props;
    const [initSearchValue, setInitSearchValue] = useLocalStorage('searchValue', '');
    const [searchValue, setSearchValue] = useState<string>(initSearchValue);
    const [filteredArr, setFilteredArr] = useState<string[]>(listData);
    const [bgSelected, setBgSelected] = useState<string>('white');

    const debounceSearchValue = useDebounce(searchValue, 1000);
    
    const onChangeValue = (newValue: string) => {
        setSearchValue(newValue);
        setInitSearchValue(newValue);
    };
    
    
    const onSelectBg = (e: ChangeEvent<HTMLSelectElement>) => {
        setBgSelected(e.target.value);
    };
    
    const bgSelectedString = [
        "AliceBlue",
        "AntiqueWhite",
        "Aqua",
        "Aquamarine",
        "Azure",
        "Beige",
        "Bisque",
        "Black",
        "BlanchedAlmond",
        "Blue",
        "BlueViolet",
        "Brown",
        "BurlyWood",
        "CadetBlue",
        "Chartreuse",
        "Chocolate",
        "Coral",
        "CornflowerBlue",
        "Cornsilk",
        "Crimson",
        "Cyan",
        "DarkBlue",
        "DarkCyan",
        "DarkGoldenRod",
        "DarkGray",
        "DarkGreen",
        "DarkKhaki",
        "DarkMagenta",
        "DarkOliveGreen",
        "DarkOrange"
    ];
    
    useEffect(() => {
        if (!debounceSearchValue) {
            setFilteredArr(listData);
            return;
        }

        const regFilteredArr = listData.filter((item: string) => {
            return item.toLowerCase().includes(debounceSearchValue?.toLowerCase());
        });
        
        setFilteredArr(regFilteredArr);

    }, [debounceSearchValue, listData]);
    
    return (
        <div style={{ 'color': '#000' }}>
            <h3>Настройки поиска:</h3>
            <div style={{"display": "flex", "marginBottom": "20px"}}>
                <div>
                    <label htmlFor="bgSelectedString">Цвет подсветки: </label>
                    <select name="bgSelectedString" form="bgSelectedString" id="bgSelectedString" value={bgSelected} onChange={onSelectBg}>
                        {
                            bgSelectedString.map((color) => (
                                <option value={color} key={color}>{color}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            
            <UniversalInput value={searchValue} onChange={onChangeValue} />
       
            <div data-id="container">
                {filteredArr.length > 0 && <div>Найдено: {filteredArr.length}</div>}
                <ul>
                    {
                        filteredArr.map((item) =>(
                            <li key={item} id={`${item}`}>
                                <Highlight text={item} searchValue={debounceSearchValue} bgSelectedText={bgSelected} />
                            </li>)
                        )
                    }
                </ul>
                {debounceSearchValue && (filteredArr.length === 0) && <div>По запросу {debounceSearchValue} не найдено</div>}
            </div>

        </div>
    );
}

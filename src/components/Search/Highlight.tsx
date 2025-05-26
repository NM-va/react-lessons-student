import * as React from 'react';
import { useMemo } from 'react';
import cls from './HighlightSearch.module.css';

type HighlightProps = {
    text: string;
    searchValue: string;
};

export const Highlight = (props: HighlightProps) => {
    const {text, searchValue} = props;
    
    const regex = useMemo(() => new RegExp(`${searchValue}`, "i"), [searchValue]);
    
    const matchStr = text.match(regex) || [];

    const otherStr = text.split(regex);
    
    //не подходит для длинных фраз некорректно соединяются части строк
    return otherStr.map((part, i) => (
        <React.Fragment key={i}>
            {part}
            {matchStr[i] && (
                <span className={cls.highlight}>{matchStr[i]}</span>
            )}
        </React.Fragment>
    ));
};
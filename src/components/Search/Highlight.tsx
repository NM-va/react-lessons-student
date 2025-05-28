import * as React from 'react';
import { useEffect, useMemo } from 'react';

type HighlightProps = {
    text: string;
    searchValue: string;
    bgSelectedText: string;
};

export const Highlight = (props: HighlightProps) => {
    const {text, searchValue, bgSelectedText} = props;
    
    const regex = useMemo(() => new RegExp(`${searchValue}`, "i"), [searchValue]);
    
    const matchStr = text.match(regex) || [];

    const otherStr = text.split(regex);
    
    //не подходит для длинных фраз некорректно соединяются части строк
    return otherStr.map((part, i) => (
        <React.Fragment key={i}>
            {part}
            {matchStr[i] && (
                <span style={{'backgroundColor': bgSelectedText} as React.CSSProperties}>{matchStr[i]}</span>
            )}
        </React.Fragment>
    ));
};
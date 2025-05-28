import * as React from 'react';

type HighlightProps = {
    text: string;
    searchValue: string;
    bgSelectedText: string;
};

export const Highlight = (props: HighlightProps) => {
    const {text, searchValue, bgSelectedText} = props;
    
    const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));

    return (
        <span>
            {parts.map((part: string, index: number) => {
                return part?.toLowerCase() === searchValue.toLowerCase() ? (
                    <mark style={{ 'backgroundColor': bgSelectedText } as React.CSSProperties}>{part}</mark>
                ) : (
                    <span key={index}>{part}</span>
                )
            })}
        </span>
    )
};

{/* <span style={{ 'backgroundColor': bgSelectedText } as React.CSSProperties}>{matchStr[i]}</span> */}
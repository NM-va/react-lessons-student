import React, { useEffect, useState } from 'react'
import { HighlightSearch } from '../components/Search/HighlightSearch';

const mockData:string[] = [
    'Демо текст',
    'Hello 777',
    '@mail.ru',
    'очень длинный текст',
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Peach",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Watermelon"
];

// Упражнение 7:
const Exercise7: React.FC = () => {

    const [data, setData] = useState(mockData);

    useEffect(() => {
        //fetch data;

/* The `setTimeout` function in the code snippet is setting a timer to delay the execution of the
provided function by 4000 milliseconds (4 seconds). */
        // setTimeout(() => {
        //     setData(['Полученные с сервера данные', 'New data from server 777']);
        // }, 4000);
    }, [])

    return (
        <div className="wrap-container">
            <h1>Упражнение 7</h1>
            
            <HighlightSearch listData={data} />
        </div>
    );
};

export default Exercise7;
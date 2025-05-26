import React from 'react'
import { HighlightSearch } from '../components/Search/HighlightSearch';

const mockData:string[] = [
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

    return (
        <div className="wrap-container">
            <h1>Упражнение 7</h1>
            
           <HighlightSearch listData={mockData} />
        </div>
    );
};

export default Exercise7;
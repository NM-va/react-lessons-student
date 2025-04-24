import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { fetchSearchResults } from '../utils/fetchSearchResults';

export function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleSearch = async (query) => {
        if (!query) return setSearchResults([]);
        
        setIsLoading(true);
        setError(null);
        
        try {
            // Имитация API запроса
            const results = await fetchSearchResults(query);
            setSearchResults(results);
        } catch (err) {
            setError('Произошла ошибка при поиске');
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div>
            <h1>Поиск</h1>
            <SearchBar onSearch={handleSearch} debounceTime={500} />
            
            {isLoading && "Загрузка..."}
            {error && <p className="error">{error}</p>}
            
            <ul className="search-results">
                {searchResults?.map(result => (
                    <li key={result.id}>{result.title}</li>
                ))}
            </ul>
        </div>
    );
}
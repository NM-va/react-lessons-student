export const fetchSearchResults = async (query) => {
    let response = await fetch(`https://6807f408942707d722dcea21.mockapi.io/api/countries/items`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    });
    
    
};
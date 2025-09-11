export function searchFilter<T extends Record<string, any> = Record<string, any>>(data: T[], key: keyof T, searchText: string): T[] {
    if (!searchText) {
        return data;
    }

    let trimSearchText = searchText.trim();

    return data.filter((item: T) => {
        return item[key].includes(trimSearchText);
    })
}

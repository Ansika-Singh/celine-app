import { useState, useMemo, useEffect } from 'react';

export default function useSearch(items, searchKeys = []) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredItems = useMemo(() => {
    if (!debouncedQuery) return items;
    const lowerQuery = debouncedQuery.toLowerCase();
    
    return items.filter(item => {
      return searchKeys.some(key => {
        const val = item[key];
        if (typeof val === 'string' || typeof val === 'number') {
          return String(val).toLowerCase().includes(lowerQuery);
        }
        return false;
      });
    });
  }, [items, debouncedQuery, searchKeys]);

  return { query, setQuery, filteredItems };
}

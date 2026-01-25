import { useState, useEffect } from 'react';

// This is a placeholder for the actual API service call
// In a real scenario, this would import from @/client/services
const useProducts = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Mocking API call
            const mockData = [
                { id: '1', name: 'Product A', category: 'Category 1', price: 100 },
                { id: '2', name: 'Product B', category: 'Category 2', price: 200 },
            ];
            setProducts(mockData);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loading, error, fetchProducts };
};

export default useProducts;

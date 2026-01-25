import { useState, useEffect, useCallback } from 'react';
import { ProductControllerService, Product } from '@/client/services/ProductControllerService';

/**
 * Hook for managing product data.
 * Follows the pattern: Page -> Hook -> Service
 */
const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await ProductControllerService.listProducts();
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        refetch: fetchProducts
    };
};

export default useProducts;


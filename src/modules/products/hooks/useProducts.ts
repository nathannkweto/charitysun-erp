import { useState, useCallback } from 'react';
import {
    ProductControllerService,
    ProductionControllerService,
    type ProductCreateRequest,
    type BomDTO,
    type ProductDTO,
    type BomItemRequest,
    type ProductionRunRequest
} from '../../../client';

export const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const [currentBom, setCurrentBom] = useState<BomDTO | null>(null);

    const createProduct = async (request: ProductCreateRequest) => {
        setLoading(true);
        try {
            await ProductControllerService.createProduct(request);
        } catch (error) {
            console.error('Failed to create product', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchBom = useCallback(async (productId: string) => {
        setLoading(true);
        try {
            const data = await ProductControllerService.getBomStructure(productId);
            setCurrentBom(data);
        } catch (error) {
            console.error('Failed to fetch BOM', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const addBomComponent = async (productId: string, request: BomItemRequest) => {
        setLoading(true);
        try {
            await ProductControllerService.addBomComponent(productId, request);
            await fetchBom(productId);
        } catch (error) {
            console.error('Failed to add component', error);
        } finally {
            setLoading(false);
        }
    };

    const startProductionRun = async (request: ProductionRunRequest) => {
        setLoading(true);
        try {
            await ProductionControllerService.createProductionRun(request);
        } catch (error) {
            console.error('Failed to start production run', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const searchProducts = async (query: string): Promise<ProductDTO[]> => {
        if (!query || query.trim().length < 2) return [];

        try {
            return await ProductControllerService.listProducts(query);
        } catch (error) {
            console.error('Failed to search products', error);
            return [];
        }
    };

    return {
        loading,
        currentBom,
        createProduct,
        fetchBom,
        addBomComponent,
        startProductionRun,
        searchProducts,
    };
};
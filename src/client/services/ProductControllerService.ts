export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
    createdAt: string;
}

export interface ProductListResponse {
    items: Product[];
    total: number;
}

/**
 * Mock Service for Product Management.
 * Follows the naming convention of OpenAPI generated services.
 */
export class ProductControllerService {
    /**
     * Simulates fetching a list of products.
     */
    public static async listProducts(): Promise<Product[]> {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        return [
            {
                id: '1',
                name: 'Industrial Lathe G-200',
                sku: 'MECH-LT-01',
                category: 'Mechanical',
                price: 15400.00,
                stock: 5,
                status: 'ACTIVE',
                createdAt: '2023-10-01T10:00:00Z',
            },
            {
                id: '2',
                name: 'Precision Milling Machine',
                sku: 'MECH-PM-05',
                category: 'Mechanical',
                price: 8900.50,
                stock: 2,
                status: 'ACTIVE',
                createdAt: '2023-11-15T09:30:00Z',
            },
            {
                id: '3',
                name: 'Hydraulic Press HP-50',
                sku: 'AUTO-HP-50',
                category: 'Automobile',
                price: 4500.00,
                stock: 0,
                status: 'OUT_OF_STOCK',
                createdAt: '2023-12-05T14:20:00Z',
            },
            {
                id: '4',
                name: 'Laser Alignment Tool',
                sku: 'TOOL-LA-10',
                category: 'Accessories',
                price: 1200.00,
                stock: 15,
                status: 'ACTIVE',
                createdAt: '2024-01-10T11:00:00Z',
            },
            {
                id: '5',
                name: 'Old Engine Block',
                sku: 'ENG-EB-XX',
                category: 'Automobile',
                price: 500.00,
                stock: 1,
                status: 'INACTIVE',
                createdAt: '2023-01-20T16:00:00Z',
            },
        ];
    }

    public static async getProductById(id: string): Promise<Product> {
        const products = await this.listProducts();
        const product = products.find(p => p.id === id);
        if (!product) throw new Error('Product not found');
        return product;
    }
}

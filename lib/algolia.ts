import { algoliasearch } from 'algoliasearch';
import { Product } from './airtable';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_API_KEY!
);

export async function syncProductsToAlgolia(products: Product[]) {
  try {
    const objects = products.map((product) => ({
      objectID: product.id,
      ...product,
    }));

    const result = await client.saveObjects({
      indexName: process.env.ALGOLIA_INDEX_NAME!,
      objects,
    });
    
    return result;
  } catch (error) {
    console.error('Error al sincronizar productos con Algolia:', error);
    throw error;
  }
}

export interface SearchParams {
  query: string;
  limit: number;
  offset: number;
}

export interface SearchResponse {
  results: Product[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
}

export async function searchProducts(params: SearchParams): Promise<SearchResponse> {
  try {
    const { query, limit, offset } = params;
    
    const result = await client.search({
      requests: [
        {
          indexName: process.env.ALGOLIA_INDEX_NAME!,
          query,
          hitsPerPage: limit,
          page: Math.floor(offset / limit),
        },
      ],
    });

    const searchResult = result.results[0] as any;
    const results: Product[] = (searchResult.hits || []).map((hit: any) => ({
      id: hit.objectID,
      name: hit.name,
      description: hit.description,
      price: hit.price,
      image: hit.image,
      category: hit.category,
      stock: hit.stock,
      sku: hit.sku,
    }));

    return {
      results,
      pagination: {
        offset,
        limit,
        total: searchResult.nbHits || 0,
      },
    };
  } catch (error) {
    console.error('Error al buscar productos en Algolia:', error);
    throw error;
  }
}

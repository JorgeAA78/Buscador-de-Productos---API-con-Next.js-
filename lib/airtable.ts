import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID!);

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category?: string;
  stock?: number;
  sku?: string;
}

export async function getAllProducts(): Promise<Product[]> {
  const products: Product[] = [];
  
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME!)
      .select()
      .all();

    records.forEach((record) => {
      const fields = record.fields;
      
      products.push({
        id: record.id,
        name: fields.Name as string || '',
        description: fields.Description as string || fields.Notes as string || '',
        price: fields['Unit cost'] as number || 0,
        image: fields.Images ? (fields.Images as any)[0]?.url : undefined,
        category: fields.Type as string || undefined,
        stock: fields['In stock'] as number || undefined,
        sku: fields.Name as string || undefined,
      });
    });

    return products;
  } catch (error) {
    console.error('Error al obtener productos de Airtable:', error);
    throw error;
  }
}

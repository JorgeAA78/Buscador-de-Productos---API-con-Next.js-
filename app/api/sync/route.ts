import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/airtable';
import { syncProductsToAlgolia } from '@/lib/algolia';

export async function GET(request: NextRequest) {
  try {
    console.log('Iniciando sincronización de productos...');
    
    const products = await getAllProducts();
    console.log(`Se obtuvieron ${products.length} productos de Airtable`);
    
    const result = await syncProductsToAlgolia(products);
    console.log('Sincronización completada exitosamente');
    
    return NextResponse.json({
      success: true,
      message: 'Productos sincronizados exitosamente',
      count: products.length,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error en la sincronización:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error al sincronizar productos',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }, { status: 500 });
  }
}

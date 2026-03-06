import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/algolia';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    if (limit < 1 || limit > 100) {
      return NextResponse.json({
        success: false,
        message: 'El parámetro limit debe estar entre 1 y 100',
      }, { status: 400 });
    }
    
    if (offset < 0) {
      return NextResponse.json({
        success: false,
        message: 'El parámetro offset debe ser mayor o igual a 0',
      }, { status: 400 });
    }
    
    const response = await searchProducts({
      query,
      limit,
      offset,
    });
    
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    console.error('Error al buscar productos:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error al buscar productos',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }, { status: 500 });
  }
}

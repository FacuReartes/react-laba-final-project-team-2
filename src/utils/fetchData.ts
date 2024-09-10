import axios from 'axios';
import { APIProductsType } from '@/lib/apiDataTypes';

export interface FetchDataType {
  data: APIProductsType[];
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
}

export const fetchProducts = async (
  queryParams?: string
): Promise<FetchDataType> => {
  let url =
    'https://shoes-shop-strapi.herokuapp.com/api/products?filters[teamName]=team-2&populate=*';
  if (queryParams) {
    url += '&filters[name][$containsi]=' + queryParams;
  }
  const response = await axios.get(url);

  return response.data;
};

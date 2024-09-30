// import { useQuery } from '@tanstack/react-query';
// import { env } from '../../env';
// import { useState } from 'react';

// const URL = `${env.BASE_URL}/products?filters[teamName]=team-2&populate=*`;

// export default function useSearchProducts() {
//   const [products, setProducts] = useState([]);

//   const getSearchProducts = (searchTerm: string) => {
//     // const { data } = useQuery({
//     //   queryKey: ['search-products'],
//     //   queryFn: () => fetchSearchProducts(searchTerm),
//     // });
//     // setProducts(data.data);
//   };
//   async function fetchSearchProducts(searchTerm: string) {
//     const url = URL + '&filters[name][$containsi]=' + searchTerm;

//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await response.json();
//     return data;
//   }
//   return {
//     products: products,
//     getSearchProducts,
//     // loading: products.isPending,
//     // error: { isError: products.isError, error: products.error },
//     // refetch: products.refetch,
//   };
// }

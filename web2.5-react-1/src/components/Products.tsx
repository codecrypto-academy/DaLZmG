import { useQuery } from 'react-query';
import axios from 'axios';
import { Product } from './Product';

const getProducts = async (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      setTimeout(async () => {
        const data = await axios.get('https://dummyjson.com/products/category/laptops');
        resolve({products: data.data.products});
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
};

export const Products = () => {
  const { data, isLoading, isError } = useQuery(['products'], getProducts)

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center h-50'>
        <h1>
          Loading...
        </h1>
      </div>
    )
  } else if (isError) {
    return (
      <div>
        Error
      </div>
    )
  } else if (data) {
    return (
      <>
        <table className='table products col-12 col-xl-12'>
          <thead>
            <tr className='product_header'>
              <th scope='col' className='text-center product_id'>Producto</th>
              <th scope='col' className='product_name'>Descripción</th>
              <th scope='col' className='product_price'>Precio</th>
              <th scope='col' className='product_stock'>Stock</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product: any) => (
              // console.log(product),
              <Product productData={product} key={product.id} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

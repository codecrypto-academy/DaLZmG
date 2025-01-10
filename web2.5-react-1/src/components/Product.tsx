import './Product.css'

export const Product = ({ productData }: any) => {
  // console.log(JSON.stringify(productData));
  // console.log(id);
  // console.log(productData.id);  
  return (
    <>
      <tr key={productData.id}>
        <td className='d-flex justify-content-center'>
          <img src={productData.thumbnail} title={"Product " + productData.id} className='img-fluid img-thumbnail' />
        </td>
        <td className=''>
          <p className='font-weight-bold'>
            <span className='text-uppercase'>
              {productData.category + " - " }
            </span> + {productData.title || '-'}
          </p>
          <p className='font-weight-light font-italic '>
            {productData.description || ''}
          </p>
        </td>
        <td className='text-right'>
          {productData.price + "€" || '-'}
        </td>
        <td className='text-right'>
          {productData.stock || '-'}
        </td>
      </tr>
    </>
  );
}
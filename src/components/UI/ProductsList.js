import React from 'react'
import '../../styles/ProductCard.css';
import ProductCard from './ProductCard';

const ProductsList = ({ data }) => {
  return (
    <>
      {
        data?.map((item, index) =>
          <ProductCard item={item} key={index}/>
        )
      }

    </>
  )
};

export default ProductsList;
import React from 'react'
import { useAppContext } from '../context/App.Context'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategories = () => {
    const {products} = useAppContext();
    const {category} = useParams();

    const searchCategory = categories.find((item)=> item.path.toLowerCase() === category )

    const filteredProducts = products.filter((product)=> product.category.toLowerCase() === category )
  return (
    <div className='mt-16'>
      {
        searchCategory && (
            <div>
                <div className='flex flex-col items-end w-max'>
                    <p className='text-2xl font-medium'>
                        {searchCategory.text.toUpperCase()}
                    </p>
                    <div className='h-0.5 w-16 bg-primary rounded-full'></div>
                </div>
            </div>
        )}
        {
            filteredProducts.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
                    {filteredProducts.map((product)=>(
                        <ProductCard key={product._id} product={product}/>
                    ))}
                </div>
            ):(
                <div className='flex items-center justify-center h-[60-vh]'>
                    <p className='text-2xl font-medium text-primary'>No product found in this category</p>
                </div>
            )
        }
    </div>
  )
}

export default ProductCategories

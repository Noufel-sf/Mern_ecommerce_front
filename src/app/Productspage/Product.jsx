import React from 'react'
import { Link } from "react-router-dom";


export default function Product({coverUrl , name, price , category, _id}) {
  return (
    <Link 
      to={`/product/${_id}`}
    > 
    <div className='flex items-center flex-col gap-3 title  shadow-black rounded-lg cursor-pointer' data-aos="fade-up" 
                data-aos-duration='1200'
                data-category={category}
    >

        <div className="cake-item">
          <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-200 p-3">
            <img
              src={coverUrl}
              alt={name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className="flex items-start flex-col justify-between">
          <h3 className='text-xl font-semibold capitalize text-left'>{name}</h3>
          <p className='text-sm text-gray-500'>{category}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className='text-sm md:text-xl   text-[var(--primary-color)] font-bold'>{price} $</p>
            <button className='bg-[var(--primary-color)] cursor-pointer text-white py-2 px-4 rounded-full text-[12px] md:text-sm '>buy now</button>
          </div>
        </div>
    </div>
            </Link>
  )
}

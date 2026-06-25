import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../redux/slice/postSlice';
import { IMAGE_URL } from '../utils/base_url';

export default function Home() {
  const dispatch = useDispatch()
  const {post} = useSelector(state=>state.post);

  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch]);

  return (
    <div>
      <h1 className='text-center font-semibold my-5 text-2xl'>All Post</h1>

      <div className='grid grid-cols-3 gap-3'>
        {post.map((ele,index)=>{
          return(
            <>
            
              <div key={ele._id} className='flex flex-col gap-4 p-4 shadow-md rounded-md border border-gray-300'>
                <div>
                  <img src={IMAGE_URL+ ele.photo} className='' alt={ele.title} />
                </div>
                <div className='text-lg font-semibold'>{ele.title}</div>
                <div>{ele.description}</div>
              </div>
            </>
          )
        })}
      </div>
      
    </div>
  )
}

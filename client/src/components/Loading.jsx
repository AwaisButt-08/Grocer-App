import React, { useEffect } from 'react'
import { useAppContext } from '../context/App.Context'
import { useLocation } from 'react-router-dom';

const Loading = () => {
    const {navigate} = useAppContext();
    let {search} = useLocation();
    const query = new URLSearchParams(search)
    const nextUrl = query.get('next')

    useEffect(()=>{
        if(nextUrl){
            setTimeout(()=>{
                navigate(`${nextUrl}`)
            },5000)
        }
    },[nextUrl])


  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='animate-spin rounded-full h-20 w-20 border-4 border-gray-300 border-t-primary'>

      </div>
    </div>
  )
}

export default Loading

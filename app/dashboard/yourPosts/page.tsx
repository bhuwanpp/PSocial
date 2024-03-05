'use client'

import { useEffect } from "react"
import { useLocalStore } from "@/app/store/hookStore"

export default function page() {
  const {localStore,setLocalStore} = useLocalStore()

    useEffect(()=>{
    const storePosts = localStorage.getItem('posts')
    if(storePosts){
      setLocalStore(JSON.parse(storePosts))
    }
  },[])
  return (
    <div>
        this is yourPosts
         <p className=' w-auto px-10 pr-32 py-2'>{localStore &&
        localStore.map((post:any,index:any) =>(
          <p key={index} className='mb-5  bg-blue-100 hover:bg-blue-200 px-2' >{post}</p>
        ))
        }</p>
    </div>
  )
}

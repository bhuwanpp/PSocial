'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {useLocalStore} from '../store/hookStore'

export default function page() {
  const [posts,setPosts] =useState<any>('')
  const [user,showUser] =useState(false)
  const [like,setLikes] =useState<any>({})
  const {localStore,setLocalStore} = useLocalStore()
  
  const handleUser = () =>{
    showUser((prevShow) =>!prevShow)
  }
  const handleLike =(postId:any) =>{
    let tempLikes = {...like}
    tempLikes[postId] = (tempLikes[postId] || 0) + 1
    setLikes(tempLikes)
    localStorage.setItem('likes', JSON.stringify(tempLikes));
  }
  // console.log(posts)
  const handlePost = () =>{
      const newPosts = [...localStore,posts]
      localStorage.setItem('posts',JSON.stringify(newPosts));
      localStorage.setItem('likes',JSON.stringify(like))
      setLocalStore(newPosts)
      setPosts('')
  }
  const handleEnter = (e:any) =>{
    if(e.key === 'Enter'){
      handlePost()
    }

  }
  useEffect(()=>{
    const storePosts = localStorage.getItem('posts')
    const storeLikes = localStorage.getItem('likes')
    if (storePosts && storeLikes) {
      setLocalStore(JSON.parse(storePosts))
      setLikes(JSON.parse(storeLikes))
    }
  },[])
  
  // function clearLocalStorage() {
  //   localStorage.clear();
  // }
  // if(typeof window !== 'undefined'){

  //   window.addEventListener('beforeunload',clearLocalStorage)
  // }
  

  return (
    <div>
      <div className="nav flex justify-between px-10 py-5">
        <div className="left">
          <Link href="/dashboard">
            <img src="/images/logo.png" alt="logo" className='w-20 rounded-full' />
          </Link>
          </div>
        <div className="right relative">
          <button className="user" onClick={handleUser}>
          <img src="/images/user.png" alt="user" className='rounded-full w-12' />
          </button>
          {user &&
          <div className="absolute right-2 bg-blue-100 w-32 rounded-md h-20 px-2 py-2">
            <Link href="/dashboard/yourPosts " className=' hover:bg-blue-200 px-2 py-1 rounded-md'>
              Your Posts
            </Link>
            <br />
            <Link href="/">
            <button className='hover:bg-blue-200 px-2 py-1 rounded-md'>Log out </button>
            </Link>
          </div>
          }
        </div>
      </div>
      {/* postInput */}
      <div className="postInput text-center">

        <input type="text" onKeyDown={handleEnter} value={posts} onChange={(e)=>setPosts(e.target.value)} className='border p-1 border-black w-96 h-10  outline-none rounded-sm' />
        <button onClick={handlePost} className='ml-2 px-2 py-2 bg-blue-200 rounded-md '>Post</button>

      </div>
      {/* your posts  */}
      <div className="posts px-20 py-20">
        <p className='pb-2'>Posts all </p>
        <p className=' w-auto px-2 py-2'>{localStore &&
        localStore.map((post:string,index:any) =>(
          <p key={index} className='mb-5  bg-blue-100 px-2 hover:bg-blue-200' >{post}
         <p className="mt-5 w-full cursor-pointer" onClick={() => handleLike(post)}>
                  Likes: {like[post] || 0}
                </p>
                </p>
         
        ))
        
        }</p>
      </div>
    </div>
  )
}

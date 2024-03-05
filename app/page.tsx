'use client'
import { useRouter } from 'next/navigation'

export default function page() {
    const router = useRouter()
    const handleSubmit=() =>{
        router.push('/dashboard')

    }
  return (
    <main className='flex  gap-20 px-10 py-10'>
        <div className="left">
            <h1>TSocial</h1>
            <p>This is a social media app</p>
        </div>
        <div className="right">
            <h2>Log In </h2>
            <form onSubmit={handleSubmit} className='grid gap-3 pb-5'>
                <label >Email</label>
                <input type="text" required className='border border-black h-10 w-72 px-2 outline-none rounded-md 
                 '  />
                <label >Password</label>
                <input type="text" required className='border border-black h-10 px-2 w-72 outline-none rounded-md 
                 '  />
                 <div className="button pt-3 pl-16">
                 <button className='bg-blue-200 px-3 py-1 rounded-md'>submit</button>
                 </div>
            </form>
            <button className=' bg-blue-200  px-3 py-1 rounded-md mb-5 ml-5'>Create account</button>
            <br />
            <button className='bg-blue-200 px-3 py-1 rounded-md mt-3'>Log In With Google</button>
        </div>

    </main>
  )
}

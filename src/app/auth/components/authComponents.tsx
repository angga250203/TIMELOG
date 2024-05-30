"use client"

import { Navbar } from '@/components/Navbar'
import React from 'react'
import { createClientComponentClient  } from '@supabase/auth-helpers-nextjs'


export default function AuthComponents () {

    const supabase = createClientComponentClient ();

    const handleLogin = () => {
        supabase.auth.signInWithOAuth({
            provider:"github",
            options:{
                redirectTo:`${location.origin}/auth/callback`
            }
        })
    }

  return (
    <>
        <Navbar/>

        <div className='flex items-center gap-7  h-[80vh]'>
            
            <div className='rounded-xl w-8/12'>
                <img src="../awal.png" className='shadow-2xl' alt="" />
            </div>

            <div className='w-4/12'>
                <h1 className='text-3xl'>LOG TIME</h1>
                <p className='text-gray-500'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore cum nobis consequuntur magnam accusamus expedita.</p>

        
                <button onClick={handleLogin} className='bg-black   t-5 text-white py-3 px-5 rounded-lg'>Login with github</button> 
            </div>

          
        </div>
    </>
  )
}



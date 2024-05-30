"use client";

import React from 'react'
import { LuTimer } from "react-icons/lu";
import { Button } from './ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePathname, useRouter } from 'next/navigation';


export const Navbar = () => {
  const path = usePathname();
  const router = useRouter();

  const supabase = createClientComponentClient()

  const handleLogOut = async () => {
    await supabase.auth.signOut ();

    router.refresh()
  }

  const isAuthPage = path === "/auth"

  return (
    <main className='flex justify-between items-center '>
        <div className='flex items-center'>
            <LuTimer className='text-4xl font-bold'/>
            <h1 className='text-2xl font-semibold'>Time</h1>
        </div>

      {!isAuthPage &&
        <Button onClick={handleLogOut} >Log Out</Button>
      }
    </main>
  )
}

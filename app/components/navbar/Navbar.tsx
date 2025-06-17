"use client"
import Container from '../Container'
import React from 'react'
import { Logo } from './Logo'
import { Search } from './Search'
import { UserMenu } from './UserMenu'
import { SafeUser } from '@/app/types'
import Categories from './Categories'
import { useRouter } from 'next/navigation'

interface NavbarProps {
  currentUser?: SafeUser | null
}

export const  Navbar: React.FC<NavbarProps>=({
  currentUser
})=> {
  // console.log(currentUser);
  const router=useRouter();
  const userAdmin=[
    {
    "email":"pratikguha2024@gmail.com",
    },
    {
      "email":"pratikguha2019@gmail.com"
    },
    {
      "email":"nv200303@gmail.com"
    }
  ]
  return (
    <div className='nav'>
      <div className='py-4   border-b border-blue-500'>
      <Container>
        <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
          <Logo/>
          <Search/>
          {userAdmin.find((user)=>user.email===currentUser?.email) && <button 
            onClick={()=>router.push('/owner')}
            className='hidden md:block text-sm font-semibold py-3 px-4
            rounded-full hover:bg-gray-400 transition cursor-pointer'
          >
            Admin
          </button>}
          <UserMenu currentUser={currentUser}/>
        </div>
      </Container>
      </div>
      <Categories/>
    </div>
  )
}

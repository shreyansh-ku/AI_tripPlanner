import React from 'react'
import { Button } from '../button'
const Header = () => {
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
        <img src='/logo.svg' alt='image' className='bg-black row-5'/>
        <div>
            <Button>Welcome</Button>
        </div>
    </div>
  )
}

export default Header

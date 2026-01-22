import React from 'react'
import { Link } from "react-router-dom";
import { Button } from '../button'
const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[60px] text-center'>
        From dream to destinations
        <span className='text-[#09557e]'>—AI makes it easy</span> 
        <p className='text-xl text-gray-500 text-center mt-16'>Experience travel without the stress—our AI trip planner creates personalized itineraries, handles bookings, and organizes every detail, so you can spend 
            more time exploring and less time worrying about logistics."</p>
</h1>
<Link to={'/a'}>
<Button>Get Started,it's FREE</Button>
</Link>
    </div>
  )
}

export default Hero

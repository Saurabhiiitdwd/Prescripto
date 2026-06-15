import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* Left section */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 loading-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore adipisci, asperiores ullam ducimus minus, quos amet nesciunt et, fugiat maiores omnis! Magni totam perferendis beatae, blanditiis sit aliquam temporibus iste!</p>
        </div>
        {/* Center section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* Right section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-212-555-0123</li>
            <li>prescripto@company.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr/>
        <p className='text-center text-gray-600 text-sm py-4'>Copyright © 2024 Prescripto. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
import Image from 'next/image'
import React from 'react'
import { assets } from '../../../public/assets/assets_frontend/assets'

const Footer = () => {
  return (
        <div className='md:mx-10'> 
    <div className='flex flex-col md:flex-row justify-between text-sm gap-14 my-10 mt-30'>

        <div className='w-2/4'>
            <Image className='mb-5 w-40' src={assets.logo}alt='logo'/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore minima sunt reiciendis, aut optio enim architecto esse, facilis nisi vero explicabo, vitae amet harum voluptas officia aliquid atque unde animi.</p>
        </div>
        <div className='flex flex-col gap-5'>
            <p className='font-semibold'>COMPANY</p>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className='flex flex-col gap-5'>
            <p className='font-semibold'>GET IN TOUCH </p>
            <ul>
                <li>+912(345)676543</li>
                <li>prescripto@gmail.com</li>
            </ul>
        </div>
        </div>
        <div className='text-center'>
            <hr />
            <p className='m-2 text-gray-700 '>Copyright @2025 Prescripto- All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
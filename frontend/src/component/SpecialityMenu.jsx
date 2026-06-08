import React from 'react'
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets'
function SpecialityMenu() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800" id="speciality">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>Choose from a wide range of medical specialties to find the right doctor for your needs.</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {specialityData.map((item, index) => (
          <Link onClick={()=>{scrollTo(0,0)}} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:tracking-y-[-10px] transition-all duration-500' to={`/doctors/${item.speciality}`} key={index} className='flex flex-col items-center gap-2 bg-white rounded-lg p-4 hover:scale-105 transition-all duration-300'>
            <img className='w-12' src={item.image} alt={item.speciality} />
            <p className='text-sm font-medium'>{item.speciality}</p>
          </Link>
        ))}
      </div>  
    </div>
  )
}

export default SpecialityMenu
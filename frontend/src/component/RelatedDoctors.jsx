import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

function RelatedDoctors({docId, speciality}) {
  const {doctors}= useContext(AppContext); 
  const [relatedDocs, setRelatedDocs] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const relatedDocs = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId);
    setRelatedDocs(relatedDocs);
  }, [docId, speciality, doctors])
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Discover our top-rated doctors and book your appointment with confidence.
      </p>
      <div className='w-full grid grid-cols-auto gap-4 pt-4 gap-y-6 px-3 sm:px-0'>
        {relatedDocs.slice(0, 5).map((item, index) =>(
          <div className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all-duration-500' key={index} onClick={() =>{ navigate(`/appointment/${item._id}`);
          scrollTo(0, 0)}}>
            <img className='bg-blue-50' src={item.image} alt={item.name} />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-green-500 text-sm text-center'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                <p> Available </p>
              </div>
              <p className='text-grey-900 text-lg font-medium'>{item.name}</p>
              <p className='text-grey-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors
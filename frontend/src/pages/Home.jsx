import React from 'react'
import Header from '../component/Header'
import SpecialityMenu from '../component/SpecialityMenu'
import TopDoctors from '../component/TopDoctors'

function Home() {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
    </div>
  )
}

export default Home
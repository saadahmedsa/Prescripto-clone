import Banner from '@/components/commom/Banner'
import Hero from '@/components/commom/Hero'
import Specialty from '@/components/commom/Specialty'
import Topdoctor from '@/components/commom/Topdoctor'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero/>
  <Specialty/>
  <Topdoctor/>
  <Banner/>
    </div>
  )
}

export default page
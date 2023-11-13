import Link from 'next/link'
import React from 'react'
import QuickNavigateBtn from '../components/QuickNavigateBtn'
import { Plus } from 'react-feather'

const page = () => {
  return (
    <div>
      <QuickNavigateBtn img={<Plus />} title='New Journal Entry' url='/' />
    </div>
  )
}

export default page

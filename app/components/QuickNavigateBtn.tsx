import Link from 'next/link'
import React from 'react'

const QuickNavigateBtn = ({url, title, img}: {url: string, title: string, img: any}) => {
  return (
    <Link className='bg-black' href={url}>
      <div>{img}</div>
      <div className='text-black'>{title}</div>
    </Link>
  )
}

export default QuickNavigateBtn

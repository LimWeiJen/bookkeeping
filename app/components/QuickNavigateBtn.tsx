import Link from 'next/link'
import React from 'react'

const QuickNavigateBtn = ({url, title, img}: {url: string, title: string, img: any}) => {
  return (
    <Link className="qnbtn" href={url}>
      <div>{img}</div>
      <div>{title}</div>
    </Link>
  )
}

export default QuickNavigateBtn

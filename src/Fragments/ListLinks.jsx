import React from 'react'
import { Link } from 'react-router-dom'

export default function ListLinks({ item }) {
  return <>

    <li><Link to={item.href} className='dark:text-gray-800 text-[#F9F9F7]'>{item.name}</Link></li>


  </>
}

export function SocialLinks({ item }) {
  const IconComponent = item.icon
  return <>
    <a rel="noopener noreferrer" target='_blank' href={item.href} className="bg-red-500 p-2 rounded-full text-[#F9F9F7] m-auto"> <IconComponent className="size-6" /> </a>
  </>
}
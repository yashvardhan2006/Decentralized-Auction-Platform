import React from 'react'
import Globe from '../spline/globe'
import SellPage from './clienting'
import AnimatedBackground from '../components/AnimatedBackground'

const page = () => {
  return (
    <div className='flex flex-col h-max'>
        <div className='z-1 absolute'><Globe/></div>
        <AnimatedBackground>
        
        <div className=''><SellPage/></div>
        </AnimatedBackground>
    </div>
  )
}

export default page
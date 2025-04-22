import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { HeadphoneData } from '../data/MockData'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import {motion as Motion, AnimatePresence, easeInOut} from 'framer-motion'
import { SlideRight } from '../utils/animation'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import DynamicModel from './ShoesModel'

const Hero = () => {

  const [activeData, setActiveData] = useState(HeadphoneData[0])
  const [curretIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % HeadphoneData.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [curretIndex])

  useEffect(() => {
    setActiveData(HeadphoneData[curretIndex])
  },[curretIndex])

  return (
      <Motion.section 
        initial={{
          backgroundImage: activeData.bgImage 
            ? activeData.bgImage
            : `radial-gradient(circle, ${activeData.bgColor} 0%, ${activeData.bgColor} 0%)`
        }}
        animate={{
          backgroundImage: activeData.bgImage 
            ? activeData.bgImage
            : `radial-gradient(circle, ${activeData.bgColor} 0%, ${activeData.bgColor} 70%)`
        }}
        transition={{ duration: 0.8 }}
        className="text-white overflow-x-hidden"
      >
        <Navbar />
        <div className="container grid grid-cols-1 md:grid-cols-2 h-screen md:h-[700px] relative">
           {/*Info*/}
           <div className='flex flex-col justify-center py-14 md:py-0 xl:max-w-[500px] order-2 md:order-1'>
              <div className='space-y-5 md:space-y-7 text-center md:text-left'>
                <AnimatePresence mode="wait">
                  <Motion.h1 
                    key={activeData.id}
                    variants={SlideRight(0.2)}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className='text-3xl lg:text-4xl xl:text-5xl font-bold'>{activeData.title}</Motion.h1>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                <Motion.p 
                  key={activeData.id}
                  variants={SlideRight(0.4)}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className='text-sm leading-loose text-white/80'>{activeData.subtitle}</Motion.p>
                </AnimatePresence>
                <Motion.p 
                  key={activeData.id}
                  variants={SlideRight(0.6)}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className='text-3xl lg:text-4xl xl:text-5xl font-bold'>{activeData.price}</Motion.p>
                <div className='flex items-center justify-center md:justify-start gap-4 text-3xl'>
                  <FaInstagram className='cursor-pointer border rounded-full p-[6px]' />
                  <FaFacebook className='cursor-pointer border rounded-full p-[6px]' />
                  <FaTwitter className='cursor-pointer border rounded-full p-[6px]' />
                </div>
              </div>
           </div>
           {/*Image*/}
           <div className='flex flex-col items-center justify-center order-1 md:order-2 relative'>
            <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] xl:w-[600px] xl:h-[600px] relative z-10">
              <Motion.div
                key={activeData.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: easeInOut, delay: 0 }}
                className="w-full h-full"
              >
                <Canvas camera={{ position: [0, 0, 2] }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} intensity={1.5} />
                  <DynamicModel 
                    path={activeData.modalPath}
                    scale={activeData.scale}
                    position={activeData.position}
                    rotation={activeData.rotation}
                  />
                  <OrbitControls enableZoom={false} />
                </Canvas>
              </Motion.div>
            </div>

            <AnimatePresence mode="wait">
              <Motion.div 
                key={activeData.id}
                initial={{opacity:0}}
                animate= {{ opacity: 1 }}
                transition={{ duration: 0.4, ease: easeInOut, delay: 0 }}
                exit={{ opacity: 0 }}
                className='text-[300px] absolute bottom-0 mt-8 left-1/2 -translate-x-1/2 text-white/5 font-poppins font-extrabold z-0'>{activeData.modal}</Motion.div>
              </AnimatePresence>
           </div>
        </div>
    </Motion.section>
  ) 
}

export default Hero
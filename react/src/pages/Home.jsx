import React from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import {useSnapshot} from 'valtio'
import state from '../store'
import {CustonButton} from '../components'
import {headContainerAnimation,headContentAnimation,headTextAnimation,slideAnimation} from '../config/motion'
const Home = () => {
  const snap = useSnapshot(state)
  return (
    <AnimatePresence>
      {
        snap.intro && (
          <motion.div className='home' {...slideAnimation('left')}>
            <motion.header {...slideAnimation('down')}>
              <img src='./three.png' alt='logo' className='w-14 h-14 object-contain'/>
            </motion.header>
            <motion.div className='home-content' {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                <h1 className='head-text'>Come let us <br className='xl:block hidden'/>spoil you for <br className='text-amber-300 xl:block hidden  '/>choice .</h1>
                
              </motion.div>
            </motion.div>
            <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
              <p className='max-w-md font-normal text-gray-600  '>
              Create your unique and exclusive shirt with our brand-new 3D customization tool. 
              </p>
              <CustonButton
              type="filled"
              title="Customized it "
              handleClick={()=>state.intro=false}
              customStyle='w-fit px-4 py-2.5 font-bold text-sm text-white'

              />
            </motion.div>

          </motion.div>
        )
      }

    </AnimatePresence>
  )
}

export default Home
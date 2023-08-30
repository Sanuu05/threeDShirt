import React from 'react'
import {Canvas} from '@react-three/fiber'
import {Environment,Center,OrbitControls, Stage} from '@react-three/drei'
import Shirt from './Shirt'
import Backdrop from './Backdrop'
import CameraRig from './CameraRig'
const Canva = () => {

  return (
    <Canvas
    shadows
    camera={{position:[0,0,0],fov:27}} 
    gl={{preserveDrawingBuffer:true}}
    className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.4} />
      {/* <Environment preset='studio' /> */}
      {/* <Stage 
      environment={null}
      >
 
      </Stage> */}
     
      {/* <OrbitControls/> */}

      <CameraRig>
        <Backdrop/>
        <Center>
          <Shirt/>
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default Canva
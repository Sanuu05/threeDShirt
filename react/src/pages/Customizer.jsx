import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import state from '../store'
import config from '../config/config'
import { AIPIcker, ColorPicker, CustonButton, FilePicker } from '../components'
import { download } from '../assets'
import { Tabs } from '../components'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'

const Customizer = () => {
  const snap = useSnapshot(state)
  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />

      case 'aipicker':
        return <AIPIcker />
      default:
        return null
    }
  }
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    console.log("typedata",decalType)

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
   
    reader(file)
      .then((result) => {
        
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  return (
    <AnimatePresence>
      {
        !snap.intro && (
          <>
            <motion.div key='custom' className='absolute top-0 left-0 z-10'
              {...slideAnimation('left')}>
              <div className='flex items-center min-h-screen'>
                <div className='editortabs-container tabs'>
                  {
                    EditorTabs.map((tab) => (
                      <Tabs key={tab.name}
                        tab={tab}
                        handleClick={() => setActiveEditorTab(tab.name)}
                      />
                    ))
                  }
                  {generateTabContent()}
                </div>
              </div>
            </motion.div>
            <motion.div className='absolute z-10 top-5 right-0' {...fadeAnimation}>
              <CustonButton type='filled' title='Go Back' handleClick={() => state.intro = true} customStyle="w-fit px-4 py-2.5 font-bold text-sm text-white" />
            </motion.div>
            <motion.div className='filtertabs-container' {...slideAnimation('down')}>
              {
                FilterTabs.map((tab) => (
                  <Tabs key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab=''
                    handleClick={() =>handleActiveFilterTab(tab.name)}
                  />
                ))
              }
            </motion.div>
          </>
        )
      }

    </AnimatePresence>
  )
}

export default Customizer
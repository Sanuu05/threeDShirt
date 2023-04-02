import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'

const CustonButton = ({title,type,handleClick,customStyle}) => {
    const snap = useSnapshot(state)

    const stylegene=(type)=>{
        if(type==='filled'){
            return {
                backgroundColor:snap.color,
                color:'#fff'
            }
        }
        else if(type === "outline") {
            return {
              borderWidth: '1px',
              borderColor: snap.color,
              color: snap.color
            }
          }
    }
  return (
    <button className={`px-2 py-1.5 flex-1 rounded-md  ${customStyle}`} 
    style={stylegene(type)}
    onClick={handleClick}
    >
{title}
    </button>
    
  )
}

export default CustonButton
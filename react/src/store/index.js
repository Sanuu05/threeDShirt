import {proxy} from 'valtio'


const state = proxy({
    intro:true,
    color:"#EFED08",
    isLogoTexture:true,
    isFullTexture:false,
    logoDecal:'./three.png',
    fullDecal:'./threejs.png'


})
export default state
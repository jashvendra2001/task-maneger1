import React from 'react'
import Leftmenu from '../Leftmenu'
import Rightmenu from '../Rightmenu'
import "./navside.css"
const NavsideMenu = () => {
  return (
    <div className='parentsLayout'>
        <Leftmenu />
        <Rightmenu/>
    </div>
  )
}

export default NavsideMenu
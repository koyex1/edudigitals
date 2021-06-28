import React, { useEffect, useRef, useState } from 'react'

function TestScreen() {

   const inputRef = useRef()
   const inputRef2 = useRef()

 
  useEffect(() => {


  }, [])

  
   
const handleRef = (e) => {
  console.log(e)
 console.log(inputRef.current.offsetHeight)
 console.log(inputRef)
}

   const handleClick = (e) =>{

  }

   const handleOnChange = (e) =>{
    console.log(e)
  }



    return (
        <>

        <div className='hiss' style={{width: '200px', backgroundColor: 'green'}} value={2}  ref={inputRef} onClick={handleClick}>nnnnnnnnnnn</div>
        <button draggable="true" onDrag = {handleRef}  style={{width: '50px'}} ref={inputRef2 }>his</button>
        <input id="hiss" type="text" onChange={handleOnChange}/>

        </>
    )
}

export default TestScreen
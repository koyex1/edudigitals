import React, { useEffect, useRef, useState } from 'react'

function TestScreen() {

   const inputRef = useRef()
   const inputRef2 = useRef()

 
  useEffect(() => {


  }, [])

  
   


   const handleClick = (e) =>{
    console.log()
   }

   const handleOnChange = (e) =>{
    console.log(e.target.value.toLowerCase())
  }



    return (
        <>

        <div className='hiss' style={{width: '20px', color: 'green'}} value={2}  ref={inputRef} onClick={handleClick}>nnnnnnnnnnn</div>
        <button style={{width: '20px'}} ref={inputRef2 }>his</button>
        <input id="hiss" type="text" onChange={handleOnChange}/>

        </>
    )
}

export default TestScreen
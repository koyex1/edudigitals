import React, { useEffect, useRef, useState } from 'react'

function TestScreen() {

   const inputRef = useRef()
   const inputRef2 = useRef()

 
  useEffect(() => {
    console.log('effec')
    console.log(window)
  var be= document.createElement("div")
  be.value= 'llllllllll'
    

  }, [])

  console.log('no inside')
   console.log(window)
   console.log(document)
   


   const handleClick = (e) =>{
     console.log(e)
     console.log(inputRef)
   
   }

   const handleOnChange = (e) =>{
    console.log(e)
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
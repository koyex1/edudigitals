import { Spin } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hideNavBar } from '../actions/userActions'

function CheckEmailScreen() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(hideNavBar(true))
        return () => {
            dispatch(hideNavBar(false))
        }
    }, [])


    return (
        <div  className="checkEmail_welcome">
            <div className="checkEmail_welcome_text"> <Spin/> Check your email for verification...</div>
        </div>
    )
}

export default CheckEmailScreen

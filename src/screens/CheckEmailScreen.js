import { Spin } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
            <div className="checkEmail_welcome_text"> <Spin/>  Temporarily deactivated email verification. You can go right ahead and log in <Link  to="/signin">here</Link> </div>
        </div>
    )
}

export default CheckEmailScreen

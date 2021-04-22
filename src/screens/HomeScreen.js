import React from 'react'
import { Link } from 'react-router-dom'
import img from '../images/learning.jpg'

function HomeScreen() {
    return (
        <div class="home_main_container">
    
    
        <div class="services">
            <div class="services_row1">
                <p class="services_header">A 1000+ tutors just for you</p>
                <p class="services_body">We connect tutors to students. Reviews from our students encourages us to take the audacios step to make things better for all users.</p>
                <div class="services_button">
                    <Link className='black_link' to="/search">Find a Tutor </Link>
                    <Link className='black_link' to="/register">Sign Up</Link>
                </div>
            </div>
            <div class="learning_image">
                <img src= {img}/>
            </div>
        </div>
    
       <div>
    
        
       </div>
    
       
    </div>
    )
}

export default HomeScreen

import React from 'react'
import { Link } from 'react-router-dom'
import img from '../images/learning.jpg'
import img2 from '../images/learning2.jpg'
import teacher from '../images/teacher.png'
import books from '../images/books.png'
import globe from '../images/globe.png'
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Pulse from 'react-reveal/Pulse';

import i18next from 'i18next';
import {Trans,  useTranslation} from 'react-i18next'


function HomeScreen() {
    const {t , i18n} = useTranslation();
    return (
        <div class="home_main_container">


            <div class="services">
                <div class="services_row1">
                    <p class="services_header">{t('1000tutors')}</p>
                    <p class="services_body">{i18next.t('connectStudents')}</p>
                    <div class="services_button">
                        <Link className='black_link' to="/search">Find a Tutor </Link>
                        <Link className='black_link' to="/register">Sign Up</Link>
                    </div>
                </div>
                <div className="learning_image">
                    <Pulse left>
                    <img src={img} />
                    </Pulse>
                    <Pulse right>
                    <img src={img2}/>
                    </Pulse>
                </div>
            </div>

            <div className="edu_cards ">
            <Pulse bottom>
                <div className="edu_card item1">
                    <div className="edu_card_image">
                        <img src={teacher}/>
                        
                    </div>
                    <div className="edu_card_content">
                        EXPERIENCED TEACHERS
                    </div>
                </div>
            </Pulse>
            <Pulse bottom>
                <div className="edu_card item2">
                    <div className="edu_card_image">
                        <img src={books}/>
                    </div>
                    <div className="edu_card_content ">
                        ALL SUBJECTS
                    </div>
                </div>
            </Pulse>
            <Pulse bottom>
                <div className="edu_card item3">
                    <div className="edu_card_image">
                        <img src={globe}/>
                    </div>
                    <div className="edu_card_content">
                        LESSONS FOR ALL LANGUAGES
                    </div>
                </div>
            </Pulse>
            </div>


        </div>
    )
}

export default HomeScreen

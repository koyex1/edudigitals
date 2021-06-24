import React from 'react'
import { Link } from 'react-router-dom'
import img from '../images/learning.jpg'
import teacher from '../images/teacher.png'
import books from '../images/books.png'
import globe from '../images/globe.png'
import Fade from 'react-reveal/Fade';
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
                <div class="learning_image">
                    <img src={img} />
                </div>
            </div>

            <div className="edu_cards ">
            <Fade bottom>
                <div className="edu_card item1">
                    <div className="edu_card_image">
                        <img src={teacher}/>
                    </div>
                    <div className="edu_card_content">
                        Experienced Teachers
                    </div>
                </div>
            </Fade>
            <Fade bottom>
                <div className="edu_card item2">
                    <div className="edu_card_image">
                        <img src={books}/>
                    </div>
                    <div className="edu_card_content ">
                        All Subjects
                    </div>
                </div>
            </Fade>
            <Fade bottom>
                <div className="edu_card item3">
                    <div className="edu_card_image">
                        <img src={globe}/>
                    </div>
                    <div className="edu_card_content">
                        Lessons in different languages
                    </div>
                </div>
            </Fade>
            </div>


        </div>
    )
}

export default HomeScreen

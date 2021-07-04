import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import img from '../images/learning.jpg'
import img2 from '../images/learning2.jpg'
import teacher from '../images/teacher.png'
import books from '../images/books.png'
import globe from '../images/globe.png'
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Pulse from 'react-reveal/Pulse';
import { useInView } from 'react-intersection-observer';
import i18next from 'i18next';
import {Trans,  useTranslation} from 'react-i18next'
import { motion } from 'framer-motion';
import { variants } from '../animation/variants';
import { Tutor } from '../svgComponents/Tutor';
import Earth from '../svgComponents/Earth'
import Books from '../svgComponents/Books'



function HomeScreen(props) {
    const {t , i18n} = useTranslation();
    
    const [ref2, inView2 ] = useInView({
        threshold: 0.2,

    })
    const [ref, inView ] = useInView({
        threshold: 0.2
    })

    const [ref4, inView4 ] = useInView({
        threshold: 0.2
    })
    const [ref5, inView5 ] = useInView({
        threshold: 0.2
    })
    const [ref6, inView6 ] = useInView({
        threshold: 0.2
    })
    const [ref7, inView7 ] = useInView({
        threshold: 0.2
    })

    const [clickTutor, setClickTutor] = useState(false)
    const [clickSign, setClickSign] = useState(false)
    const [ballMove, setBallMove] = useState(true)

console.log('all vales')
console.log('ballmove' + ballMove)
console.log('clickfind' + clickTutor)
console.log('clicksign' + clickSign)

    const handleTutorLink = ()=>{
        setBallMove(false)
        setClickTutor(true)

    }

    const handleSignLink = () =>{
        setBallMove(false)
        setClickSign(true)
    }

    useEffect(() => {
        setTimeout(() => {

            if(clickTutor){
                console.log('hisory for find ')
                props.history.push('/search')
            }

        }, 2000);
       
    }, [clickTutor, props.history ])

    useEffect(() => {
        setTimeout(() => {

            if(clickSign){
                console.log('hisory for regiser')
                props.history.push('/register')
            }
                
        }, 2000);
        
      
    }, [clickSign, props.history])

    const variantChange = () =>{
       // ballMove?variants.movingBallVariant:clickTutor?variants.whiteLinkVariant:clickSign?variants.darkLinkVariant:variants.movingBallVariant
      if(ballMove)  return variants.movingBallVariant;
      if(clickTutor)  return variants.whiteLinkVariant;
      if(clickSign)  return variants.darkLinkVariant;

    }

    
    return (
        <div class="home_main_container">


            <div class="services">
                <div class="services_row1">
                    <div ref={ref7}>
                <motion.div variants={variants.servicesVariant} initial="initial" animate="move" class="services_header">{t('1000tutors')}
                </motion.div>
                
                </div>
                    <div class="services_body">{i18next.t('connectStudents')}</div>
                    <div class="services_engine"> 
                        <div className="path"><motion.div
                         variants={ ballMove?variants.movingBallVariant:clickTutor?variants.whiteLinkVariant:clickSign?variants.darkLinkVariant:variants.movingBallVariant} 
                         initial="initial" 
                         animate="move" 
                         className="movingBall"></motion.div></div>
                    <div class="services_button">
                        <motion.div onClick={handleTutorLink} className='divButton' whileHover={{scale: 1.4}} >Find a Tutor</motion.div> 
                        <motion.div  onClick={handleSignLink} whileHover={{scale: 1.4}} className='divButton change_color '>Sign Up</motion.div>
                    </div>
                    </div>
                </div>
                <div className="learning_image">
                    
                <div  ref={ref} >
                    <motion.img variants={variants.revealVariant} initial= "initial" animate={inView?"reveal":"initial"} src={img} />
                    <motion.div  className="slideReveal2" variants={variants.slideRiseVariant} initial= "initial" animate={inView?"reveal":"initial"}>
                        <motion.p variants={variants.slideUpVariant} initial= "initial" animate={inView?"reveal":"initial"} className="slideWriting2">EDUCATION
                        <p>
Informally the role of teacher may be taken on by anyone (e.g. when showing a colleague how to perform a specific task). In some countries.
                        </p>
                        </motion.p>
                    </motion.div>
                    </div>
                    
                <div  ref={ref2} >
                    <motion.img variants={variants.revealVariant} initial = "initial" animate = {inView2?"reveal":"initial"} src={img2}/>
                    <motion.div  className="slideReveal2" variants={variants.slideRiseVariant} initial= "initial" animate={inView2?"reveal":"initial"}>
                        <motion.p variants={variants.slideUpVariant} initial= "initial" animate={inView2?"reveal":"initial"} className="slideWriting2">EDUCATION
                        <p>
Informally the role of teacher may be taken on by anyone (e.g. when showing a colleague how to perform a specific task). In some countries. 
                        </p>
                        </motion.p>
                    </motion.div>
                    </div>
                    
                    
                </div>
            </div>

            <div ref={ref4} className="edu_cards ">
            <div >
            <motion.div variants ={variants.revealVariant} initial="initial" animate={inView4? "reveal":"initial"} className="edu_card item1">
                    <div className="edu_card_image">
                        <Tutor inView4={inView4} servicePathVariant={variants.servicePathVariant} />
                        
                    </div>
                    <div className="edu_card_content">
                        EXPERIENCED TEACHERS
                    </div>
                </motion.div>
                </div>
            <div ref={ref5}>
            <motion.div variants ={variants.revealVariant} initial="initial" animate={inView5? "reveal":"initial"} className="edu_card item2">
                    <div className="edu_card_image">
                    <Books inView5={inView5} servicePathVariant={variants.servicePathVariant} />
                    </div>
                    <div className="edu_card_content ">
                        ALL SUBJECTS
                    </div>
                </motion.div>
                </div>
            <div ref={ref6}>
                <motion.div variants ={variants.revealVariant} initial="initial" animate={inView6? "reveal":"initial"} className="edu_card item3">
                    <div className="edu_card_image">
                    <Earth inView6={inView6} servicePathVariant={variants.servicePathVariant} />
                    </div>
                    <div className="edu_card_content">
                        LESSONS IN ALL LANGUAGES
                    </div>
                </motion.div>
                </div>
            </div>


        </div>
    )
}

export default HomeScreen

import { Link } from '@material-ui/core';
import React, { Fragment } from 'react'
import { motion } from 'framer-motion';
import { variants } from '../animation/variants';

function Footer() {
    return (
        <Fragment>
        <div className="footer_section">
<p>Follow us on all social Media platform</p>
<div className="footer_margin_left"> 
    <div><Link><motion.i whileHover={{scale: 2}} className='link_color bx bxl-facebook-square'></motion.i></Link></div>
    <div> <Link ><motion.i whileHover={{scale: 2}} className='link_color bx bxl-facebook-square'></motion.i></Link></div>
    <div> <Link><motion.i whileHover={{scale: 2}} className='link_color bx bxl-twitter' ></motion.i></Link></div>
    <div> <Link><motion.i whileHover={{scale: 2}} className='link_color bx bxl-instagram' ></motion.i></Link></div>
    <div> <Link><motion.i whileHover={{scale: 2}} className='link_color bx bxl-youtube' ></motion.i></Link></div>
    <div> <Link><motion.i whileHover={{scale: 2}} className='link_color bx bxl-linkedin-square'></motion.i></Link></div>
</div>

</div>
<hr/>
<div className="footer_section">
<p> {'\u00a9'} 2021 Edudigitals All rights reserved</p>
</div>

</Fragment>
    )
}

export default Footer;

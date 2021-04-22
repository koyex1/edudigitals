import { Link } from '@material-ui/core';
import React, { Fragment } from 'react'

function Footer() {
    return (
        <Fragment>
        <div className="footer_section">
<p>Follow us</p>
<div> 
    <Link><i className='link_color bx bxl-facebook-square'></i></Link>
    <Link><i className='link_color bx bxl-facebook-square'></i></Link>
    <Link><i className='link_color bx bxl-twitter' ></i></Link>
    <Link><i className='link_color bx bxl-instagram' ></i></Link>
    <Link><i className='link_color bx bxl-youtube' ></i></Link>
    <Link><i className='link_color bx bxl-linkedin-square'></i></Link>
</div>

</div>
<hr/>
<div className="footer_section">
<p> {'\u00a9'} 2021 Edudigitals</p>
</div>

</Fragment>
    )
}

export default Footer;

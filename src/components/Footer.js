import React, { Fragment } from 'react'

function Footer() {
    return (
        <Fragment>
        <div className="footer_section">
<p>Follow us</p>
<div> 
    <a><i className='bx bxl-facebook-square'></i></a>
    <a><i className='bx bxl-facebook-square'></i></a>
    <a><i className='bx bxl-twitter' ></i></a>
    <a><i className='bx bxl-instagram' ></i></a>
    <a><i className='bx bxl-youtube' ></i></a>
    <a><i className='bx bxl-linkedin-square'></i></a>
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

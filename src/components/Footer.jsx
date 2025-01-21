import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'



function Footer() {
  return (
    <div className='p-5 bg-success mt-5'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4'>
            <h4 className='text-light'><FontAwesomeIcon icon={faStackOverflow} />  Project Fair</h4>
            <p style={{ textAlign: 'justify' }} className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi inventore, ipsam voluptates similique odio ut labore dolorem? Accusantium consectetur ex, veritatis at ducimus quos necessitatibus? Atque fugiat corrupti accusamus temporibus.</p>
          </div>

          <div className='col-md-2 d-md-flex justify-content-center mt-4 mt-md-0'>
            <div>
              <h4 className='text-light'>Guides</h4>
              <Link to={'/'}><p className='mt-3 text-primary'>Home</p></Link>
              <Link to={'/projects'}><p className='text-primary'>Project</p></Link>
              <Link to={'/dashboard'}><p className='text-primary'>Dasboard</p></Link>

            </div>
          </div>

          <div className='col-md-2 d-md-flex justify-content-center mt-4 mt-md-0'>
            <div>
              <h4 className='text-light'>Links</h4>
              <p className='mt-3'>React</p>
              <p>React Bootstrap</p>
              <p>Bootswatch</p>
            </div>
          </div>
          
          <div className='col-md-4 px-md-5 mt-4 mt-md-0'>
            <h4 className='text-light'>Contact Us</h4>
            <div className='d-flex mt-3'>
              <input type="text" placeholder='Email Id' className='form-control' />
              <button className='btn btn-warning ms-3'>Subscribe</button>
            </div>

            <div className='d-flex justify-content-between mt-3'>
              <FontAwesomeIcon icon={faInstagram} className='fa-2x' />
              <FontAwesomeIcon icon={faXTwitter} className='fa-2x' />
              <FontAwesomeIcon icon={faFacebook} className='fa-2x' />
              <FontAwesomeIcon icon={faWhatsapp} className='fa-2x' />
              <FontAwesomeIcon icon={faLinkedin} className='fa-2x' />

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Footer
import React from 'react'
import { Link } from 'react-router-dom'

function PagenotFound() {
  return (
    <>
    <div className="container-fluid p-5">
        <div className="row">
            <div className="col-md-2"></div>
                <div className='col-md-8 d-flex justify-content-center align-items-center flex-column'>
                    <img src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="no image" />
                    <h1>Look like you're lost</h1>
                    <h4 className='mt-4'>The page you are looking unavailable</h4>
                    <Link to={'/'}><button className='btn btn-success rounded-0 mt-4'>GO HME</button></Link>

                </div>
            
            <div className="col-md-2"></div>

        </div>
    </div>
    </>
  )
}

export default PagenotFound
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import photo from '../assets/project fair.png'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { homeProjectApi } from '../service/allApi'



function Home() {
  const [isLogin, setIsLogin] = useState(false)
  // 09.01.25
  const [homeProject, setHomeProject] = useState([])

  const getHomeProject = async () => {
    const result = await homeProjectApi()
    // console.log(result);
    setHomeProject(result.data)
  }

  console.log(homeProject);


  useEffect(() => {
    getHomeProject() //09.01.25
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])

  return (
    <>
      <div style={{ height: "100vh" }} className="bg-success p-5">
        <div className="container-fluid mt-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6">
              <h1 className='text-light' style={{ fontSize: "70px" }}>Project Fair</h1>
              <p>One stop destination for all software development Project</p>

              {isLogin == false ?
                <Link to={'/login'}><button className='btn text-light p-1 mt-3'>Get Started <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                :
                <Link to={'/dashboard'}><button className='btn text-light p-1 mt-3'>Manage Projects <FontAwesomeIcon icon={faArrowRight} /></button></Link>
              }

            </div>

            <div className="col-md-6 mt-4">
              <img src={photo} alt="no image" className='w-75 p-3' />
            </div>

          </div>
        </div>
      </div>




      {/* explore our projects */}

      <div>

        <h1 className='text-center mt-5'>Explore Our Projects</h1>

        <div className="container">
          <div className="row mt-5">
            {
              homeProject?.map((item) => (

                <div className="col-md-4"><ProductCard project={item} /></div>


              ))
            }
          </div>
        </div>

        <Link to={'/projects'} className='text-danger'><p className='text-warning text-center mt-5'>See More Projects...</p></Link>
      </div>


    </>


  )
}

export default Home
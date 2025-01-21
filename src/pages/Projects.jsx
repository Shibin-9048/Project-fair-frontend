import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import { allProjectApi } from '../service/allApi'




function Projects() {
  // 10.01.25
  const [token, setToken] = useState("")
  const [allProject, setAllProject] = useState([])
  // 13.01.25
  const [searchKey, setSearchKey] = useState("")

  const getAllProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allProjectApi(searchKey, reqHeader)
      // console.log(result.data);
      setAllProject(result.data)

    }
  }
  console.log(token);
  console.log(allProject);
   // 13.01.25
  console.log(searchKey);

  useEffect(()=>{
    getAllProject()
  },[searchKey])
  
  
  useEffect(() => {
    getAllProject()
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem('token'))
    }
  },[])
  return (
    <>

      <div>
        <Header />
        <h3 className='text-center mt-4'>All Projects</h3>



        {!token ? <div className="mt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
                <img src="https://cdn.dribbble.com/users/8619169/screenshots/16514320/media/0dc828901898c59928c3d69718791941.gif" alt="no img" className='w-75' />
                <h4 className='text-center'>Please  <Link to={'/login'}>Login</Link>  to see more projects</h4>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
          :
          // logged in

          <div className="mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 d-flex">
                  <input onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Technologies' className='form-control shadow' />
                  <FontAwesomeIcon style={{ color: "lightgrey", marginTop: "10px", marginLeft: "-30px" }} icon={faMagnifyingGlass} />
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
            <div className="container mt-5 p-1">
              <div className="row">
                {allProject?.map((item) => (
                  <div className="col-md-3 mt-5"><ProductCard project={item}/></div>
                ))
                }
              </div>
            </div>
          </div>}
      </div>
    </>
  )
}

export default Projects
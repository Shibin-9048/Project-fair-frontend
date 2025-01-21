import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { loginApi, requestApi } from '../service/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/ContextShare'




function Auth({ register }) {
const {setLoginResponse} = useContext(loginResponseContext) //20.01.25
 
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    username:"",
    email:"",
    password:"",
  })
  console.log(userDetails);

   // register
  const handleRegister = async ()=>{
    const {username,email,password} = userDetails
    if(!username || !email || !password){
      toast.info("fill the form")
    }else{
      const result = await requestApi(userDetails)
      console.log(result);
      if(result.status == 200){
        toast.success("Registration Successfull")
// navigate
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        navigate("/login")

      }else if(result.status == 406){
        toast.error(result.response.status)
      }
      else{
        toast.error("something went wrong")
      }
      
    }
  }

  // login
  const handleLogin = async ()=>{
    const {email,password} = userDetails
    if(!email || !password){
      toast.info(`Fill the form completely`)
    }else{
      const result = await loginApi({email,password})
      console.log(result);
      if(result.status==200){
        toast.success(`Login Successfull`)
        setLoginResponse(true) //20.01.25

      // data storage (after login successful )
        sessionStorage.setItem("existingUsers",JSON.stringify(result.data.existingUsers))
        sessionStorage.setItem("token",result.data.token)

      // navigate
        setUserDetails({
          username:"",
          email:"",
          password:""
        })
        setTimeout(()=> {
          navigate("/")
        },2000)
        

      }else if(result.status==406){
        toast.warning(result.response.status)
      }
      else{
        toast.error(`Something went wrong`)
      }

    }
  }
  
  return (
    <>
      <div className="container-fluid mb-5">

        <div className="row">
          <div className="col-md-1"></div>

          <div className="col-md-10 ">
            <Link to={'/'}><button className='text-warning bg-transparent border-0' style={{ marginTop: '80px' }}><FontAwesomeIcon className='me-2 ' icon={faArrowLeft} />Back Home</button></Link>
            <div className='bg-success mb-5 ' style={{ height: '600px' }}>
              <div className="row">
                <div className="col-md-6 justify-content-center d-flex align-items-center mt-5">
                  <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" className='w-75 ' />
                </div>
                <div className="col-md-6 text-light justify-content-center d-flex align-items-center flex-column">
                  <h3 ><FontAwesomeIcon icon={faStackOverflow} className='' />Project Fair</h3>
                  {!register ? <h4>Sign in to Your Account</h4> :
                    <h4>Sign Up to your Account</h4>}


                  <div className='mt-4 '>
                    {register &&
                      <input className='w-100 border-0 p-1' type="text" placeholder='Username' onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}/>}
                    <input className='w-100 border-0 p-1 mt-3' type="text" placeholder='Email ID' onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}/>
                    <input className='w-100 mt-3  border-0 p-1' type="text" placeholder='Password' onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}/>

                    {!register ?
                      <div>
                        <button className='w-100 bg-warning text-light  border-0 mt-3 p-1' onClick={handleLogin}>Login</button>
                        <p className='mt-3'>New User?click Here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                      </div>
                      :

                      <div>
                        <button className='w-100 bg-warning text-light  border-0 mt-3 p-1' onClick={handleRegister}>Register</button>
                        <p className='mt-3'>Already a User?click Here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                      </div>
                    }


                  </div>

                </div>
              </div>

            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={2000} theme="colored"/>
    </>
  )
}

export default Auth
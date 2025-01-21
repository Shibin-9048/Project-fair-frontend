import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addResponseContext } from '../context/ContextShare';



function Addproject() {
  const [show, setShow] = useState(false);

  // useContext - used for accessing context (hook) 14.01.25- destructure
  const {setAddResponse} = useContext(addResponseContext)

  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  console.log(token);
  const [key, setKey] = useState(1)


  // add project
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""

  })
  console.log(projectDetails);

  // image file
  const handleFile = (e) => {
    // console.log(e.target.files[0]);
    setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })
  }

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])

  // empty box(cancel )
  const handleCancel = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""
    })
    setPreview("")

    // key attribute - when a value of key attribute changes onchange events calls / invoke (same image 2 times add akan)
    if (key == 1) {
      setKey(0)
    } else {
      setKey(1)
    }
  }


  const handleClose = () => {
    setShow(false)
    handleCancel()
  }

  const handleAdd = async () => {
    const { title, language, github, website, overview, projectImage } = projectDetails
    if (!title || !language || !github || !website || !overview || !projectImage) {
      toast.info(`Fill the form completely`)
    } else {
      // AddProject api call

      // append() - to create reqHeader
      // is the request contains upload content the reqBody should be created with the help of apend method, present in the form-data class.in short reqBody should be a form-data.
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("projectImage", projectImage)

      // token check
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await addProjectApi(reqBody, reqHeader)
        console.log(result);

        // project adding (06.01.25)
        if (result.status == 200) {
          toast.success(`Projects Added Successfully`)
          setTimeout(() => {
            handleClose()
          }, 2000)

          setAddResponse(result) //14.01.25

        } else if (result.status == 406) {
          toast.warning(result.response.data)
          handleCancel()
        } else {
          toast.warning(`Something went wrong`)
          handleClose()
        }

      } else {
        toast.warning("Please Login")
      }
    }

  }
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])




  const handleShow = () => setShow(true);
  return (
    <>
      <button onClick={handleShow} className='btn btn-success rounded-0'>Add Project</button>
      <Modal centered show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <label htmlFor="projectImage">
                  <input type="file" id='projectImage' className='d-none' key={key} onChange={(e) => handleFile(e)} />
                  <img src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdT2feIVOhVnSiyRXpWMJzyKgrne379dHopA&s"} alt="project image" className='w-100' />
                </label>
              </div>
              <div className="col-md-6">
                <div className='mt-3'><input type="text" value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} placeholder='Title' className='form-control' /></div>
                <div className='mt-3'><input type="text" value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} placeholder='Language' className='form-control' /></div>
                <div className='mt-3'><input type="text" value={projectDetails.github} onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} placeholder='Github' className='form-control' /></div>
                <div className='mt-3'><input type="text" value={projectDetails.website} onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} placeholder='Website' className='form-control' /></div>
                <div className='mt-3'><textarea row={5} value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} placeholder='Overview' className='form-control'></textarea>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning me-3" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add Project
          </Button>
        </Modal.Footer>
        <ToastContainer position='top-center' theme="colored" autoClose={2000} />

      </Modal>
    </>
  )
}

export default Addproject
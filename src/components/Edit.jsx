
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../service/serviceUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProjectApi } from '../service/allApi';
import { editProjectResponse } from '../context/ContextShare';



function Edit({ projects }) {
  
  const {setEditResponse} = useContext(editProjectResponse) //18.01.25

  const [show, setShow] = useState(false);
  console.log(projects);
  const [preview, setPreview] = useState("")
  const [key, setKey] = useState(0)

  const [projectDetails, setProjectDetails] = useState({
    title: projects.title,
    language: projects.language,
    github: projects.github,
    website: projects.website,
    overview: projects.overview,
    projectImage: ""
  })
  console.log(projectDetails);

  const handleFile = (e) => {
    console.log(e.target.files);
    setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })

  }
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])

  const handleCancel = () => {
    setProjectDetails({
      title: projects.title,
      language: projects.language,
      github: projects.github,
      website: projects.website,
      overview: projects.overview,
      projectImage: ""
    })
    setPreview("")
    if (key == 0) {
      setKey(1)
    } else {
      setKey(0)
    }
  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 17.01.25
  const handleUpdate = async () => {
    const { title, language, github, website, overview, projectImage } = projectDetails
    if (!title || !language || !github || !website || !overview) {
      toast.info(`Fill the form completely`)
    } else {
      // api calls
      // 1.reqBody
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", projects.projectImage)

      const token = sessionStorage.getItem("token")

      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserProjectApi(projects._id, reqBody, reqHeader)
        console.log(result);
        if(result.status == 200){
          setEditResponse(result) //18.01
          toast.success(`Project Updated Successfully`)
          setTimeout(()=>{
            handleClose()
          },3000)

        }else{
          handleCancel()
          toast.error(`Something went wrong`)
        }

      } else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserProjectApi(projects._id, reqBody, reqHeader)
        console.log(result);

        if(result.status == 200){
          setEditResponse(result) //18.01
          toast.success(`Project Updated Successfully`)
          setTimeout(()=>{
            handleClose()
          },3000)

        }else{
          handleCancel()
          toast.error(`Something went wrong`)
        }

      }
    }
  }

  return (
    <>
      <FontAwesomeIcon icon={faPenToSquare} onClick={handleShow} className='text-info me-4' />

      <Modal centered show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <label htmlFor="projectImage">
                  <input key={key} onChange={(e) => handleFile(e)} type="file" id='projectImage' className='d-none' />
                  <img src={preview ? preview : `${serverUrl}/upload/${projects.projectImage}`} alt="project image" className='w-100' />
                </label>
              </div>
              <div className="col-md-6">
                <div className='mt-3'><input onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} value={projectDetails.title} type="text" placeholder='Title' className='form-control' /></div>
                <div className='mt-3'><input onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} value={projectDetails.language} type="text" placeholder='Language' className='form-control' /></div>
                <div className='mt-3'><input onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} value={projectDetails.github} type="text" placeholder='Github' className='form-control' /></div>
                <div className='mt-3'><input onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} value={projectDetails.website} type="text" placeholder='Website' className='form-control' /></div>
                <div className='mt-3'>
                  <textarea row={5} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} value={projectDetails.overview} placeholder='Overview' className='form-control'></textarea>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning me-3" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
        <ToastContainer position='top-center' autoClose={2000} theme="colored" />
      </Modal>
    </>
  )
}

export default Edit
import { commonApi } from "./commonApi"
import { serverUrl } from "./serviceUrl"


//  register request
export const requestApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

// login request
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

// Add project
export const addProjectApi = async(reqBody,reqHeader)=>{
    return await commonApi("POST", `${serverUrl}/add-project`,reqBody,reqHeader)
}

// get Home projects 09.01.25
export const homeProjectApi = async()=>{
    return await commonApi("GET", `${serverUrl}/home-project`)
}

// get all projects 09.01.25
// query parameter (13.01.25) - baseurl?key = value
export const allProjectApi = async(searchKey,reqHeader)=>{
    return await commonApi("GET", `${serverUrl}/all-project?search=${searchKey}`,"",reqHeader)
}

// get all user projects 09.01.25
export const allUserProjectApi = async(reqHeader)=>{
    return await commonApi("GET", `${serverUrl}/user-project`,"",reqHeader)
}

// remove user projects 14.01.25
export const removeUserProjectApi = async(id,reqHeader)=>{
    return await commonApi('DELETE',`${serverUrl}/remove-userproject/${id}`,{},reqHeader)
}

// api to update user project edit 17.01.25
export const updateUserProjectApi = async(id, reqBody, reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/update-userProject/${id}`,reqBody, reqHeader)
}

// api to update user profile 18.01.25
export const updateUserProfileApi = async(reqBody, reqHeader)=>{
    return await commonApi('put',`${serverUrl}/update-userProfile`,reqBody, reqHeader)
}
import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const CreateAuthor = () => {
    const[authorList, setAuthorList] = useState("")
    const[error, setError] = useState([])

    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        axios.post("http://localhost:8000/api/authors", {name:authorList})
        .then(response =>{
            navigate("/Author")
        })
        .catch(err=>{
            const errorResponseData = err.response.data.errors
            const errMsgArr = []

            for(const eachKey in errorResponseData){
                errMsgArr.push(errorResponseData[eachKey].message)
            }
            setError(errMsgArr)
        })
    } 

    return (
        <div className='center'>
            <h1>Favorite authors</h1>
            <div>
            <Link to="/Author">Home</Link>
            </div>
            <p1 style={{color:"plum"}}>Add a new author:</p1>
            <form className='box' onSubmit={handleSubmit}>
            <label>name:</label>
            <div>
            <input type="text" name="authorList" value={authorList} onChange={e=>setAuthorList(e.target.value)}/>
            </div>
            <Link to="/Author">Cancel</Link>
            <button type="submit">Submit</button>
            </form>
            {
                error.map((eachErr, idx)=>(
                    <p style={{color:"red"}}>{eachErr}</p>
                ))
            }
        </div>
    )
}

export default CreateAuthor
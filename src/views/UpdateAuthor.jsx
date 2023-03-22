import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateAuthor = () => {
    const [authorList, setAuthorList] = useState("")
    const [error, setError] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(response => {
                console.log(response.data)
                setAuthorList(response.data.name)
            })
            .catch(err => {
                console.log(err)
            })
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:8000/api/authors/${id}`, { name: authorList })
            .then(response => {
                navigate("/Author")
            })
            .catch(err => {
                const errorResponseData = err.response.data.errors
                const errMsgArr = []

                for (const eachKey in errorResponseData) {
                    errMsgArr.push(errorResponseData[eachKey].message)
                }
                setError(errMsgArr)
            })

    }

    return (
        <div>
            <Link to="/Author">Home</Link>
            <h3>Edit this author</h3>
            <form className='box' onSubmit={handleSubmit}>
                <label>name:</label>
                <div>
                    <input type="text" name="authorList" value={authorList} onChange={e => setAuthorList(e.target.value)} />
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

export default UpdateAuthor
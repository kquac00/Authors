import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const MainAuthor = () => {
    const [authorList, setAuthorList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then(response => {
                setAuthorList(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    })

    const handleDelete = (deleteId) =>{
        axios.delete(`http://localhost:8000/api/authors/${deleteId}`)
        .then(response=>{
            const filteredList = authorList.filter((eachAuthor)=>eachAuthor._id !==deleteId)
            setAuthorList(filteredList)
        })
        .catch(err=>console.log(err))
    }


    return (
        <div className='center'>
            <p>
                <Link to="/Author/new">Add an author</Link>
            </p>
            <h3>We have quotes by: </h3>
            <table className='border'>
                <thead>
                    <tr>
                    <th>Author</th>
                    <th>Actions available</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authorList.map((eachAuthor, idx) => (
                            <tr key={idx}>
                                <td>{eachAuthor.name}</td>
                                <td>
                                    <Link to={`/author/${eachAuthor._id}/edit`}>Edit </Link>
                                    <button onClick={()=> handleDelete(eachAuthor._id)}> Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MainAuthor
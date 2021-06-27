import React, { useEffect, useState } from 'react';
import {Table } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import './Manage.css';
const Manage = () => {
    const [blogs, setBlogs] = useState([]);
    
    const handleDelete = (id) =>{
        const url = `https://warm-reef-27135.herokuapp.com/deleteBlog/${id}`
        fetch(url, {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data =>{
            if(data){
                alert('delete successfully')
            }
        })
    }
    
    useEffect(()=>{
        fetch('https://warm-reef-27135.herokuapp.com/blogs')
        .then(res => res.json())
        .then(data =>setBlogs(data))
    },[])
    return (
        <div className="manage-container">
            <h3>Manage Blogs</h3>
            
                <div className="manage-area">
                <Table  hover size="sm">
                    <thead>
                        <tr className="table-tr">
                            <th>Blog Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogs.map(blog => <tr>
                                <td>{blog.title}</td>
                                <td><FontAwesomeIcon className="ml-4 icon-color" onClick={() => handleDelete(blog._id)}  icon={faTrashAlt}/></td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Manage;


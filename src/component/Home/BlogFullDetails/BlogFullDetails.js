import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from "react-router";
const BlogFullDetails = () => {
    const {blogId} = useParams();
    // console.log(blogId)
    const [blog, setBlog] = useState([])
    useEffect(()=>{
        fetch(`https://warm-reef-27135.herokuapp.com/blog/${blogId}`)
        .then(res => res.json())
        .then(data => setBlog(data))
    },[])
    // console.log(blog)
    const {title, imageURL, description} = blog;
    return (
        <div className='container'>
            <div className="col-md-12 mt-5 ">
                <div className="d-flex justify-content-center">
                    <Card style={{ width: '28rem', height:'300px' }}>
                        <img src={imageURL} alt="" />
                        <Card.Body>
                        <h4>{title}</h4>
                        </Card.Body>
                    </Card>
                    
                </div>
                <p style={{marginTop:'100px', marginBottom:'50px'}}>{description}</p>
            </div>
        </div>
    );
};

export default BlogFullDetails;
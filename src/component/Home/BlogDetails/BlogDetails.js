import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './BlogDetails.css';
const BlogDetails = (props) => {
    console.log(props.blog)
    const {imageURL, title, _id} = props.blog
    let history = useHistory();
    const handleClick = ()=>{
        history.push(`/blog/${_id}`)
    }
    
    return (
        <div  className="col-md-4 mt-5 blog-details" onClick={handleClick}>
            <div className="d-flex justify-content-center ">
                <Card style={{ width: '18rem', height:'300px' }}>
                    <img src={imageURL} alt="" />
                    <Card.Body>
                        <Card.Text>
                        {title}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default BlogDetails;
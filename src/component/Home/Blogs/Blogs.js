import React, { useEffect, useState } from 'react';
import BlogDetails from '../BlogDetails/BlogDetails';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        fetch('https://warm-reef-27135.herokuapp.com/blogs')
        .then(res => res.json())
        .then(data => setBlogs(data))
    },[])
    return (
        <div className="row">
            {
                blogs.map(blog => <BlogDetails blog={blog} id={blog.id} />)
            }
        </div>
    );
};

export default Blogs;
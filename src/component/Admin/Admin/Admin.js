import React, { useState } from 'react';
import AddBlog from '../AddBlog/AddBlog';
import Manage from '../Manage/Manage';
import BlogManage from '../Manage/BlogManage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faTasks } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import './Admin.css';
const Admin = () => {
    const [add, setAdd] = useState(true);
    return (
        <div className="row">
            <div className="col-md-2 side-bar">
            <h4>E-Fashion</h4>
                <Button onClick={() => setAdd(false)} block ><FontAwesomeIcon icon={faTasks} /> Manage Product</Button>
                <Button onClick={() => setAdd(true)}  block className="mt-2"><FontAwesomeIcon icon={faPlus}/> Add Product</Button>
            </div>
            <div className="col-md-9">
                {
                    add?<AddBlog />:<BlogManage/>
                }
                
                
            </div>
        </div>
    );
};

export default Admin;
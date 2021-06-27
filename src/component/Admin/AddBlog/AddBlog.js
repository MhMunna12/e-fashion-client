import React, {useState} from 'react';
import './AddBlog.css';
import axios from 'axios'
import { useForm } from "react-hook-form";
const AddBlog = () => {
    const { register, handleSubmit} = useForm();
    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const blogData = {
            title: data.title,
            description: data.description,
            imageURL : imageURL
        }
        

        const url = `https://warm-reef-27135.herokuapp.com/addBlog`;
        console.log(blogData)
        fetch(url, {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(blogData)
        })
        .then(click =>{
            if(click){
                alert('Add Blog successfully')
            }
        })
        .then(res => console.log('server side response', res))
        
    };
    const handleImageUpload = event =>{
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key','ea19e2658f41ecd5ad3befd299525445');
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', 
            imageData
        )
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }
    return (
        <div className="add-service">
                <h4>Add Blog</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className='col-md-6'>
                        <label htmlFor="">Blog Title</label>
                        <input name="title" className="form-control" defaultValue="" placeholder="Blog Title" {...register("title", {required:true})} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="">Cover image</label>
                        <br/>
                        <input name="image"  type="file" onChange={handleImageUpload}  className='form-control' />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="">Description</label>
                        <textarea name="description" className="form-control" defaultValue="" placeholder="Description" {...register("description", {required:true})} />
                    </div>
                </div>
                <br />
                <input className='btn btn-primary' type="submit" /> 
            </form>
            
        </div>
    );
};

export default AddBlog;
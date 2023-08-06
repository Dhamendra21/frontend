import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],
  ],
};

export default function CreatePost() {
  const [title,SetTitle] = useState('');
  const [summary,setsummary] = useState('');
  const [Content,setContent] = useState('');
  const [files,setfiles] = useState('');
  const [redirect, setRedirect] = useState(false);

 async function createNewPost(ev) {
    const data = new FormData();
    
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', Content);
    data.set('file',files[0])
    ev.preventDefault();
    console.log(files);
    const response = await fetch('https://backend-gothbaat.onrender.com/post',{
      method :'POST',
      body : data,
      credentials :'include'
     })
     if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={createNewPost}>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">News title</label>
                <input
                  type="title"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter news headline"
                  value={title}
                  onChange={ev => SetTitle(ev.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">News summary</label>
                <input
                  type="summary"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter news summary"
                  value={summary}
                  onChange={ev => setsummary(ev.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">select image</label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter your name"
                  
                  onChange={ev => setfiles(ev.target.files)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter news here</label>
                <ReactQuill
                  value={Content}
                  modules={modules}
                  onChange={newValue => setContent(newValue)}
                />
              </div>
              <button className="btn btn-primary px-5 fs-6">Create Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

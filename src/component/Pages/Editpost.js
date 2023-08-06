

import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from "react-router-dom";

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


export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  
    return(
        <div>
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={updatePost}>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">News title</label>
                  <input
                    type="title"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter news headline"
                    value={title}
                    onChange={ev =>  setTitle(ev.target.value)}
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
                    onChange={ev => setSummary(ev.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">select image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your name"
                    
                    onChange={ev => setFiles(ev.target.files)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter news here</label>
                  <ReactQuill
                    value={content}
                    modules={modules}
                    onChange={newValue => setContent(newValue)}
                  />
                </div>
                <button className="btn btn-dark px-5 fs-6"> update Post</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}
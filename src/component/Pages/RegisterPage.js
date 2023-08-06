import { useState } from "react"



export default function RegisterPage(){
  const [username,setusername] = useState('')
  const [password,setpassword] = useState('')
  async  function Register(ev){
    ev.preventDefault()
  const response =  await fetch('https://backend-gothbaat.onrender.com/register',{
      method : "post",
      body : JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'}
    })
    if (response.status === 200 ){
      alert('registration successful')
    }else{
      alert('registration failed')
    }
  }
    return(
<div>
            <div className="container" >
             <div className="row justify-content-center" >
              <div className="col-md-6 m-5 p-3" >
                <h1>Register</h1>
              <form action="" onSubmit={Register} >
            <div className="mb-3">
             <label for="exampleFormControlInput1" className="form-label">User name</label>
             <input 
             type="text" 
             className="form-control" 
             id="exampleFormControlInput1" 
             placeholder="Enter your name"
             value={username}
             onChange={ev => setusername(ev.target.value)}
             />
            </div>
            <div className="mb-3">
             <label for="exampleFormControlInput1" className="form-label">Password </label>
             <input 
             type="password"
             className="form-control" 
             id="exampleFormControlInput1" 
             placeholder="Enter password "
             value={password}
             onChange={ev=> setpassword(ev.target.value)} />
            </div>
            <button className="btn btn-outline-primary" > Register </button>
            </form>
              </div>
             </div>
            </div>
        </div>
    )
}
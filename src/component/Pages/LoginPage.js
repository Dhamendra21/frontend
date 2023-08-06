import { useState } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import { useContext } from "react"

export default function LoginPage(){
  const [username,setusername] = useState('')
  const [password,setpassword] = useState('')
  const [redirect,setredirect] = useState(false)
  const {setuserInfo} = useContext(UserContext)
  async  function Register(ev){
    ev.preventDefault()
  const response =  await fetch('https://backend-gothbaat.onrender.com/login',{
      method : "post",
      body : JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'},
      credentials :'include'
    })
  if  (response.ok){
      response.json().then(userInfo =>{
        setuserInfo(userInfo)
        setredirect(true)
      }) 
  }else{
    alert('wrong credentials')
  }
  }
  if(redirect ){
    return (<Navigate to="/"/> )
  }
    return(
<div>
            <div className="container" >
             <div className="row justify-content-center" >
              <div className="col-md-6 m-5 p-3" >
                <h1>Login</h1>
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
            <button className="btn btn-outline-primary" > Login </button>
            </form>
              </div>
             </div>
            </div>
        </div>
    )
}
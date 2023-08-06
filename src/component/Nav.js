import { Link, json } from "react-router-dom"
import logo from "../asset/Logo.jpeg"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"



export default  function Nav(){
 const {setuserInfo,userInfo} = useContext(UserContext)
  useEffect(()=>{
    fetch('https://backend-gothbaat.onrender.com/profile',{
      credentials :'include',
    }).then(response =>{
      response.json().then(userInfo=>{
       setuserInfo(userInfo)
      })
    })
  },[])

function logout(){
  fetch('https://backend-gothbaat.onrender.com/logout',{
    credentials:'include',
    method: 'POST'
  })
  setuserInfo(null)
}

const username = userInfo?.username
    return(
        <div className=" d-block">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
      <img src={logo}  className="logo" alt="..."/>
            
          </Link>
          <div>
            {username&&(
              <>
              <Link to={'/create'} className="btn mx-2 btn-outline-primary">create new post</Link>
              <a className="btn btn-dark mx-2" onClick={logout} >Log out</a>
              </>
            )}
            {!username && (
              <>
               <Link to={'/login'} className="btn btn-outline-success" >login</Link>
               <Link to={'/register'} className="btn btn-dark mx-2" >Register</Link>
              </>
            )}
          
          </div>
        </div>
      </nav>
    </div>
    )
}
import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage(){
    const [posts,setposts] = useState([])
    useEffect(()=>{
        fetch('https://backend-gothbaat.onrender.com/Post').then(Response =>{
            Response.json().then(posts =>{
                setposts(posts)
            })
        })
    },[])
    return(
        <>
         {posts.length > 0 && posts.map(posts =>(
            <Post {...posts} />
         ))}
        </>
    )
}
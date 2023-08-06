// import logo from "../asset/Logo.png"

import { Link } from "react-router-dom";


export default function Post({_id,title,summary,cover,content,createdAt,author}){
  const event = new Date();
  const Event = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="row g-0">
              <div className="col-md-4">
                <Link to={`/post/${_id}`}>
                  <img src={`https://backend-gothbaat.onrender.com/${cover}`} className="img-fluid rounded-start" alt="..." />
                </Link>
              </div>
              <div className="col-md-8">
                <div className="card-body text-start">
                  <Link to={`/post/${_id}`} className="text-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" >
                    <h5 className="card-title fw-bold"> {title}</h5>
                  </Link>
                  <p className="card-text text-start me-2">{summary}</p>
                  {author?.username && (
                    <p className="card-text">
                      <small className="text-body-secondary">
                        <b>{author.username}</b> Last updated {Event.toLocaleDateString("hi", options)}{" "}
                        {event.toLocaleTimeString("en-US")}
                      </small>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import 'react-share/style.css';
import logo from "../../asset/Logo.jpeg"
import Pankaj from "../../asset/pankaj.png"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

export default function Postpage() {
  const event = new Date();
  const Event = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const url = window.location.href;

  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";
  return (
    <div class="container ">
  
  <div class="row border mt-2">
    <div class="col-md-8 ">
      <div>{/* top row of edit post and user info */}
         {userInfo.id === postInfo.author._id && (
                <div className="edit-row m-1">
                  <Link
                    className="btn btn-primary d-flex"
                    to={`/edit/${postInfo._id}`}
                  >
                    <div className="me-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square fw-bold"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </div>
                    Edit this post
                  </Link>
                  
                </div>
              )}
              {/* share btnn  */}
              <div className="d-flex justify-content-between my-3 share-btn"  >
              <div>
                <FacebookShareButton url={url} quote={postInfo.title}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
              <div>
                <TwitterShareButton url={url} title={postInfo.title}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
              <div>
                <LinkedinShareButton url={url} title={postInfo.title}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
              <div>
                <WhatsappShareButton url={url} title={postInfo.title}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
              <div>
                <EmailShareButton
                  url={url}
                  subject={postInfo.title}
                  body="Check out this link!"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
            </div>
            {/*  */}
              <p>
                {Event.toLocaleDateString("hi", options)}{" "}
                {event.toLocaleTimeString("en-US")}{" "}
                <b>by @{postInfo.author.username}</b>
              </p>
      </div>
      <div>
      <div
              className="content-box"
              dangerouslySetInnerHTML={{ __html: postInfo.content }}
            />
            
      </div>
    </div>
    
    <div class="col-md-4 ">{/* side wala ad contianer */}
      <div className="ad-box">
      <img className="my-3" src={Pankaj}/>
      <img src={logo}/>

      </div>
    </div>

  </div>
</div>

  );
}

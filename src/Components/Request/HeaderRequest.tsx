import React, { useState } from "react";
import { Layout } from "antd";
import "./request.css";
import { IoIosSettings } from "react-icons/io";
import HelpRequest from "./Help";
import Notification from "./Notification";
import Person from "./Person";
import { Link } from "react-router-dom";
import { AiOutlineEllipsis } from "react-icons/ai";
const { Header } = Layout;

const HeaderRequest = () => {

  const [isVisible, setIsVisible] = useState(false);
  const handleClickMenu = () => {
    setIsVisible(!isVisible)
  }
  return (
    <div>
      <Header
        className="header-request"
      >
        <div
          className={`opus-logo-name ${!isVisible ? 'display-flex' : 'hidden'}`}
        >
          <div className="opus-logo">
            <Link to="/">
              <img
                src="https://o365.vn/wp-content/uploads/logo_w.png"
              />
            </Link>
          </div>
          <Link to="/">
            <div className="company-name"> Opus Solution</div>
          </Link>
          <div className="eOffice"> eOffice </div>

        </div>
        <div
          className={`${isVisible ? 'display-flex' : 'hidden'} right-request`}
        >
          <div className="help-request">
            <HelpRequest />
          </div>
          <div className="notification-request">
            <Notification />
          </div>
          <div className="setting-request">
            <Link to="/setting">
              <IoIosSettings />
            </Link>
          </div>
          <div className="person-request">
            <Person />
          </div>

        </div>
        <div
          className='menu-responsive'
          onClick={handleClickMenu}>
          <i><AiOutlineEllipsis></AiOutlineEllipsis></i>
        </div>
      </Header>
    </div>
  );
};

export default HeaderRequest;

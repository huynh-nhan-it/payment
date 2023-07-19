import { Card } from "antd";
import React from "react";
import { MdOutlineGroups } from "react-icons/md";
import "./setting.css";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Setting = () => {
  const handleClickCard = () => {};
  return (
    <div className="padding-top-64">
      <h2 style={{ padding: " 10px 20px" }} className="display-flex">
        System
      </h2>
      <div className="display-flex">
        <Link to="/setting/system/department">
          <Card
            className="setting-card-content margin-20"
            onClick={handleClickCard}>
            <p>Organization Structure</p>
            <div className="color-black fontsize-60">
              <MdOutlineGroups />
            </div>
          </Card>
        </Link>
        <Link to="/setting/system/employee">
          <Card className="setting-card-content margin-20">
            <p style={{ height: 44 }}>Personnel</p>
            <div className="color-black fontsize-60">
              <BsFillPersonFill />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Setting;

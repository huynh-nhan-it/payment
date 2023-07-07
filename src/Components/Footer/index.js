import React from "react";
import "./Footer.css";
const TopFooter = ({ title, decription }) => {
  return (
    <div className="topfooter">
      <p className="topfooter-title">{title}</p>
      <p className="topfooter-description">{decription}</p>
    </div>
  );
};

export function BottomFooter({ title, decription }) {
  return (
    <div className="bottomfooter">
      <div className="bottomfooter-title">{title}</div>
      <div className="bottomfooter-borderbottom"></div>
      <div
        className="bottomfooter-decription"
        dangerouslySetInnerHTML={{ __html: decription }}
      />
    </div>
  );
}

export default TopFooter;

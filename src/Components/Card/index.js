import { Card, Col, Row } from "antd";
import "./CardContent.css";

function CardContent({className,icon,title, decription }) {
  return (

    <Card
      className="card-content"
      bordered={false}>
        <div className={className}>{icon}</div>
        <div className="border-bottom"></div>
      <p className="type-content-title">{title}</p>
      <p className="type-content-description">{decription}</p>
    </Card>
  );
} 
export default CardContent;

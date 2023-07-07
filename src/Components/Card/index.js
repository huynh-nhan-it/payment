import { Card, Col, Row } from "antd";
import "./CardContent.css";

function CardContent({id,className,icon,title, decription }) {

  const handleClickLink = (id) =>{
    console.log("click",id);
  }
  return (

    <Card
    id={id}
      className="card-content"
      bordered={false}
      onClick={()=>handleClickLink(id)}
      >
        <div className={className}>{icon}</div>
        <div className="border-bottom"></div>
      <p className="type-content-title">{title}</p>
      <p className="type-content-description">{decription}</p>
    </Card>
  );
} 
export default CardContent;

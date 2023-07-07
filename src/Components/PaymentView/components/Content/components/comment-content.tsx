import { Typography } from "antd";
import { CommentOutlined, UploadOutlined } from "@ant-design/icons";
import "../../../css/index.css";
import { useState } from "react";
import type { UploadProps } from "antd";
import ComponentComment from "./comment-component";
import CommentForm from "./comment-form";

const Comment: React.FC = () => {
  const [feedBack, isFeedBack] = useState(false);
  const handleFeedback = (): void => {
    isFeedBack(true);
  }

  const closeFeedBack = (): void => {
    isFeedBack(false);
  }
  return (
    <div className="region-comments">
      <Typography.Title level={2} style={{ textAlign: "left" }}>
        <CommentOutlined style={{ fontSize: "22px", paddingRight: 10 }} />
        <b
          style={{
            fontSize: "22px",
            fontFamily: "initial",
            color: "#434343",
          }}
        >
          Comments
        </b>
      </Typography.Title>
      <div className="comment">
        {feedBack ? '' : <CommentForm></CommentForm>}
        {/* Comment list */}
        <div className="row"></div>
        <div className="row"></div>
        <ComponentComment
          children={[<ComponentComment></ComponentComment>, <ComponentComment></ComponentComment>, <ComponentComment></ComponentComment>]}
          form={<CommentForm isFeedBack={feedBack} handleFeedback={closeFeedBack}></CommentForm>}
          isFeedBack = {feedBack}
          handleFeedback={handleFeedback}
        ></ComponentComment>
      </div>
    </div>
  );
};

export default Comment;

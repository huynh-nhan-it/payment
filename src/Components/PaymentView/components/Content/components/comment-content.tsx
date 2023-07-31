import { Typography } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import "../../../css/index.css";
import React from "react";
import { useState, useEffect } from "react";
import ComponentComment from "./comment-component";
import CommentForm from "./comment-form";
import axios from "axios";
import Spinner from "../../../../common/Loading";

interface IComment {
  requestCode: string | undefined;
  userId: any,
  DetailRequestId: any 
}

interface Comments {
  userModel: UserModel;
  createAt: string | undefined;
  content: string | undefined;
  commentReplyList: [];
}

interface UserModel {
  fullName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  avatar: string | undefined;
  jobTitle: string | undefined;
}

interface feedBack {
  [key: string] : boolean
}

const Comment: React.FC<IComment> = ({ requestCode, userId, DetailRequestId}) => {
  const [isFeedBack, setIsFeedBack] = useState(false);
  const [feedBack, setFeedBack] = useState<feedBack | {}>({});
  const [isLoading, setLoading] = useState(true);
  const [stateForm, setStateForm] = useState<Comments[] | []>([]);
  const [hasFetchedData, setHasFetchedData] = useState(false); 
  
  useEffect(() => {
    if (!hasFetchedData) {
      axios
        .get(`http://localhost:5005/api/Comment/request-code?RequestCode=${requestCode}`)
        .then((response) => {
          setStateForm(response.data);
          setLoading(false);
          const updatedFeedback = response.data.reduce((acc: any, child: any, index: any) => {
            acc[index] = false;
            return acc;
          }, {});
          setFeedBack(updatedFeedback);
          setHasFetchedData(true); // Đánh dấu đã lấy dữ liệu
        })
        .catch((error) => {
          console.error(error);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFetchedData]);
  const handleFeedback = (index: any): void => {
    setIsFeedBack(true);
    const updatedFeedback = { ...feedBack };
    for (const key in updatedFeedback) {
      updatedFeedback[key] = false;
    }
    updatedFeedback[index] = true;
    setFeedBack(updatedFeedback);
  };

  const HandleFetchData = () : void => {
    setHasFetchedData(false);
  }

  const closeFeedBack = (index: any): void => {
    setIsFeedBack(false);
    setFeedBack({
      ...feedBack,
      [index]: false
    });
  };
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
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <div className="comment">
          {isFeedBack ? "" : <CommentForm 
          isFeedBack={undefined}
          handleFeedback={undefined}
          setHasFetchedData = {HandleFetchData}
          index={undefined}
          userId={userId}
          DetailRequestId={DetailRequestId}
           ></CommentForm>}
          {stateForm?.map((child, index) => (
            <React.Fragment key={index}>
                            {/* Comment list */}
              <div className="row"></div>
              <div className="row"></div>
              <ComponentComment
                children={[]}
                form={
                  <CommentForm
                    isFeedBack={feedBack}
                    handleFeedback={closeFeedBack}
                    setHasFetchedData = {HandleFetchData}
                    index={index}
                    userId={userId}
                    DetailRequestId={DetailRequestId}
                  ></CommentForm>
                }
                isFeedBack={feedBack}
                handleFeedback={handleFeedback}
                comment = {child}
                index = {index}
              ></ComponentComment>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;

// [
//   {
//     "userModel": {
//       "fullName": "Robert Anderson",
//       "email": "robert.anderson@example.com",
//       "phoneNumber": "6666666666",
//       "avatar": "",
//       "jobTitle": "Front-end Dev"
//     },
//     "createAt": "2023-07-25T15:08:01.7788388",
//     "content": "Submit the request 2023OPS-PAY-000001 for approval",
//     "commentReplyList": []
//   }
// ]

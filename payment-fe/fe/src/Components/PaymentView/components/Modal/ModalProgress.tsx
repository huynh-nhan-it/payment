import { Avatar, List, Modal, Row, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { IModalProgress } from "../../interface/IModal";
import axios from "axios";
import type { StepsProps } from "antd";
import "./css/style.css";
import Spinner from "../../../common/Loading";
import { IProgress, Iitems } from "../../interface/IProgress";
import { BsCheckCircle, BsHourglassSplit, BsSend } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const ModalProgress: React.FC<IModalProgress> = ({
  isModalOpenProgress,
  handleCancelProgress,
  DetailRequestId,
}) => {
  const [isloading, setIsloading] = useState(true);
  const [Appovers, setApprovers] = useState<IProgress[]>([] as IProgress[]);
  
  useEffect(() => {
    axios
      .get(
        `http://localhost:5005/api/PaymentRequest/Progress?DetailRequestId=${DetailRequestId}`
      )
      .then((res) => {
        let ProgressData = res.data;
        let data: IProgress[] = ProgressData.data;
        let progress = data.map((child: any) => {
          let fullName = child.fullName;
          let email = child.email;
          let jobTitle = child.jobTitle;
          let Avatar = child.Avatar;
          let status = child.status;
          const icon =
            status === "Approved" ? (
              <BsCheckCircle color="#03C988" ></BsCheckCircle>
            ) : status === "Waiting" ? (
              <BsHourglassSplit></BsHourglassSplit>
            ) : status === "Sender" ? (<BsSend color="#03C988"></BsSend>) : status === "Rejected" ? (<IoIosRemoveCircleOutline></IoIosRemoveCircleOutline>) : (
              <IoLocationOutline></IoLocationOutline>
            );
          let items: Iitems = {
            title: status,
            description:
              status === "Approved"
                ? "Approved with this approver"
                : status === "Waiting"
                ? "Waiting with this approver"
                : status === "Rejected" ? "Rejected by this approver" : status === "Sender" ? "Send the progress with this user " : "In progress with this approver",
            icon: icon
            
          };
          return {
            fullName,
            email,
            jobTitle,
            Avatar,
            status,
            icon,
            items: [items],
          };
        });
        setApprovers(progress);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {isloading ? (
        <Spinner />
      ) : (
        <Modal
          centered={true}
          title="Progress"
          open={isModalOpenProgress}
          footer={null}
          bodyStyle={{
            overflowY: "auto",
            maxHeight: "80vh",
            scrollbarWidth: "thin",
            scrollbarColor: "#888888 #f2f2f2",
          }}
          style={{ top: "20px" }}
          onCancel={handleCancelProgress}
        >
          <List
            itemLayout="horizontal"
            dataSource={Appovers}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={(item.Avatar === undefined || item.Avatar === "") ? `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}` : item.Avatar}
                    />
                  }
                  title={<p>{item.fullName}</p>}
                  description={
                    <div style={{ whiteSpace: 'pre-line' }}>
                      {item.email}
                      <br />
                      {item.jobTitle}
                    </div>
                  } 
                />
                <div style={{ height: "10vh", paddingLeft: "4vh"}}>
                  <Row justify={"end"} align={"middle"}>
                    <Steps
                      type="default"
                      direction="horizontal"
                      status={item.items[0].title === 'Approving' ? 'process' : item.items[0].title === 'Waiting' ? 'wait' : item.items[0].title === 'Rejected' ? 'error' : 'finish' as StepsProps["status"]}
                      items={item.items}
                    />
                  </Row>
                </div>
              </List.Item>
            )}
          />
        </Modal>
      )}
    </div>
  );
};

export default ModalProgress;

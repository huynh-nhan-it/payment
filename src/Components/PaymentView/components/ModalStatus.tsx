import { Form, Input as AntdInput, Modal } from "antd";
import { TextAreaRef } from "antd/es/input/TextArea";
import { useRef } from "react";

interface IModalStatus {
  isModalOpen: boolean;
  handleOk?: (value: any, type: any) => void;
  handleCancel?: () => void;
  type: string
}

const ModalStatus: React.FC<IModalStatus> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  type
}) => {
  const Reason = useRef<TextAreaRef | null>(null);
  return (
    <>
      <Modal
        title= {type == "Approved" ? "Approve" : type == "Delete" ?  "Delete": "Reject"} 
        open={isModalOpen}
        onOk={() => {
          handleOk?.(Reason.current, type)
        }}
        onCancel={handleCancel}
      >
          {type == "Delete" ? "Bạn có muốn xóa request này không ?" : <Form.Item rules={[{ required: true }]}>
            <AntdInput.TextArea
              ref={Reason}
              placeholder="Write a reason..."
              rows={4}
              className="form-control"
            />
          </Form.Item>}
      </Modal>
    </>
  );
};

export default ModalStatus;

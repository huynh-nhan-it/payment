import React, { useEffect, useState } from "react";
import "../../../css/index.css";
import { MdOutlineGroups } from "react-icons/md";
import { Affix, Button, Input } from "antd";
import axios from "axios";

const NavbarDepartment = () => {
  const Department = [
    {
      key: "1",
      name: "ITTechnical",
    },
    {
      key: "2",
      name: "OPUS company",
    },
    {
      key: "3",
      name: "Human Resource",
    },
    {
      key: "4",
      name: "Sale",
    },
    {
      key: "5",
      name: "Bán Hàng",
    },
    {
      key: "6",
      name: "Finance",
    },
    {
      key: "7",
      name: "Đào Tạo",
    },
    {
      key: "8",
      name: "Nghiên cứu R&D",
    },
    {
      key: "9",
      name: "Blockchain",
    },
    {
      key: "10",
      name: "WordPress",
    },
    {
      key: "11",
      name: "Cộng tác viên",
    },
    {
      key: "12",
      name: "OPUS Alumni",
    },
    ,
    {
      key: "13",
      name: "Share Point",
    },
    {
      key: "14",
      name: "Hỗ trợ khách hàng",
    },
    {
      key: "15",
      name: "Kiểm thử Testing",
    },
    {
      key: "16",
      name: "Phòng dự án",
    },
    {
      key: "17",
      name: "Phòng tasken",
    },
    {
      key: "18",
      name: "Team Building 2018",
    },
    {
      key: "19",
      name: "UX UI",
    },
    
  ];

  const [dataDepartment, setDataDepartment] = useState([])

  useEffect(() => {
    axios
      .get(
        `http://localhost:5005/api/PaymentRequest/`
      )
      .then((response) => {
        setDataDepartment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const handleTest = () =>{
    console.log("object");
  }
  return (
    <div className="navbar-department">
      <div className="search-department">
      <Input placeholder="Search" />
      </div>
      <div className="scrollable-container">
        <div className="background">
          <Affix target={() => container}>
            <ul>
              {Department.map((dep) => (
                <li onClick={(dep)=>handleTest()} className="department-list" key={dep?.key}>
                  <a className="org-department display-flex color-black" href="#">
                    <span className="org-department-icon">
                      <MdOutlineGroups />
                    </span>
                    <p className="org-department-name">{dep?.name}</p>
                  </a>
                </li>
              ))}
            </ul>
          </Affix>
        </div>
      </div>
    </div>
  );
};

export default NavbarDepartment;

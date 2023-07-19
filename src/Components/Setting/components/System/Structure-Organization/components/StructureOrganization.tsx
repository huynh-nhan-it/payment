import React from "react";
import HeaderOrganize from "./Header/Header";
import NavbarDepartment from "./Content/Navbar";

const StructureOrganization = () => {
  return (
    <div style={{ paddingTop: 64 }}>
      <HeaderOrganize />
      <NavbarDepartment/>
    </div>
  );
};

export default StructureOrganization;

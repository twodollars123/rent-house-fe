// components

// hooks
// import { useState } from "react";

// constants
import AccountsTable from "@widgets/AccountsTable";

const AccountManagement = () => {
  return (
    <>
      <div className="flex flex-col flex-1 gap-5 md:gap-[26px]">
        <div className="w-full widgets-grid grid-cols-1 xl:grid-cols-1"></div>
        <label className="h5 w-fit">Quản lý tài khoản:</label>
        <AccountsTable />
      </div>
    </>
  );
};

export default AccountManagement;

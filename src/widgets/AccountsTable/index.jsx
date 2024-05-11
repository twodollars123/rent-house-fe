// components
import Spring from "@components/Spring";
import StyledTable from "./styles";
import Empty from "@components/Empty";

// hooks
import { useEffect, useState } from "react";

// constants
import { ACCOUNTS_COLUMN_DEFS } from "@constants/columnDefs";

//api
import { getAllAccount } from "@api_services/user.service";

const AccountsTable = () => {
  const [dataListAccount, setDataListAccount] = useState([]);

  const fetchData = async () => {
    let listAccount = await getAllAccount();
    listAccount = listAccount.data.metadata.map((account) => {
      return {
        id: account.user_id,
        user: { name: account.name, avatar: account.avatar },
        address: account.address,
        email: account.email,
        phone_number: account.phone_number,
        status: account.status,
        role: account.user_role,
        createdAt: account.created_at,
        updatedAt: account.updated_at,
      };
    });
    setDataListAccount(listAccount);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Spring className="flex flex-col flex-1 w-full">
      <StyledTable
        columns={ACCOUNTS_COLUMN_DEFS}
        dataSource={dataListAccount}
        pagination={false}
        locale={{
          emptyText: <Empty text="No orders found" />,
        }}
        rowKey={(record) => record.orderNumber}
      />
    </Spring>
  );
};

export default AccountsTable;

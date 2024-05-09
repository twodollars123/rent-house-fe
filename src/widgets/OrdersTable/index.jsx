// components
import Spring from "@components/Spring";
import StyledTable from "./styles";
import Pagination from "@ui/Pagination";
import OrderCollapseItem from "@components/OrderCollapseItem";
import Empty from "@components/Empty";

// hooks
import usePagination from "@hooks/usePagination";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

// constants
import { ORDERS_COLUMN_DEFS } from "@constants/columnDefs";

// data placeholder
import orders from "@db/orders";

const OrdersTable = () => {
  return (
    <Spring className="flex flex-col flex-1 w-full">
      <StyledTable
        columns={ORDERS_COLUMN_DEFS}
        dataSource={orders}
        pagination={false}
        locale={{
          emptyText: <Empty text="No orders found" />,
        }}
        rowKey={(record) => record.orderNumber}
      />
    </Spring>
  );
};

export default OrdersTable;

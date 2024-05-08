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
  //   const { width } = useWindowSize();

  return (
    <Spring className="flex flex-col flex-1 w-full">
      {/* {
                width >= 768 ? */}
      <StyledTable
        columns={ORDERS_COLUMN_DEFS}
        dataSource={orders}
        pagination={false}
        locale={{
          emptyText: <Empty text="No orders found" />,
        }}
        rowKey={(record) => record.orderNumber}
      />
      {/* :
                    <div className="flex flex-1 flex-col gap-5 mb-[26px]">
                        {
                            pagination.currentItems().map(order => (
                                <OrderCollapseItem key={order.sku}
                                                   order={order}
                                                   activeCollapse={activeCollapse}
                                                   handleCollapse={handleCollapse}
                                />
                            ))
                        }
                    </div>
            } */}
      {/* {pagination.maxPage > 1 && <Pagination pagination={pagination} />} */}
    </Spring>
  );
};

export default OrdersTable;

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
//api
import { getHistoryRequest } from "@api_services/order.service";
import { getThumbs } from "@api_services/prod.service";

const OrdersTable = () => {
  const [dataHistoryRequest, setDataHistoryRequest] = useState([]);

  const fetchData = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user_data"));
    let listHistoryRequest = await getHistoryRequest({
      userId: currentUser.shop.user_id,
    });

    listHistoryRequest = listHistoryRequest.data.metadata.map(
      async (request) => {
        if (request.prod_id) {
          const thumbnail = (await getThumbs(request.prod_id)).data.metadata;
          const prod_thumb = thumbnail.length
            ? thumbnail[0]
            : {
                url: "https://res.cloudinary.com/dfbhk6vws/image/upload/v1713454187/rent-house/gn9cpnn1xccvt1uzmob3.jpg",
              };
          const product = {
            url: prod_thumb.url,
            address: request.prod_address,
            price_room: request.price_room,
          };
          return {
            process_id: request.process_id,
            product,
            rented_name: request.rented_name,
            createdAt: request.proc_createdat,
            updatedAt: request.proc_updatedat,
            status: request.process_status_name,
          };
        }
        return request;
      }
    );
    Promise.all(listHistoryRequest).then((values) => {
      console.log("listHistoryReque::", values);
      setDataHistoryRequest(values);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Spring className="flex flex-col flex-1 w-full">
      <StyledTable
        columns={ORDERS_COLUMN_DEFS}
        dataSource={dataHistoryRequest}
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

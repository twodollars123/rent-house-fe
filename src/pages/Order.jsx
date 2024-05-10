// components
import CalendarSelector from "@components/CalendarSelector";
import OrdersTable from "@widgets/OrdersTable";

// hooks
import { useState } from "react";

// constants
import { PRODUCT_CATEGORIES, ORDER_SORT_OPTIONS } from "@constants/options";
import RequestsTable from "@widgets/RequestsTable";

const Orders = () => {
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [sort, setSort] = useState(ORDER_SORT_OPTIONS[0]);

  return (
    <>
      <div className="flex flex-col flex-1 gap-5 md:gap-[26px]">
        <div
          className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[26px] lg:grid-cols-4 lg:items-end
                     xl:grid-cols-6"
        >
          <CalendarSelector
            wrapperClass="lg:max-w-[275px] lg:col-span-2 xl:col-span-4"
            id="ordersPeriodSelector"
            label="Quản lý yêu cầu"
          />
        </div>
        <RequestsTable />
        <div className="w-full widgets-grid grid-cols-1 xl:grid-cols-1"></div>
        <label className="h5 w-fit">Lịch sử:</label>
        <OrdersTable />
      </div>
    </>
  );
};

export default Orders;

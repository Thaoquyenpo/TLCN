import { getAllOrder, deleteOrder } from "./FetchApi";

export const fetchData = async (dispatch) => {
  dispatch({ type: "loading", payload: true });
  let responseData = await getAllOrder();
  setTimeout(() => {
    if (responseData && responseData.Orders) {
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: responseData.Orders,
      });
      dispatch({ type: "loading", payload: false });
    }
  }, 1000);
};

/* call the editmodal & dispatch category context */
export const editOrderReq = (oId, type, status, dispatch) => {
  if (type) {
    console.log("click update");
    dispatch({ type: "updateOrderModalOpen", oId: oId, status: status });
  }
};

export const deleteOrderReq = async (oId, dispatch) => {
  let responseData = await deleteOrder(oId);
  console.log(responseData);
  if (responseData && responseData.success) {
    fetchData(dispatch);
  }
};

/* Filter All Order */
export const filterOrder = async (
  type,
  data,
  dispatch,
  dropdown,
  setDropdown
) => {
  let responseData = await getAllOrder();
  if (responseData && responseData.Orders) {
    let newData;
    if (type === "All") {
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: responseData.Orders,
      });
      setDropdown(!dropdown);
    } else if (type === "Chưa xử lý") {
      newData = responseData.Orders.filter(
        (item) => item.status === "Chưa xử lý"
      );
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Đang xử lý") {
      newData = responseData.Orders.filter(
        (item) => item.status === "Đang xử lý"
      );
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Đang giao hàng") {
      newData = responseData.Orders.filter((item) => item.status === "Đang giao hàng");
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Đã giao hàng") {
      newData = responseData.Orders.filter(
        (item) => item.status === "Đã giao hàng"
      );
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
      setDropdown(!dropdown);
    } else if (type === "Đã hủy") {
      newData = responseData.Orders.filter(
        (item) => item.status === "Đã hủy"
      );
      dispatch({ type: "fetchOrderAndChangeState", payload: newData });
      setDropdown(!dropdown);
    }
  }
};

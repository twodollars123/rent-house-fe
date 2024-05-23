// components
// import PageHeader from "@layout/PageHeader";
import Fade from "@components/Slider/Fade";
// import Spring from "@components/Spring";
// import Switch from "@ui/Switch";
import TruncatedText from "@components/TruncatedText";

import { findProdById, getThumbs } from "@api_services/prod.service";
import { getInfouserById } from "@api_services/user.service";
import {
  addComment,
  getRootCmt,
  getReplyCmt,
} from "@api_services/comments.service";
import { getInvenByProdId } from "@api_services/inventory.service";
import { sendRequest } from "@api_services/order.service";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//assets
// import light from "@assets/logo_light.svg";
// import dark from "@assets/logo_dark.svg";
import house from "@assets/house.png";
// import wallet from "@assets/coins.webp";
import ellipsis from "@assets/icons/ellipsis.svg";
import { getInfoPaymentMethod } from "@api_services/paymentMethod.service";
import { toast } from "react-toastify";
// import MessageItem from "@components/MessageItem";

const DetailPost = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [listThumbs, setListThumbs] = useState([]);
  const [dataAuthor, setDataAuthor] = useState({});
  const [dataCurrentUser, setDataCurrentUser] = useState({});
  const [dataListCmt, setDataListCmt] = useState([]);
  const [dataListRepCmt, setDataListRepCmt] = useState([]);
  const [dataInven, setDataInven] = useState({});
  const [dataPaymentMethod, setDataPaymentMethod] = useState({});

  const [cmtRootValue, setCmtRootValue] = useState("");
  const [cmtReplyValue, setCmtReplyValue] = useState("");
  const [showRepCmtIput, setShowRepCmtInput] = useState(0);
  const [showRepCmt, setShowRepCmt] = useState(0);

  //user login
  const currentUser = JSON.parse(localStorage.getItem("user_data"));
  // console.log("currentUser ::: ", currentUser.shop.user_id);
  const fetchData = async () => {
    const res = await findProdById(id);
    if (res) {
      console.log("res::", res.data.metadata.metadata.prod);
      setData(res.data.metadata.metadata.prod[0]);
      const { author_id } = res.data.metadata.metadata.prod[0];
      if (author_id) {
        const user = await getInfouserById(author_id);
        console.log("user::", user);
        setDataAuthor(user.data.metadata);
      }
    }
  };

  const fetchDataThumbs = async () => {
    const thumbs = await getThumbs(id);
    if (thumbs) {
      console.log("thumbs::", thumbs);
      setListThumbs(thumbs.data.metadata);
    }
  };

  const fetchDataCurrentUser = async () => {
    if (currentUser.shop.user_id) {
      const user = await getInfouserById(currentUser.shop.user_id);
      console.log("user::", user);
      setDataCurrentUser(user.data.metadata);
    }
  };

  const fetchDataCmtRoot = async () => {
    const listCmts = await getRootCmt(id);
    console.log("listCmt", listCmts);
    setDataListCmt(listCmts.data.metadata.listComments);
  };

  const fetchDataInven = async () => {
    const inventory = await getInvenByProdId(id);
    console.log("inventory::::", inventory.data);
    setDataInven(inventory.data.metadata.foundInven);
  };

  const fetchDataPaymentMethod = async () => {
    const paymentMethod = await getInfoPaymentMethod(id);
    console.log("paymentMethod::::", paymentMethod.data);
    setDataPaymentMethod(paymentMethod.data.metadata.info);
  };

  useEffect(() => {
    fetchData();
    fetchDataThumbs();
    fetchDataCurrentUser();
    fetchDataCmtRoot();
    fetchDataInven();
    fetchDataPaymentMethod();
  }, []);

  const handleSendRequest = async () => {
    // console.log("card:::", app);
    // console.log("card author:::", dataAuthor);
    // ownerId, renterId, prodId
    const params = {
      ownerId: data.author_id,
      renterId: currentUser.shop.user_id,
      prodId: data.id,
    };
    const res = await sendRequest(params);
    // console.log("res:::", res);
    if (res.data.status === 201) {
      toast.success(
        `Yêu cầu giữ phòng của bạn đã được gửi tới ${dataAuthor.name}. Vui lòng chờ phản hồi từ chủ phòng.`
      );
    }
  };

  const handlePostCommentRoot = async () => {
    const params = {
      cmt_parentId: null,
      cmt_content: cmtRootValue,
      cmt_prodId: data.id,
      cmt_userId: dataCurrentUser.user_id,
    };
    const createdCmt = await addComment(params);
    if (createdCmt && createdCmt.data.status === 201) {
      setCmtRootValue("");
      fetchDataCmtRoot();
    }
    console.log("createdCmt:::", createdCmt);
  };

  const handlePostCommentReply = async (parent) => {
    const params = {
      cmt_parentId: parent.cmt_id,
      cmt_content: cmtReplyValue,
      cmt_prodId: data.id,
      cmt_userId: dataCurrentUser.user_id,
    };
    const createdCmt = await addComment(params);
    if (createdCmt && createdCmt.data.status === 201) {
      setCmtReplyValue("");
      // fetchDataCmtRoot();
    }
    console.log("createdCmtreply:::", createdCmt);
  };

  const handlerShowRepCmt = async (cmt) => {
    const listRepCmt = await getReplyCmt(cmt.cmt_id);
    console.log("list reply cmt::", listRepCmt.data.metadata.listReplyCmts);
    setDataListRepCmt(listRepCmt.data.metadata.listReplyCmts);
    setShowRepCmt(cmt.cmt_id);
    setShowRepCmtInput(0);
  };

  return (
    <div className="flex shink h-[80vh]">
      <div className="w-9/12 h-full">
        <Fade listThumbs={listThumbs} />
      </div>
      <div
        className="w-3/12 flex flex-col pt-3 px-3 relative overflow-auto"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        {/* header */}
        <div className="flex flex-row justify-between items-center">
          {/* avartar-nameUser-createdPost */}
          <div className="flex flex-row gap-2 items-center">
            <img
              className="h-9 w-9 rounded-full overflow-hidden"
              src={dataAuthor.avatar ?? house}
              alt={""}
            />
            <div className="flex flex-col">
              <p className="max-w-[400px] w-full leading-[1.4] user-name">
                <TruncatedText text={dataAuthor.name} width={240} lines={1} />
              </p>
              <p>
                <TruncatedText
                  text={"vua xong"}
                  width={"200"}
                  lines={1}
                  className="h-1"
                />
              </p>
            </div>
          </div>

          {/* action */}
          <div className="flex">
            <img src={ellipsis} alt="more" className="h-6 w-auto" />
          </div>
        </div>
        {/* content and comment */}
        <div className="flex flex-col gap-4">
          <p className="content-post">{data.caption}</p>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <p>Địa chỉ: {data.address}</p>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <p>Thiết bị: </p>
            <div className="grid grid-cols-2 grid-rows-2 gap-y-4 gap-x-2">
              <div className="flex gap-2">
                <label className="field-label min-w-[80px]" htmlFor="bed">
                  Giường
                </label>
                <input
                  type="checkbox"
                  id="bed"
                  checked={data.bed}
                  disabled="true"
                />
              </div>
              <div className="flex gap-2">
                <label className="field-label min-w-[100px]" htmlFor="wardrobe">
                  Tủ quần áo
                </label>
                <input
                  type="checkbox"
                  id="wardrobe"
                  checked={data.wardrobe}
                  disabled="true"
                />
              </div>
              <div className="flex gap-2">
                <label className="field-label min-w-[80px]" htmlFor="kitchen">
                  Bàn bếp
                </label>
                <input
                  type="checkbox"
                  id="kitchen"
                  checked={data.kitchen}
                  disabled="true"
                />
              </div>
              <div className="flex gap-2">
                <label
                  className="field-label min-w-[100px]"
                  htmlFor="closed_toilet"
                >
                  Vệ sinh khép kín
                </label>
                <input
                  type="checkbox"
                  id="closed_toilet"
                  checked={data.closed_toilet}
                  disabled="true"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <p>Chỗ để xe: {data.parking}</p>
            <p>Điện : {data.electricity_price}</p>
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <p>Nước: {data.water_price}</p>
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <p>Giá phòng: {data.romm_price}</p>
            <p>Số phòng có sẵn : {dataInven.in_stock_quantity}</p>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2">
            <p>Hình thức thanh toán: {dataPaymentMethod.mp_name}</p>
          </div>
        </div>
        {/* them gach duoi */}
        <hr class="h-px mt-4 border-0" style={{ background: "#fff" }}></hr>
        {/* action  */}
        <div className="flex justify-around h-8 pt-4">
          <div className="text-btn cursor-pointer">Thích</div>
          <div className="text-btn cursor-pointer" onClick={handleSendRequest}>
            Giữ phòng
          </div>
        </div>
        <hr class="h-px mt-4 border-0" style={{ background: "#fff" }}></hr>
        {/* comments */}

        <div className="flex flex-col gap-4">
          <TruncatedText text={"Bình luận liên quan"} width={180} lines={1} />
          {dataListCmt &&
            dataListCmt.length > 0 &&
            dataListCmt.map((cmt, index) => {
              return (
                <div className="flex flex-col gap-4" key={index}>
                  <div className="flex gap-4">
                    <img
                      className="h-9 w-9 rounded-full"
                      src={cmt.avatar ?? house}
                      alt={""}
                    />
                    <div
                      style={{ background: "#fff" }}
                      className="flex flex-col w-full justify-between px-2 gap-2 rounded-lg overflow-hidden"
                    >
                      <TruncatedText
                        text={cmt.cmt_content}
                        width={220}
                        lines={1}
                      />
                      <div className="flex justify-around h-4">
                        <div
                          className="text-btn cursor-pointer text-sm"
                          onClick={() => handlerShowRepCmt(cmt)}
                        >
                          Xem phản hồi
                        </div>
                        <div
                          className="text-btn cursor-pointer text-sm"
                          onClick={() => {
                            setShowRepCmt(0);
                            setShowRepCmtInput(cmt.cmt_id);
                          }}
                        >
                          Phản hồi
                        </div>
                      </div>
                    </div>
                  </div>

                  {showRepCmtIput === cmt.cmt_id && (
                    <div
                      className="flex gap-4 ml-12"
                      style={{ background: "#f1f1f1" }}
                    >
                      <img
                        className="h-9 w-9 rounded-full"
                        src={dataCurrentUser.avatar ?? house}
                        alt={""}
                      />
                      <div
                        style={{ background: "#fff" }}
                        className="flex shink w-full justify-between px-2 gap-2 h-[80px] rounded-lg overflow-hidden"
                      >
                        <textarea
                          type="text"
                          className="border-none outline-none shink w-full"
                          placeholder="Viết bình luận..."
                          value={cmtReplyValue}
                          onChange={(e) => setCmtReplyValue(e.target.value)}
                        />
                        <div
                          className="text-btn cursor-pointer w-[10px]"
                          onClick={() => handlePostCommentReply(cmt)}
                        >
                          Gửi
                        </div>
                      </div>
                    </div>
                  )}

                  {showRepCmt === cmt.cmt_id &&
                    dataListRepCmt.length > 0 &&
                    dataListRepCmt.map((repCmt, index) => {
                      return (
                        <div className="flex flex-col gap-4 ml-12" key={index}>
                          <div className="flex gap-4">
                            <img
                              className="h-9 w-9 rounded-full"
                              src={repCmt.avatar ?? house}
                              alt={""}
                            />
                            <div
                              style={{ background: "#fff" }}
                              className="flex flex-col w-full justify-between px-2 gap-2 rounded-lg overflow-hidden"
                            >
                              <TruncatedText
                                text={
                                  "@" + repCmt.name + " " + repCmt.cmt_content
                                }
                                width={180}
                                lines={1}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          <div
            className="flex gap-4 sticky bottom-0"
            style={{ background: "#f1f1f1" }}
          >
            <img
              className="h-9 w-9 rounded-full"
              src={dataCurrentUser.avatar ?? house}
              alt={""}
            />
            <div
              style={{ background: "#fff" }}
              className="flex shink w-full justify-between px-2 gap-2 h-[80px] rounded-lg overflow-hidden"
            >
              <textarea
                type="text"
                className="border-none outline-none shink w-full"
                placeholder="Viết bình luận..."
                value={cmtRootValue}
                onChange={(e) => setCmtRootValue(e.target.value)}
              />
              <div
                className="text-btn cursor-pointer w-[10px]"
                onClick={handlePostCommentRoot}
              >
                Gửi
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;

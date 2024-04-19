// components
import PageHeader from "@layout/PageHeader";
import Fade from "@components/Slider/Fade";
import Spring from "@components/Spring";
import Switch from "@ui/Switch";
import TruncatedText from "@components/TruncatedText";

import { findProdById, getThumbs } from "@api_services/prod.service";
import { getInfouserById } from "@api_services/user.service";
import {
  addComment,
  getRootCmt,
  getReplyCmt,
} from "@api_services/comments.service";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//assets
import light from "@assets/logo_light.svg";
import dark from "@assets/logo_dark.svg";
import house from "@assets/house.png";
import wallet from "@assets/coins.webp";
import ellipsis from "@assets/icons/ellipsis.svg";
import MessageItem from "@components/MessageItem";

const DetailPost = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [listThumbs, setListThumbs] = useState([]);
  const [dataAuthor, setDataAuthor] = useState({});
  const [dataCurrentUser, setDataCurrentUser] = useState({});
  const [dataListCmt, setDataListCmt] = useState([]);
  const [dataListRepCmt, setDataListRepCmt] = useState([]);

  const [cmtRootValue, setCmtRootValue] = useState("");
  const [cmtReplyValue, setCmtReplyValue] = useState("");
  const [showRepCmtIput, setShowRepCmtInput] = useState(0);
  const [showRepCmt, setShowRepCmt] = useState(0);

  //user login
  const currentUser = JSON.parse(localStorage.getItem("user_data"));
  console.log("currentUser ::: ", currentUser.shop.user_id);
  const fetchData = async () => {
    const res = await findProdById(id);
    if (res) {
      console.log("res::", res.data.metadata.metadata.prod);
      setData(res.data.metadata.metadata.prod[0]);
    }
  };

  const fetchDataThumbs = async () => {
    const thumbs = await getThumbs(id);
    if (thumbs) {
      console.log("thumbs::", thumbs);
      setListThumbs(thumbs.data.metadata);
    }
  };

  const fetchDataAuthor = async () => {
    if (data.author_id) {
      const user = await getInfouserById(data.author_id);
      console.log("user::", user);
      setDataAuthor(user.data.metadata);
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

  useEffect(() => {
    fetchData();
    fetchDataThumbs();
    fetchDataAuthor();
    fetchDataCurrentUser();
    fetchDataCmtRoot();
  }, []);

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
              className="h-9 w-auto rounded-full"
              src={dataAuthor.avatar == null ? house : dataAuthor.avata}
              alt={""}
            />
            <div className="flex flex-col">
              <p className="max-w-[400px] w-full leading-[1.4] user-name">
                <TruncatedText text={dataAuthor.name} width={180} lines={1} />
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
        </div>
        {/* them gach duoi */}
        <hr class="h-px mt-4 border-0" style={{ background: "#fff" }}></hr>
        {/* action  */}
        <div className="flex justify-around h-8 pt-4">
          <div className="text-btn cursor-pointer">Thich 100N</div>
          <div className="text-btn cursor-pointer">Dat coc</div>
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
                      className="h-9 w-auto rounded-full"
                      src={dataAuthor.avatar == null ? house : dataAuthor.avata}
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
                        className="h-9 w-auto rounded-full"
                        src={
                          dataCurrentUser.avatar == null
                            ? house
                            : dataAuthor.avatar
                        }
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
                              className="h-9 w-auto rounded-full"
                              src={
                                repCmt.avatar == null ? house : repCmt.avatar
                              }
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
              className="h-9 w-auto rounded-full"
              src={dataCurrentUser.avatar == null ? house : dataAuthor.avatar}
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

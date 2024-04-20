// components
import Search from "@ui/Search";
import Headroom from "react-headroom";
import NotificationsPanel from "@components/NotificationsPanel";
import MessagesPanel from "@components/MessagesPanel";
import ModalBase from "@ui/ModalBase";

// hooks
import { useTheme } from "@contexts/themeContext";
import { useSidebar } from "@contexts/sidebarContext";
import { useWindowSize } from "react-use";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@hooks/useDebounce";

import Logo from "@components/Logo";

const AppBar = () => {
  const navigate = useNavigate();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [messagesPanelOpen, setMessagesPanelOpen] = useState(false);
  const [query, setQuery] = useState("");

  // const debounced = useDebounce(query, 500);

  const { width } = useWindowSize();
  const { theme, toggleTheme } = useTheme();

  // const fetchApi = async (q, limit, type) => {
  //   const res = await search(q, limit, type);
  //   if (!!res) {
  //     console.log(res);
  //     setResultSearch(res.data);
  //     setIsLoading(false);
  //   } else {
  //     setResultSearch([]);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (!debounced.trim()) {
  //     setResultSearch([]);
  //     return;
  //   }
  //   setIsLoading(true);
  //   fetchApi(debounced);
  // }, [debounced]);

  useEffect(() => {
    setSearchModalOpen(false);
  }, [width]);

  return (
    <>
      <Headroom style={{ zIndex: 999 }}>
        <div className="flex items-center justify-between">
          <Logo />
          {width >= 768 && (
            <div
              className={`relative flex-1 max-w-[1054px] ml-5 mr-auto 4xl:ml-0`}
            >
              <input
                className="field-input !pr-[60px]"
                type="search"
                placeholder={"Search..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className={`field-btn text-red !right-[40px] transition ${
                  query ? "opacity-100" : "opacity-0"
                }`}
                onClick={() => setQuery("")}
                aria-label="Clear all"
              >
                <i className="icon-xmark-regular" />
              </button>
              <button
                className="field-btn icon"
                aria-label="Search"
                onClick={() => navigate("/search", { state: query })}
              >
                <i className="icon-magnifying-glass-solid" />
              </button>
            </div>
          )}
          <div className="flex items-center gap-5 md:ml-5 xl:gap-[26px]">
            {width < 768 && (
              <button
                className="text-[20px] leading-none text-gray dark:text-gray-red xl:text-2xl"
                aria-label="Open search"
                onClick={() => setSearchModalOpen(true)}
              >
                <i className="icon-magnifying-glass-solid" />
              </button>
            )}
            <button
              className="text-2xl leading-none text-gray dark:text-gray-red"
              aria-label="Change theme"
              onClick={toggleTheme}
            >
              <i
                className={`icon-${
                  theme === "light" ? "sun-bright" : "moon"
                }-regular`}
              />
            </button>
            <div className="relative h-fit mt-1.5 xl:self-end xl:mt-0 xl:mr-1.5">
              <button
                className="text-lg leading-none text-gray dark:text-gray-red xl:text-[20px]"
                onClick={() => setNotificationsPanelOpen(true)}
                aria-label="Notifications"
              >
                <i className="icon-bell-solid" />
              </button>
              <span
                className="absolute w-3 h-3 rounded-full bg-red -top-1.5 -right-1.5 border-[2px] border-body
                                  xl:w-6 xl:h-6 xl:-top-5 xl:-right-4 xl:flex xl:items-center xl:justify-center"
              >
                <span className="hidden text-xs font-bold text-white dark:text-[#00193B] xl:block">
                  7
                </span>
              </span>
            </div>
            <div className="relative h-fit mt-1.5 xl:self-end xl:mt-0 xl:mr-1.5">
              <button
                className="text-lg leading-none text-gray dark:text-gray-red xl:text-[20px]"
                onClick={() => setMessagesPanelOpen(true)}
                aria-label="Messages"
              >
                <i className="icon-message-solid" />
              </button>
              <span
                className="absolute w-3 h-3 rounded-full bg-green -top-1.5 -right-1.5 border-[2px] border-body
                                  xl:w-6 xl:h-6 xl:-top-5 xl:-right-4 xl:flex xl:items-center xl:justify-center"
              >
                <span className="hidden text-xs font-bold text-white dark:text-[#00193B] xl:block">
                  2
                </span>
              </span>
            </div>
            <div className="relative">
              <button
                className="h-8 w-8 rounded-full bg-accent text-widget text-sm flex items-center
                                    justify-center relative xl:w-11 xl:h-11 xl:text-lg"
                onClick={() => navigate("/general-settings")}
                aria-label="Account menu"
              >
                <i className="icon-user-solid" />
              </button>
              <span className="badge-online" />
            </div>
          </div>
        </div>
      </Headroom>
      {width < 768 && (
        <ModalBase
          open={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
        >
          <div className="card max-w-[360px] w-full">
            <h3 className="mb-3">Search</h3>
            <Search placeholder="What are you looking for?" />
          </div>
        </ModalBase>
      )}
      <NotificationsPanel
        open={notificationsPanelOpen}
        onOpen={() => setNotificationsPanelOpen(true)}
        onClose={() => setNotificationsPanelOpen(false)}
      />
      <MessagesPanel
        open={messagesPanelOpen}
        onOpen={() => setMessagesPanelOpen(true)}
        onClose={() => setMessagesPanelOpen(false)}
      />
    </>
  );
};

export default AppBar;

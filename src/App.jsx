// GA
import ReactGA from "react-ga4";

// utils
import { lazy, Suspense } from "react";

// styles
import "@styles/index.scss";
import "react-toastify/dist/ReactToastify.min.css";
import ThemeStyles from "@styles/theme";

// fonts
import "@fonts/icomoon/icomoon.woff";

// contexts
import { SidebarProvider } from "@contexts/sidebarContext";
import { ThemeProvider } from "styled-components";

// hooks
import { useTheme } from "@contexts/themeContext";
import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";

// components
import ScrollToTop from "@components/ScrollToTop";
import Loader from "@components/Loader";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Copyright from "@components/Copyright";
import AppBar from "@layout/AppBar";
import Home from "@pages/Home";
// import SidebarV1 from "@layout/Sidebar.v1";

// pages
const Login = lazy(() => import("@pages/Login"));
const Signup = lazy(() => import("@pages/Signup"));
const Banners = lazy(() => import("@pages/Banners"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));
const PostEdit = lazy(() => import("@pages/EditProduct"));
const GeneralSettings = lazy(() => import("@pages/GeneralSettings"));
const DetailPost = lazy(() => import("@pages/DetailPost"));
const SearchPage = lazy(() => import("@pages/SearchPage"));
const OrderPage = lazy(() => import("@pages/Order"));
const AccountPage = lazy(() => import("@pages/AccountManagement"));

const App = () => {
  const { width } = useWindowSize();
  const appRef = useRef(null);
  const { theme } = useTheme();
  const path = useLocation().pathname;
  const withSidebar =
    path !== "/login" && path !== "/404" && path !== "/signup";

  // Google Analytics init
  const gaKey = import.meta.env.VITE_GA;
  gaKey && ReactGA.initialize(gaKey);

  useEffect(() => {
    appRef.current && appRef.current.scrollTo(0, 0);
  }, []);

  return (
    <SidebarProvider>
      <ThemeProvider theme={{ theme: theme }}>
        <ThemeStyles />
        <ToastContainer
          theme={theme}
          autoClose={2000}
          style={{ padding: "20px" }}
        />
        {width < 1280 && withSidebar && <AppBar />}
        <div className={`app ${!withSidebar ? "fluid" : ""}`} ref={appRef}>
          <ScrollToTop />
          <div className="app_content">
            {width >= 1280 && withSidebar && <AppBar />}
            <Suspense fallback={<Loader />}>
              <div className="main">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/post-editor" element={<PostEdit />} />
                  <Route path="/orders" element={<OrderPage />} />
                  <Route path="/accounts" element={<AccountPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/detail-post/:id" element={<DetailPost />} />
                  <Route
                    path="general-settings"
                    element={<GeneralSettings />}
                  />
                  <Route path="banners" element={<Banners />} />
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<Navigate to="/404" />} />
                  <Route path="/404" element={<PageNotFound />} />
                </Routes>
              </div>
              {withSidebar && <Copyright />}
            </Suspense>
          </div>
        </div>
      </ThemeProvider>
    </SidebarProvider>
  );
};

export default App;

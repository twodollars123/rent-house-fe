// styled components
import "./sidebar.scss";
// components
import Logo from "@components/Logo";
import { NavLink } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import { Fragment } from "react";

import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";

import { getDataCurrentuser } from "@utils/helpers";

// constants
import PRIVATEROUTES from "@constants/routes.v2";
import PUBLICPOUTES from "@constants/publicRoutes";
const { shop } = getDataCurrentuser();
const { user_role } = shop;
const ROUTES = user_role === 3 ? PUBLICPOUTES : PRIVATEROUTES;
const Sidebar = () => {
  const { width } = useWindowSize();
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    window.addEventListener("resize", () => {
      setActive("");
    });

    return () => {
      window.removeEventListener("resize", () => {
        setActive("");
      });
    };
  }, []);

  return (
    <div className="wrapper">
      <nav className="menu">
        {ROUTES.map((route, index) => {
          return (
            <Fragment key={route.name}>
              {route.links && (
                <>
                  <div>
                    <div
                      className={`menu_item ${
                        active === route.name ? "active" : ""
                      }`}
                      onClick={() =>
                        setActive(active === route.name ? "" : route.name)
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <i className={`icon icon-${route.icon}`} />
                        <span className="text">{route.name}</span>
                      </div>
                      <button
                        className="xl:hidden 4xl:block"
                        aria-label="Toggle submenu"
                      >
                        <i className="icon icon-caret-right-solid" />
                      </button>
                    </div>
                    <Collapse
                      in={active === route.name}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div className="submenu flex flex-col gap-2.5">
                        {route.links.map((link) => {
                          return (
                            <NavLink
                              className="submenu_item menu_item"
                              to={link.path}
                              key={link.name}
                            >
                              <span className="flex items-center gap-2.5">
                                <i className="icon icon-circle-solid" />
                                <span>{link.name}</span>
                              </span>
                            </NavLink>
                          );
                        })}
                      </div>
                    </Collapse>
                  </div>
                  {index === ROUTES.length - 2 && (
                    <span className="menu_divider" />
                  )}
                </>
              )}
              {!route.links && (
                <>
                  <NavLink className="menu_item" to={route.path}>
                    <div className="flex items-center gap-2.5">
                      <i className={`icon icon-${route.icon}`} />
                      <span className="text">{route.name}</span>
                    </div>
                    {route.qty && (
                      <span className="badge rounded bg-green xl:hidden">
                        {route.qty}
                      </span>
                    )}
                  </NavLink>
                  {index === ROUTES.length - 2 && (
                    <span className="menu_divider" />
                  )}
                </>
              )}
            </Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

import React, { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ links, hideSideBar }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logoutUser, user } = useAppContext();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/auth");
    }
  }, [isAuthenticated, user]);
  return (
    <div className="flex ">
      {/* side bar */}

      {/* main view */}
      <div className="w-full">
        {/* nav */}
        <div className="h-[5.5rem] flex justify-between py-2 items-center px-[5%]">
          <div className="w-[8rem]">
            {" "}
            <img
              className=" object-contain"
              src="https://logos-world.net/wp-content/uploads/2021/02/Simple-Logo.png"
              alt=""
            />
          </div>
          <h1 className="text-[2rem] capitalize">{user?.name} Panel</h1>

          <div className="flex items-center gap-[20%]">
            <ul className="flex items-center gap-4">
              {links.map((obj) => {
                return (
                  <li key={obj.text}>
                    {" "}
                    <NavLink
                      end={obj.to === "/"}
                      className={({ isActive }) =>
                        isActive
                          ? " text-[#fd79a8] transform translate-x-20"
                          : ""
                      }
                      to={obj.to}
                    >
                      {obj.text}{" "}
                    </NavLink>{" "}
                  </li>
                );
              })}
            </ul>
            <button
              onClick={logoutUser}
              className=" text-white bg-[#020205] font-medium rounded-md text-sm w-full sm:w-auto block px-5 py-2.5 text-center"
            >
              Logout
            </button>
          </div>
        </div>
        {/* view */}
        <div className="h-calc(100vh - 5.5rem)">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

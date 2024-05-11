// components
import Spring from "@components/Spring";
import { NavLink } from "react-router-dom";
import PasswordInput from "@components/PasswordInput";
import { toast } from "react-toastify";

// hooks
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@contexts/themeContext";

// utils
import classNames from "classnames";

const UserProfileDetails = (data) => {
  const { theme, toggleTheme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: data.data.name,
      email: data.data.email,
      phone_number: data.data.phone_number,
      password: "123456",
      address: data.data.address,
    },
  });

  // do something with the data
  const onSubmit = (info) => {
    console.log(info);
    let params = {};
    if (info.name !== data.data.name) params.name = info.name;
    if (info.email !== data.data.email) params.email = info.email;
    if (info.phone_number !== data.data.phone_number)
      params.phone_number = info.phone_number;
    if (info.password !== data.data.password) params.password = info.password;
    if (info.address !== data.data.address) params.address = info.address;
    console.log("params", params);
    toast.success("Profile updated successfully");
  };

  return (
    <Spring
      className="card flex flex-col gap-[30px] md:gap-12 md:row-start-2 md:col-span-2 md:!pb-[50px]
                xl:row-start-1 xl:col-start-2 xl:col-span-1"
    >
      <div className="flex flex-col gap-5">
        <h5>My Profile Details</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <div className="grid gap-4">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="firstName">
                  Full Name
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.name,
                  })}
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  defaultValue={data.data.name}
                  {...register("name")}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="email">
                  Email
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.email,
                  })}
                  type="text"
                  id="email"
                  placeholder="Email"
                  defaultValue={data.data.email}
                  {...register("email", {
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>

              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value, ref } }) => (
                  <PasswordInput
                    id="profilePassword"
                    innerRef={ref}
                    value={value}
                    isInvalid={errors.password}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <div className="grid gap-4">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="email">
                  Phone number
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.phone_number,
                  })}
                  type="text"
                  id="phone_number"
                  placeholder="Phone number"
                  defaultValue={data.data.phone_number}
                  {...register("phone_number")}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="address">
                  Address
                </label>
                <input
                  className="field-input"
                  type="text"
                  id="address"
                  defaultValue={data.data.address}
                  placeholder="Address"
                  {...register("address")}
                />
              </div>
              <div className="field-wrapper opacity-0">
                <label className="field-label " htmlFor="role">
                  Role
                </label>
                <input
                  className="field-input "
                  type="text"
                  id="role"
                  defaultValue={data.data.user_role === 1 ? "Admin" : "User"}
                  placeholder="Role"
                />
              </div>
            </div>
          </div>
          <div className="mt-2.5">
            <button className="text-btn" type="button">
              Change password
            </button>
            <button
              className="btn btn--primary w-full mt-5 md:w-fit md:px-[70px]"
              type="submit"
            >
              Update information
            </button>
          </div>
        </form>
      </div>
      <div>
        <h5>Admin Panel Tools</h5>
        <div className="grid gap-4 mt-5 md:grid-cols-2 md:gap-y-8 md:gap-x-[50px] md:mt-8 lg:grid-cols-3 lg:max-w-[780px]">
          <NavLink className="tool-btn" to="/connected-apps">
            <span className="icon-wrapper">
              <i className="icon icon-window-solid" />
            </span>
            <span>
              Connected Apps <span className="subheading-2">(12)</span>
            </span>
          </NavLink>
          <NavLink className="tool-btn" to="/connected-apps">
            <span className="icon-wrapper">
              <i
                className="icon icon-money-check-dollar-pen-solid"
                style={{ fontSize: 16 }}
              />
            </span>
            Payment Methods
          </NavLink>
          <NavLink className="tool-btn" to="/connected-apps">
            <span className="icon-wrapper">
              <i className="icon icon-screwdriver-wrench-solid" />
            </span>
            Appearance
          </NavLink>
          <NavLink className="tool-btn" to="/connected-apps">
            <span className="icon-wrapper">
              <i className="icon icon-shield-halved-solid" />
            </span>
            Security Assets
          </NavLink>
          <NavLink className="tool-btn" to="/connected-apps">
            <span className="icon-wrapper">
              <i className="icon icon-sliders-solid" />
            </span>
            Configuration Settings
          </NavLink>
          <button
            className="tool-btn"
            aria-label="Change theme"
            onClick={toggleTheme}
          >
            <span className="icon-wrapper">
              <i
                className={`icon icon-${
                  theme === "light" ? "sun-bright" : "moon"
                }-solid`}
              />
            </span>
            View Mode
          </button>
        </div>
      </div>
    </Spring>
  );
};

export default UserProfileDetails;

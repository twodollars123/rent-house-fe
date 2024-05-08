// components
import Logo from "@components/Logo";
import { toast } from "react-toastify";
import Spring from "@components/Spring";
import PasswordInput from "@components/PasswordInput";

// hooks
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";

// utils
import classNames from "classnames";

// assets
import media from "@assets/house.png";

//api
import { signup } from "@api_services/auth.service";

const SignupLayout = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const newUser = await signup(data);
    console.log("newUser:::", newUser);
    if (newUser.data.metadata.code === 201) {
      toast.success(newUser.data.message);
    } else {
      toast.error(newUser.data.metadata.message);
      return;
    }
    // navigate("/login");
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]">
      {width >= 1024 && (
        <div className="flex flex-col justify-center items-center lg:p-[60px]">
          <Logo imgClass="w-[60px]" textClass="text-[28px]" />
          <p className="text-center tracking-[0.2px] font-semibold text-lg leading-6 max-w-[540px] my-7 mx-auto">
            Chào mừng đến với dịch vụ tìm trọ
          </p>
          <img className="max-w-[780px]" src={media} alt="media" />
        </div>
      )}
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="max-w-[460px] w-full"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <div className="flex flex-col gap-2.5 text-center">
            <h1>Sign up</h1>
          </div>
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="field-wrapper">
                <label htmlFor="email" className="field-label">
                  E-mail
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.email,
                  })}
                  id="email"
                  type="text"
                  placeholder="Your E-mail address"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="name" className="field-label">
                  Name
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.name,
                  })}
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  {...register("name", {
                    required: true,
                  })}
                />
              </div>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PasswordInput
                    id="password"
                    placeholder="Your password"
                    error={errors.password}
                    innerRef={field.ref}
                    isInvalid={errors.password}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex flex-col items-center gap-6 mt-4 mb-10">
              <button className="btn btn--primary w-full">Sign up</button>
            </div>
          </form>
          <div>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-border" />
              <span className="flex items-center justify-center relative z-10 w-11 h-[23px] m-auto bg-widget"></span>
            </div>
            <div className="flex justify-center gap-2.5 leading-none">
              <p>Do you already have an account?</p>
              <button
                className="text-btn"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </button>
            </div>
          </div>
        </Spring>
      </div>
    </div>
  );
};

export default SignupLayout;

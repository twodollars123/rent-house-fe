// components
import Spring from "@components/Spring";
import Select from "@ui/Select";
import RangeDatePicker from "@ui/RangeDatePicker";
import DropFiles from "@components/DropFiles";
import PaymentMethod from "@ui/PaymentMethod";
import { toast } from "react-toastify";
import MediaDropPlaceholder from "@ui/MediaDropPlaceholder";

// hooks
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

// constants
import { PAYMENT_OPTIONS, METHOD_PAYMENTS } from "@constants/options";

// utils
import classNames from "classnames";
import dayjs from "dayjs";

import countryList from "react-select-country-list";
import { City, State } from "country-state-city";

const ProductEditor = () => {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const defaultValues = {
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    productSchedule: [dayjs().startOf("week"), dayjs().endOf("week")],
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  // eslint-disable-next-line no-unused-vars
  const [selectedCountry, setSelectedCountry] = useState();
  // eslint-disable-next-line no-unused-vars
  const [selectedCity, setSelectedCity] = useState();
  // eslint-disable-next-line no-unused-vars
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [cities, setCities] = useState([]);
  const [districts, setDistrict] = useState([]);

  const getCountriesOptions = () => {
    let countries = countryList().getData();
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].value === "RU") {
        countries[i].label = "Russia [terrorist state]";
      }
    }
    return countries;
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    let options = [];
    const rawData = City.getCitiesOfCountry(country.value);
    rawData.map((item) => options.push({ value: item.name, label: item.name }));
    setCities(options);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedDistrict(null);
    let options = [];
    const rawData = State.getStatesOfCountry(selectedCountry);
    rawData.map((item) => options.push({ value: item.name, label: item.name }));
    setDistrict(options);
  };
  const [checkedBed, setCheckedBed] = useState(false);
  const [checkedWardrobe, setCheckedWardrobe] = useState(false);
  const [checkedKitchen, setCheckedKitchen] = useState(false);
  const [checkedClosedToilet, setCheckedClosedToilet] = useState(false);

  // do something with the data
  const handlePublish = (data) => {
    const payload = {
      ...data,
      bed: checkedBed ? 1 : 0,
      wardrobe: checkedWardrobe ? 1 : 0,
      kitchen: checkedKitchen ? 1 : 0,
      electricity_price: checkedClosedToilet ? 1 : 0,
      author_id: userData.shop.user_id || 1,
    };
    console.log("payload :::", payload);
    toast.success("Product published successfully");
  };

  return (
    <Spring className="card flex-1 xl:py-10">
      <h5 className="mb-[15px]">Post Settings</h5>
      <form className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10">
        <div>
          <div>
            <span className="block field-label mb-2.5">Post Images</span>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 2xl:grid-cols-[repeat(5,minmax(0,1fr))]">
              <Controller
                name="image1"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DropFiles
                    wrapperClass="media-dropzone 2xl:col-span-2"
                    onChange={(files) => field.onChange(files)}
                  >
                    <MediaDropPlaceholder />
                  </DropFiles>
                )}
              />
              <Controller
                name="image2"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DropFiles
                    wrapperClass="media-dropzone 2xl:col-span-2"
                    onChange={(files) => field.onChange(files)}
                  >
                    <MediaDropPlaceholder />
                  </DropFiles>
                )}
              />
              <div className="grid grid-cols-2 col-span-2 gap-5 2xl:col-span-1 2xl:grid-cols-1">
                <Controller
                  name="image3"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DropFiles
                      wrapperClass="media-dropzone"
                      onChange={(files) => field.onChange(files)}
                    >
                      <MediaDropPlaceholder />
                    </DropFiles>
                  )}
                />
                <Controller
                  name="image4"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <DropFiles
                      wrapperClass="media-dropzone"
                      onChange={(files) => field.onChange(files)}
                    >
                      <MediaDropPlaceholder />
                    </DropFiles>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="description">
                Description
              </label>
              <textarea
                className={classNames(
                  `field-input !h-[160px] !py-[15px] !overflow-y-auto`,
                  { "field-input--error": errors.description }
                )}
                id="description"
                defaultValue={defaultValues.description}
                {...register("description", { required: true })}
              />
            </div>
            <div className="grid grid-cols-1  gap-y-4 gap-x-2 sm:grid-cols-3">
              <div className="field-wrapper">
                <label className="field-label" htmlFor="country">
                  Country
                </label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        options={getCountriesOptions()}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          handleCountryChange(value);
                        }}
                        placeholder="Country"
                        isSearchable={true}
                        innerRef={field.ref}
                      />
                    );
                  }}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="city">
                  City
                </label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        options={cities}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          handleCityChange(value);
                        }}
                        placeholder="City"
                        isSearchable={true}
                        innerRef={field.ref}
                      />
                    );
                  }}
                />
              </div>
              <div className="field-wrapper">
                <label className="field-label" htmlFor="district">
                  District
                </label>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        options={districts}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          setDistrict(value);
                        }}
                        placeholder="District"
                        isSearchable={true}
                        innerRef={field.ref}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="address">
                Address
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.address,
                })}
                id="address"
                placeholder="Enter address"
                {...register("address", { required: true })}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-4 gap-x-2">
          <div className="field-wrapper">
            <label className="field-label">Options</label>
            <div className="grid grid-cols-2 grid-rows-2 gap-y-4 gap-x-2">
              <div className="flex gap-2">
                <label className="field-label min-w-[80px]" htmlFor="bed">
                  Bed
                </label>
                <input
                  type="checkbox"
                  id="bed"
                  checked={checkedBed}
                  onChange={() => setCheckedBed(!checkedBed)}
                />
              </div>
              <div className="flex gap-2">
                <label className="field-label min-w-[80px]" htmlFor="wardrobe">
                  Wardrobe
                </label>
                <input
                  type="checkbox"
                  id="wardrobe"
                  checked={checkedWardrobe}
                  onChange={() => setCheckedWardrobe(!checkedWardrobe)}
                />
              </div>
              <div className="flex gap-2">
                <label className="field-label min-w-[80px]" htmlFor="kitchen">
                  Kitchen
                </label>
                <input
                  type="checkbox"
                  id="kitchen"
                  checked={checkedKitchen}
                  onChange={() => setCheckedKitchen(!checkedKitchen)}
                />
              </div>
              <div className="flex gap-2">
                <label
                  className="field-label min-w-[80px]"
                  htmlFor="closed_toilet"
                >
                  Closed toilet
                </label>
                <input
                  type="checkbox"
                  id="closed_toilet"
                  checked={checkedClosedToilet}
                  onChange={() => setCheckedClosedToilet(!checkedClosedToilet)}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="roomPrice">
                Room Price
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.roomPrice,
                })}
                id="roomPrice"
                defaultValue={defaultValues.roomPrice}
                placeholder="Enter room price"
                {...register("roomPrice", { required: true })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="cleaningFee">
                Cleaning fee
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.cleaningFee,
                })}
                id="cleaningFee"
                defaultValue={defaultValues.cleaningFee}
                placeholder="Enter cleaninng fee"
                {...register("cleaningFee", { required: true })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="electricPrice">
                Electric Price
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.electricPrice,
                })}
                id="electricPrice"
                defaultValue={defaultValues.electricPrice}
                placeholder="Enter electric price"
                {...register("electricPrice", { required: true })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="waterPrice">
                Water Price
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.waterPrice,
                })}
                id="waterPrice"
                defaultValue={defaultValues.waterPrice}
                placeholder="Enter water price"
                {...register("waterPrice", { required: true })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="parking">
                Parking area
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.parking,
                })}
                id="parking"
                defaultValue={defaultValues.parking}
                placeholder="methodPayment"
                {...register("parking", {
                  required: true,
                  pattern: /^[0-9]/,
                })}
              />
            </div>
            <div className="field-wrapper">
              <label className="field-label" htmlFor="maximumMember">
                Maximum member
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.maximumMember,
                })}
                id="maximumMember"
                defaultValue={defaultValues.maximumMember}
                placeholder="5"
                {...register("maximumMember", {
                  required: true,
                  pattern: /^[0-9]/,
                })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="productSchedule">
                Start date
              </label>
              <Controller
                name="productSchedule"
                control={control}
                defaultValue={defaultValues.productSchedule}
                render={({ field }) => (
                  <RangeDatePicker
                    id="productSchedule"
                    innerRef={field.ref}
                    disableFuture={false}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </div>
            {/* <div className="field-wrapper">
              <label className="field-label" htmlFor="promoType">
                Promotion
              </label>
              <Controller
                name="promoType"
                control={control}
                defaultValue={defaultValues.promoType}
                render={({ field }) => (
                  <Select
                    isInvalid={errors.promoType}
                    id="promoType"
                    placeholder="Select promotion"
                    options={PROMOTIONAL_OPTIONS}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  />
                )}
              />
            </div> */}
            <div className="field-wrapper">
              <label className="field-label" htmlFor="availableRooms">
                Amount available rooms
              </label>
              <input
                className={classNames("field-input", {
                  "field-input--error": errors.availableRooms,
                })}
                id="availableRooms"
                defaultValue={defaultValues.availableRooms}
                placeholder="5"
                {...register("availableRooms", {
                  required: true,
                  pattern: /^[0-9]/,
                })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-1">
            <div className="field-wrapper">
              <label className="field-label" htmlFor="methodPayment">
                Method payment
              </label>
              <Controller
                name="methodPayment"
                control={control}
                defaultValue={defaultValues.productType}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    isInvalid={errors.methodPayment}
                    id="methodPayment"
                    placeholder="Select method payment"
                    options={METHOD_PAYMENTS}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>
          <div className="field-wrapper">
            <span className="field-label">Payment Methods</span>
            <div className="flex flex-wrap gap-5">
              {PAYMENT_OPTIONS.map((option, index) => (
                <PaymentMethod key={index} id={option.value} option={option} />
              ))}
              <button
                className="img-wrapper !bg-transparent w-[60px] h-10"
                onClick={(e) => e.preventDefault()}
                aria-label="Add payment methods"
              >
                <i className="icon-plus-regular text-[12px]" />
              </button>
            </div>
          </div>
          <div className="grid gap-2 mt-5 sm:grid-cols-1 sm:mt-10 md:mt-11">
            <button
              className="btn btn--primary"
              onClick={handleSubmit(handlePublish)}
            >
              Publish Post
            </button>
          </div>
        </div>
      </form>
    </Spring>
  );
};

export default ProductEditor;

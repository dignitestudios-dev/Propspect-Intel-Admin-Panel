import { FiEdit2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { useFormik } from "formik";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import { useEffect, useState } from "react";
import { BasicInfoSchema } from "../../schema/athleteFormSchema/athleteSchema";
import { InputField } from "./InputField";
import { Selector } from "./Selector";
import citiesData from "../../static/us";
import { getSchool } from "../../lib/query/queryFn";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../global/Pagination";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MultiSelector } from "./MultiSelect";
import { Emptyimg, Flagus } from "../../assets/export";

export default function BasicInfo({ setSubmit, onNext }) {
  const basicInfo = useAppSelector((s) => s.athleteForm.formData.basicInfo);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  console.log(basicInfo, "basicInfo");
  const { data, isLoading } = useQuery({
    queryKey: ["school", page],
    queryFn: () => getSchool({ page }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
  const initialSelectedSchool =
    basicInfo?.committedCollege && data?.data
      ? data.data.find((s) => s._id === basicInfo.committedCollege)
      : null;

  const [selectedSchool, setSelectedSchool] = useState(
    initialSelectedSchool
      ? {
          id: initialSelectedSchool._id,
          name: initialSelectedSchool.name,
          logo: initialSelectedSchool.logo,
        }
      : null,
  );
  const SchoolId = selectedSchool?.id || "";

  const positions = [
    "Quarterback",
    "Running Back",
    "Wide Receiver",
    "Tight End",
    "Offensive Line",
    "Defensive Line",
    "Linebacker",
    "Defensive Back",
    "Athlete",
    "Specialist",
  ];

  const statuses = [
    "Medical Concern",
    "Academic Concern",
    "Transfer Risk",
    "Off Field Concern",
    "High FB IQ",
    "NIL-Focused Recruitment",
    "Developmental FB IQ",
    "Team Captain",
    "Leader",
    "Top Competitor",
    "Culture Driver",
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: basicInfo?.name || "",
      dob: basicInfo?.dob
        ? new Date(basicInfo.dob).toISOString().split("T")[0]
        : "",
      position: basicInfo?.position || "",
      height: basicInfo?.height || "",
      weight: basicInfo?.weight || "",
      hometown: basicInfo?.hometown || "",
      state: basicInfo?.state || "",
      // email: basicInfo?.email || "",
      phone: basicInfo?.phone || "",
      committedCollege: basicInfo.committedCollege || "",
      status: basicInfo?.status?.map((s) => s.trim()) || [],
      image: basicInfo?.image || null,
      gradYear: basicInfo?.gradYear || "",
      gpa: basicInfo?.gpa || "",
      schoolName: basicInfo?.schoolName || "",
    },
    validationSchema: BasicInfoSchema,
    onSubmit: (values) => {
      dispatch(updateSection({ section: "basicInfo", data: values }));
      onNext();
    },
  });

  useEffect(() => {
    setSubmit(() => formik.submitForm);
  }, [formik.submitForm]);

  const cityStateMap = [];

  Object.entries(citiesData).forEach(([state, cities]) => {
    cities.forEach((city) => {
      cityStateMap.push({ city, state });
    });
  });

  const states = Object.keys(citiesData);
  const filteredCities = formik.values.state
    ? citiesData[formik.values.state] || []
    : cityStateMap.map((item) => item.city);

  useEffect(() => {
    if (basicInfo?.committedCollege && data?.data) {
      const existingSchool = data.data.find(
        (s) => s._id === basicInfo.committedCollege.id,
      );

      if (existingSchool) {
        setSelectedSchool({
          id: existingSchool._id,
          name: existingSchool.name,
          logo: existingSchool.logo,
        });

        if (formik.values.committedCollege !== existingSchool._id) {
          formik.setFieldValue("committedCollege", existingSchool._id);
        }
      }
    }
  }, [basicInfo, data]);

  console.log("formik.errors --- > ", formik.errors);

  return (
    <form onSubmit={formik.handleSubmit} className="min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-1 mb-4">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-2xl font-semibold text-gray-400 border border-gray-100 shadow-inner overflow-hidden">
              {formik.values.image instanceof File ? (
                <img
                  src={URL.createObjectURL(formik.values.image)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : typeof formik.values.image === "string" ? (
                <img
                  src={formik.values.image}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                "U"
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  formik.setFieldValue("image", e.target.files[0]);
                }
              }}
              className="absolute bottom-0 right-0 w-10 h-10 opacity-0 cursor-pointer"
            />

            <button
              type="button"
              className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border border-gray-200 text-blue-400 shadow-sm"
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
            >
              <FiEdit2 size={14} />
            </button>
          </div>
          {/* {formik.touched.image && formik.errors.image && (
            <span className="text-red-500 text-xs text-center mt-1">
              {formik.errors.image}
            </span>
          )} */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <InputField
            label="Athlete Name"
            maxLength={50}
            name="name"
            formik={formik}
          />
          <InputField
            label="Date of Birth"
            name="dob"
            type="date"
            formik={formik}
          />

          <Selector
            label="Select Position"
            name="position"
            options={positions}
            formik={formik}
          />

          <InputField
            label="Height"
            maxLength={6}
            name="height"
            formik={formik}
          />
          <InputField
            label="Weight (Lbs)"
            maxLength={3}
            name="weight"
            formik={formik}
          />
          <div className="flex flex-col gap-1">
            <div className="bg-white rounded-xl px-4 py-3 border border-gray-50">
              <label className="text-xs text-gray-400">State</label>

              <select
                name="state"
                value={formik.values.state}
                onChange={(e) => {
                  const selectedState = e.target.value;
                  formik.setFieldValue("state", selectedState);
                  // If hometown is set and not in the selected state, reset it
                  if (formik.values.hometown) {
                    const cityInState = citiesData[selectedState]?.includes(
                      formik.values.hometown,
                    );
                    if (!cityInState) {
                      formik.setFieldValue("hometown", "");
                    }
                  }
                }}
                onBlur={formik.handleBlur}
                className="w-full outline-none text-sm bg-transparent"
              >
                <option value="">Select State</option>
                {states.map((state, i) => (
                  <option key={i} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {formik.touched.state && formik.errors.state && (
              <span className="text-red-500 text-xs">
                {formik.errors.state}
              </span>
            )}
          </div>
          {/* <div className="flex flex-col gap-1">
            <div className="bg-white rounded-xl px-4 py-3 border border-gray-50">
              <label className="text-xs text-gray-400">Hometown</label>

              <select
                name="hometown"
                value={formik.values.hometown}
                onChange={(e) => {
                  const selectedCity = e.target.value;

                  formik.setFieldValue("hometown", selectedCity);

                  const found = cityStateMap.find(
                    (c) => c.city === selectedCity,
                  );

                  if (found) {
                    formik.setFieldValue("state", found.state);
                  }
                }}
                onBlur={formik.handleBlur}
                className="w-full outline-none text-sm bg-transparent"
              >
                <option value="">Select City</option>
                {filteredCities.map((city, i) => (
                  <option key={i} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {formik.touched.hometown && formik.errors.hometown && (
              <span className="text-red-500 text-xs">
                {formik.errors.hometown}
              </span>
            )}
          </div> */}
          {/* <InputField label="Hometown" name="hometown" formik={formik} /> */}
          {/* <InputField label="Contact Email" name="email" type="email" formik={formik} /> */}

          <div className="flex flex-col gap-1">
            <div className="bg-white rounded-xl px-4 py-6 border border-gray-50 flex items-center gap-2">
              {/* US Flag + Code */}

              <span className="text-xl pr-2">
                <img src={Flagus} alt="US flag" className="w-6 h-4 mr-2" />
              </span>

              <span className="text-sm text-gray-500">+1</span>

              {/* Phone Input */}
              <input
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full outline-none text-sm pl-1"
                placeholder="Enter phone number"
                maxLength={10}
              />
            </div>

            {formik.touched.phone && formik.errors.phone && (
              <span className="text-red-500 text-xs">
                {formik.errors.phone}
              </span>
            )}
          </div>
          <InputField
            label="School Name"
            name="schoolName"
            maxLength={150}
            formik={formik}
          />
          <div className="relative">
            <div className="bg-white rounded-xl px-4 py-3 border border-gray-50">
              <label className="text-xs text-gray-400">Committed College</label>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white p-3  rounded-xl text-sm cursor-pointer flex items-center justify-between"
              >
                <span className="text-gray-700 text-sm">
                  {selectedSchool ? selectedSchool.name : "Select Institution"}
                </span>

                <span className="text-gray-400">
                  <RiArrowDropDownLine size={22} color="black" />
                </span>
              </div>

              {isOpen && (
                <div className="absolute z-50 w-full mt-2 border rounded-xl bg-white shadow-lg max-h-60 overflow-y-auto">
                  {isLoading && (
                    <div className="p-3 space-y-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 animate-pulse"
                        >
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  )}

                  {data?.data?.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No institutions found
                    </div>
                  ) : (
                    data?.data?.map((school) => (
                      <div
                        key={school._id}
                        onClick={() => {
                          setSelectedSchool({
                            id: school._id,
                            name: school.name,
                            logo: school.logo,
                          });

                          formik.setFieldValue("committedCollege", school._id);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50"
                      >
                        <img
                          src={school.logo || Emptyimg}
                          alt={school.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />

                        <span className="text-sm text-gray-700">
                          {school.name}
                        </span>
                      </div>
                    ))
                  )}

                  {data?.data?.length > 0 && (
                    <div className="mb-2">
                      <Pagination
                        pagination={
                          data?.pagination || { currentPage: 1, totalPages: 1 }
                        }
                        onPageChange={(p) => setPage(p)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            {formik.touched.committedCollege &&
              formik.errors.committedCollege && (
                <span className="text-red-500 text-xs">
                  {formik.errors.committedCollege}
                </span>
              )}
          </div>
          <div>
            <div className="bg-white rounded-xl px-4 py-3 border border-gray-50">
              <label className="block text-xs text-gray-400 mb-4">
                Grad Year
              </label>
              <select
                value={formik.values.gradYear}
                name="gradYear"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full outline-none text-sm bg-transparent"
              >
                <option value="">Select</option>
                {Array.from({ length: 5 }, (_, i) => (
                  <option key={i} value={(2027 + i).toString()}>
                    {2027 + i}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.gradYear && formik.errors.gradYear && (
              <span className="text-red-500 text-xs">
                {formik.errors.gradYear}
              </span>
            )}
          </div>
          <InputField label="GPA" name="gpa" formik={formik} type="number" />

          <MultiSelector
            label="Current Status"
            name="status"
            options={statuses}
            formik={formik}
            isMulti={true}
          />
        </div>
      </div>
    </form>
  );
}

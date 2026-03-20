import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { useFormik } from "formik";
import { FiTrash2 } from "react-icons/fi";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import { educationSchema } from "../../schema/athleteFormSchema/athleteSchema";
import { useQuery } from "@tanstack/react-query";
import { getSchool } from "../../lib/query/queryFn";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Pagination from "../global/Pagination";

export default function Education({ setSubmit, onNext }) {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1)
  const [openIndex, setOpenIndex] = useState(null);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["school", page],
    queryFn: () => getSchool({ page }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,

  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data?.pagination?.totalPages) {
      setPage(newPage);
    }
  };

  const educationData = useAppSelector(
    (s) => s.athleteForm.formData.education || []
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      institutions:
        educationData.length > 0
          ? educationData.map((item) => {

            return {
              id: item.id,
              name: item.name || "",
              startYear: item.startYear
                ? new Date(item.startYear).getFullYear().toString()
                : "",
              endYear: item.endYear
                ? new Date(item.endYear).getFullYear().toString()
                : "",
              field: item.field || "",
              gpa: item.gpa || "",
            };
          })
          : [
            { id: "", name: "", startYear: "", endYear: "", field: "", gpa: "" },
          ],
    },
    validationSchema: educationSchema,
    onSubmit: (values) => {

      dispatch(updateSection({ section: "education", data: values.institutions }));
      onNext();
    },
  });

  useEffect(() => setSubmit(() => formik.submitForm), [formik.submitForm]);


  const addInstitution = () => {
    const newInst = { id: Date.now(), name: "", startYear: "", endYear: "", field: "", gpa: "" };
    const newArray = [...formik.values.institutions, newInst];
    formik.setFieldValue("institutions", newArray);
    dispatch(updateSection({ section: "education", data: newArray }));
  };


  const removeInstitution = (index) => {
    if (formik.values.institutions.length <= 1) return;

    const newArray = formik.values.institutions
      .filter((_, i) => i !== index)
      .map(inst => ({
        ...inst,
        startYear: inst.startYear || "",
        endYear: inst.endYear || "",
      }));

    formik.setFieldValue("institutions", newArray);
    dispatch(updateSection({ section: "education", data: newArray }));
  };


  const updateField = (index, field, value) => {
    const newArray = formik.values.institutions.map((inst, i) => {
      if (i === index) {
        if (field === null && typeof value === "object") {

          return { ...inst, ...value };
        } else {
          return { ...inst, [field]: value };
        }
      }
      return inst;
    });
    formik.setFieldValue("institutions", newArray);
    dispatch(updateSection({ section: "education", data: newArray }));
  };
  return (
    <form onSubmit={formik.handleSubmit} className="min-h-screen font-sans max-w-6xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 text-lg">Education</h3>
        <button
          type="button"
          onClick={addInstitution}
          className="px-6 py-2 rounded-xl border-2 border-[#0085CA] text-[#0085CA] font-bold text-sm hover:bg-blue-50 transition-colors"
        >
          Add Institution
        </button>
      </div>

      <div className="space-y-6">
        {formik.values.institutions.map((inst, index) => (
          <div key={inst.id} className="p-6 rounded-2xl border-2 border-gray-200 relative">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-gray-600">Institution {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeInstitution(index)}
                className={`p-2 rounded-lg ${formik.values.institutions.length > 1
                  ? "bg-orange-50 text-orange-500 hover:bg-orange-100"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
                  } transition-colors`}
                disabled={formik.values.institutions.length <= 1}
              >
                <FiTrash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* <div>
                <label className="block text-gray-600 text-sm mb-1">Institution Name</label>
                <input
                  type="text"
                  value={inst.name}
                  onChange={(e) => updateField(index, "name", e.target.value)}
                  placeholder="Enter institution name"
                  className="w-full p-3 border rounded-xl text-sm outline-none"
                />
                {formik.errors.institutions?.[index]?.name && formik.touched.institutions?.[index]?.name && (
                  <span className="text-red-500 text-xs">{formik.errors.institutions[index].name}</span>
                )}
              </div> */}

              <div className="relative ">
                <label className="block text-gray-600 text-sm mb-1">
                  Institution Name
                </label>

                {/* Selected Box */}
                <div
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full bg-white p-3 border rounded-xl text-sm cursor-pointer flex items-center justify-between"
                >
                  <span className="text-gray-700">
                    {inst.name || "Select Institution"}
                  </span>

                  <span className="text-gray-400"><IoIosArrowDropdownCircle /></span>
                </div>


                {openIndex === index && (
                  <div className="absolute z-10 w-full mt-2 border rounded-xl bg-white shadow-lg max-h-60 overflow-y-auto">
                    {isLoading && (
                      <div className="p-3 space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="flex items-center gap-3 animate-pulse">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        ))}
                      </div>
                    )}

                    {data?.data?.map((school) => (
                      <div
                        key={school?._id}
                        onClick={() => {
                          updateField(index, null, { id: school._id, name: school.name });
                          setOpenIndex(null);
                          setPage(1);
                        }}
                        className={`flex items-center  gap-3 p-3 cursor-pointer hover:bg-gray-50 ${inst.id === school._id
                          ? "bg-blue-50"
                          : ""
                          }`}
                      >

                        <img
                          src={school.logo}
                          alt={school.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />

                        <span className="text-sm text-gray-700">
                          {school.name}
                        </span>
                      </div>
                    ))}
                    <div className="mb-2">
                      <Pagination
                        pagination={data?.pagination || { currentPage: 1, totalPages: 1 }}
                        onPageChange={handlePageChange}
                      />

                    </div>
                  </div>
                )}
                {formik.errors.institutions?.[index]?.name && (
                  <span className="text-red-500 text-xs">
                    {formik.errors.institutions[index].name}
                  </span>
                )}

              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Year Started</label>
                <select
                  value={inst.startYear}
                  onChange={(e) => updateField(index, "startYear", e.target.value)}
                  className="w-full p-3 border rounded-xl text-sm outline-none"
                >
                  <option value="">Select</option>
                  {Array.from({ length: 30 }, (_, i) => (
                    <option key={i} value={(1990 + i).toString()}>
                      {1990 + i}
                    </option>
                  ))}
                </select>
                {formik.errors.institutions?.[index]?.startYear && formik.touched.institutions?.[index]?.startYear && (
                  <span className="text-red-500 text-xs">{formik.errors.institutions[index].startYear}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Year Ended</label>
                <select
                  value={inst.endYear}
                  onChange={(e) => updateField(index, "endYear", e.target.value)}
                  className="w-full p-3 border rounded-xl text-sm outline-none"
                >
                  <option value="">Select</option>
                  {Array.from({ length: 30 }, (_, i) => (
                    <option key={i} value={(1990 + i).toString()}>
                      {1990 + i}
                    </option>
                  ))}
                </select>
                {formik.errors.institutions?.[index]?.endYear && formik.touched.institutions?.[index]?.endYear && (
                  <span className="text-red-500 text-xs">{formik.errors.institutions[index].endYear}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Field Of Study</label>
                <input
                  type="text"
                  value={inst.field}
                  onChange={(e) => updateField(index, "field", e.target.value)}
                  placeholder="Enter field of study"
                  className="w-full p-3 border rounded-xl text-sm outline-none"
                />
                {formik.errors.institutions?.[index]?.field && formik.touched.institutions?.[index]?.field && (
                  <span className="text-red-500 text-xs">{formik.errors.institutions[index].field}</span>
                )}
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">GPA</label>
                <input
                  type="number"
                  value={inst.gpa}

                  onChange={(e) => updateField(index, "gpa", e.target.value)}
                  placeholder="Enter GPA"
                  className="w-full p-3 border rounded-xl text-sm outline-none"
                />
                {formik.errors.institutions?.[index]?.gpa && formik.touched.institutions?.[index]?.gpa && (
                  <span className="text-red-500 text-xs">{formik.errors.institutions[index].gpa}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
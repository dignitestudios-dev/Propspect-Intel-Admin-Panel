import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiChevronRight, FiPlus, FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import { familyInfoSchema } from "../../schema/athleteFormSchema/athleteSchema";
import { InputField } from "./InputField";

export default function Family({ onNext, setSubmit }) {

  const [activeTab, setActiveTab] = useState("Family");
  const [siblings, setSiblings] = useState([
    { id: 1, type: "Sister" },
    { id: 2, type: "Brother" },
  ]);
  const familyInfo = useAppSelector((s) => s.athleteForm.formData.familyInfo);
  const dispatch = useAppDispatch();


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      motherName: familyInfo?.motherName || "",
      motherDob: familyInfo?.motherDob || "",
      motherOccupation: familyInfo?.motherOccupation || "",
      motherContact: familyInfo?.motherContact || "",
      fatherName: familyInfo?.fatherName || "",
      keyInfluences: familyInfo?.keyInfluences || "",
      siblings: familyInfo?.siblings || [
        { id: 1, type: "Sister", name: "", dob: "" },
        { id: 2, type: "Brother", name: "", dob: "" },
      ],
    },
    validationSchema: familyInfoSchema,
    onSubmit: (values) => {
      dispatch(updateSection({ section: "familyInfo", data: values }));
      onNext()
    },
  });

  useEffect(() => {
    setSubmit(() => formik.submitForm);
  }, [formik.submitForm]);


  const addSibling = () => {
    setSiblings([...siblings, { id: Date.now(), type: "Brother" }]);
  };

  const removeSibling = (id) => {
    setSiblings(siblings.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen font-sans">

      <div className="rounded-3xl max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
        {activeTab === "Family" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <InputField label="Mother" placeholder="Enter name" name={'motherName'} formik={formik} />
              <InputField label="Date of Birth" placeholder="Age here" name={'motherDob'} formik={formik} />
              <InputField label="Occupation" placeholder="Enter occupation" name={'motherOccupation'} formik={formik} />
              <InputField label="Contact" placeholder="Contact here" name={'motherContact'} formik={formik} />
            </div>

            <div className="w-full md:w-1/2 md:pr-4">
              <InputField label="Father" placeholder="Father Name" name={'fatherName'} formik={formik} />
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-800">Sibling</h3>
              {formik.values.siblings.map((sibling, index) => (
                <div key={sibling.id} className="flex items-end gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 flex-grow">
                    <InputField
                      label={sibling.type}
                      name={`siblings[${index}].name`}
                      placeholder="Enter name"
                      formik={formik}
                    />
                    <InputField
                      label="Date of Birth"
                      name={`siblings[${index}].dob`}
                      placeholder="Age here"
                      formik={formik}
                    />
                  </div>

                  <div className="flex gap-2 mb-1">
                    <button
                      type="button"
                      onClick={() => {
                        const newSiblings = [...formik.values.siblings];
                        newSiblings.splice(index, 1);
                        formik.setFieldValue("siblings", newSiblings);
                      }}
                      className="p-3 rounded-xl border border-gray-100 bg-white text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <FiX size={18} />
                    </button>

                    {index === formik.values.siblings.length - 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          formik.setFieldValue("siblings", [
                            ...formik.values.siblings,
                            { id: Date.now(), type: "Brother", name: "", dob: "" },
                          ])
                        }
                        className="p-3 rounded-xl border border-gray-100 bg-white text-green-500 hover:bg-green-50 transition-colors"
                      >
                        <FiPlus size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label className="font-bold text-gray-800">
                Key Influences (Coach)
              </label>
              <textarea
                name="keyInfluences"
                className="w-full h-32 p-4 bg-white rounded-2xl border border-gray-50 outline-none placeholder:text-gray-300 text-sm shadow-sm"
                placeholder="Coach Quote here"
                value={formik.values.keyInfluences}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.keyInfluences && formik.errors.keyInfluences && (
                <span className="text-red-500 text-xs">{formik.errors.keyInfluences}</span>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


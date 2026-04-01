import { useFormik } from "formik";
import React, { useEffect } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import { familyInfoSchema } from "../../schema/athleteFormSchema/athleteSchema";
import { InputField } from "./InputField";
import { Flagus } from "../../assets/export";

export default function Family({ onNext, setSubmit }) {
  const familyInfo = useAppSelector((s) => s.athleteForm.formData.family);
  const dispatch = useAppDispatch();
  const initialSiblings = React.useMemo(() => {
    if (!familyInfo?.siblings || familyInfo.siblings.length === 0) {
      return [{ id: Date.now(), type: "Sister", name: "", dob: "" }];
    }

    return familyInfo.siblings.map((s) => ({
      id: s.id ?? s.name,             // stable id
      type: s.type || "Sister",
      name: s.name || "",
      dob: s.dob ? s.dob.split("T")[0] : "",  // convert ISO to YYYY-MM-DD
    }));
  }, [familyInfo?.siblings]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      motherName: familyInfo?.motherName || "",
      fatherName: familyInfo?.fatherName || "",
      motherDob: familyInfo?.motherDob ? new Date(familyInfo?.motherDob).toISOString().split("T")[0] : "",
      motherOccupation: familyInfo?.motherOccupation || "",
      motherContact: familyInfo?.motherContact || "",
      fatherDob: familyInfo?.fatherDob ? new Date(familyInfo?.fatherDob).toISOString().split("T")[0] : "",
      fatherOccupation: familyInfo?.fatherOccupation || "",
      fatherContact: familyInfo?.fatherContact || "",
      keyInfluences: familyInfo?.keyInfluences || "",
      siblings: initialSiblings,

    },
    validationSchema: familyInfoSchema,
    onSubmit: (values) => {
      dispatch(updateSection({ section: "family", data: values }));
      onNext()
    },
  });

  useEffect(() => {
    setSubmit(() => formik.submitForm);
  }, []);


  return (
    <div className="min-h-screen font-sans">

      <div className="rounded-3xl max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">

        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <InputField label="Mother" placeholder="Enter name" name={'motherName'} formik={formik} maxLength={50} />
            <InputField label="Date of Birth" max={new Date().toISOString().split("T")[0]} type="date" placeholder="Age here" name={'motherDob'} formik={formik} />
            <InputField label="Occupation" placeholder="Enter occupation" maxLength={50} name={'motherOccupation'} formik={formik} />

            <div >
              <div className="bg-white rounded-xl px-4 py-6 border border-gray-50 flex items-center gap-2">
                {/* US Flag + Code */}

                <span className="text-xl pr-2">
                  <img
                    src={Flagus}
                    alt="US flag"
                    className="w-6 h-4 mr-2"
                  />
                </span>

                <span className="text-sm text-gray-500">+1</span>

                {/* Phone Input */}
                <input
                  name="motherContact"
                  value={formik.values.motherContact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full outline-none text-sm pl-1"
                  placeholder="Enter phone number"
                  maxLength={10}
                />
              </div>
              {formik.touched.motherContact && formik.errors.motherContact && (
                <span className="text-red-500 text-xs">{formik.errors.motherContact}</span>
              )}
            </div>

            {/*             
            <InputField label="Contact" placeholder="Contact here" name={'motherContact'} formik={formik} /> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <InputField label="Father" maxLength={50} placeholder="Father Name" name={'fatherName'} formik={formik} />
            <InputField label="Date of Birth" max={new Date().toISOString().split("T")[0]} type="date" placeholder="Age here" name={'fatherDob'} formik={formik} />
            <InputField label="Occupation" placeholder="Enter occupation" maxLength={50} name={'fatherOccupation'} formik={formik} />

            <div >
              <div className="bg-white rounded-xl px-4 py-6 border border-gray-50 flex items-center gap-2">
                {/* US Flag + Code */}

                <span className="text-xl pr-2">
                  <img
                    src={Flagus}
                    alt="US flag"
                    className="w-6 h-4 mr-2"
                  />
                </span>

                <span className="text-sm text-gray-500">+1</span>

                {/* Phone Input */}
                <input
                  name="fatherContact"
                  value={formik.values.fatherContact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full outline-none text-sm pl-1"
                  placeholder="Enter phone number"
                  maxLength={10}
                />
              </div>
              {formik.touched.fatherContact && formik.errors.fatherContact && (
                <span className="text-red-500 text-xs">{formik.errors.fatherContact}</span>
              )}
            </div>
          </div>


          <div className="space-y-4">
            <h3 className="font-bold text-gray-800">Sibling</h3>
            {formik.values.siblings.map((sibling, index) => (
              <div key={sibling.id} className="flex items-end gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 flex-grow">
                  <div className="flex flex-col gap-1 w-full">
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-50 w-full">
                      <label className="text-xs text-gray-400">Relation</label>
                      <select
                        name={`siblings[${index}].type`}
                        value={formik.values.siblings[index].type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full outline-none text-sm bg-transparent "
                      >
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                      </select>
                    </div>
                    {formik.touched.siblings && formik.errors.siblings && formik.errors.siblings[index] && (
                      <span className="text-red-500 text-xs">
                        {formik.errors.siblings[index].type}
                      </span>
                    )}
                  </div>
                  <div>

                    <InputField
                      label="Name"
                      name={`siblings[${index}].name`}
                      placeholder="Enter name"
                      formik={formik}
                      maxLength={50}
                    />
                    {/* {formik.touched.siblings?.[index]?.name &&
                      formik.errors.siblings?.[index]?.name && (
                        <span className="text-red-500 text-xs">{formik.errors.siblings[index].name}</span>
                      )} */}
                  </div>
                  <div className="h-[20px]">

                    <InputField
                      label="Date of Birth"
                      name={`siblings[${index}].dob`}
                      placeholder="Age here"
                      type="date"
                      formik={formik}
                      max={new Date().toISOString().split("T")[0]}
                    />
                    {/* {formik.touched.siblings?.[index]?.dob &&
                      formik.errors.siblings?.[index]?.dob && (
                        <span className="text-red-500 text-xs">{formik.errors.siblings[index].dob}</span>
                      )} */}
                  </div>
                </div>

                <div className="flex gap-2 mb-1">
                  {formik.values.siblings.length > 1 && (
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
                  )}

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
              maxLength={300}
            />
            {formik.touched.keyInfluences && formik.errors.keyInfluences && (
              <span className="text-red-500 text-xs">{formik.errors.keyInfluences}</span>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}


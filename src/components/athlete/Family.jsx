import { useFormik } from "formik";
import React, { useEffect } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import { familyInfoSchema } from "../../schema/athleteFormSchema/athleteSchema";
import { InputField } from "./InputField";

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
      motherDob: familyInfo?.motherDob ? new Date(familyInfo?.motherDob).toISOString().split("T")[0] : "",
      motherOccupation: familyInfo?.motherOccupation || "",
      motherContact: familyInfo?.motherContact || "",
      fatherName: familyInfo?.fatherName || "",
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
            <InputField label="Mother" placeholder="Enter name" name={'motherName'} formik={formik} />
            <InputField label="Date of Birth" type="date" placeholder="Age here" name={'motherDob'} formik={formik} />
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
                    />
                    {formik.touched.siblings?.[index]?.name &&
                      formik.errors.siblings?.[index]?.name && (
                        <span className="text-red-500 text-xs">{formik.errors.siblings[index].name}</span>
                      )}
                  </div>
                  <div className="h-[20px]">

                    <InputField
                      label="Date of Birth"
                      name={`siblings[${index}].dob`}
                      placeholder="Age here"
                      type="date"
                      formik={formik}
                    />
                    {formik.touched.siblings?.[index]?.dob &&
                      formik.errors.siblings?.[index]?.dob && (
                        <span className="text-red-500 text-xs">{formik.errors.siblings[index].dob}</span>
                      )}
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


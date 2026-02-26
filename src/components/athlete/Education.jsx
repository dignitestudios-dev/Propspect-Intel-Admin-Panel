import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { useFormik } from "formik";
import { FiTrash2 } from "react-icons/fi";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import { educationSchema } from "../../schema/athleteFormSchema/athleteSchema";

export default function Education({ setSubmit, onNext }) {
  const dispatch = useAppDispatch();

  // Get data from redux
  const educationData = useAppSelector(
    (s) => s.athleteForm.formData.education || []
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      institutions:
        educationData.length > 0
          ? educationData.map((item, i) => ({ ...item, id: item.id || i + 1 }))
          : [{ id: 1, name: "", startYear: "", endYear: "", field: "", gpa: "" }],
    },
    validationSchema: educationSchema,
    onSubmit: (values) => {
      dispatch(updateSection({ section: "education", data: values.institutions }));
      onNext();
    },
  });

  useEffect(() => setSubmit(() => formik.submitForm), [formik.submitForm]);

  // Add new institution
  const addInstitution = () => {
    const newInst = { id: Date.now(), name: "", startYear: "", endYear: "", field: "", gpa: "" };
    const newArray = [...formik.values.institutions, newInst];
    formik.setFieldValue("institutions", newArray);
    dispatch(updateSection({ section: "education", data: newArray }));
  };

  // Remove institution
  const removeInstitution = (index) => {
    if (formik.values.institutions.length <= 1) return;
    const newArray = formik.values.institutions.filter((_, i) => i !== index);
    formik.setFieldValue("institutions", newArray);
    dispatch(updateSection({ section: "education", data: newArray }));
  };

  // Update field manually
  const updateField = (index, field, value) => {
    const newArray = [...formik.values.institutions];
    newArray[index][field] = value;
    formik.setFieldValue("institutions", newArray);
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
              <div>
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
                    <option key={i} value={1990 + i}>
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
                    <option key={i} value={1990 + i}>
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
                  type="text"
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
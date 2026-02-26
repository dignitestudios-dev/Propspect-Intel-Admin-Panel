import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { useFormik } from "formik";
import { FiX, FiPlus, FiMoreVertical } from "react-icons/fi";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import { overviewSchema } from "../../schema/athleteFormSchema/athleteSchema";

export default function Overview({ onNext, setSubmit }) {
  const dispatch = useAppDispatch();
  const overviewData = useAppSelector((s) => s.athleteForm.formData.overview);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      strengths: overviewData?.strengths?.length ? overviewData.strengths : [""],
      weaknesses: overviewData?.weaknesses?.length ? overviewData.weaknesses : [""],
    },
    validationSchema: overviewSchema,
    onSubmit: (values) => {
      dispatch(updateSection({ section: "overview", data: values }));
      onNext();
    },
  });


  useEffect(() => {
    setSubmit(() => formik.submitForm);
  }, [formik.submitForm]);

  const addItem = (field) => {
    formik.setFieldValue(field, [...formik.values[field], ""]);
  };

  const removeItem = (field, index) => {
    const newArray = [...formik.values[field]];
    newArray.splice(index, 1);
    formik.setFieldValue(field, newArray);
  };

  const updateItem = (field, index, value) => {
    const newArray = [...formik.values[field]];
    newArray[index] = value;
    formik.setFieldValue(field, newArray);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="min-h-screen font-sans max-w-6xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Overview</h2>


      <section className="bg-white/40 p-6 rounded-2xl border border-white/50 mb-6">
        <h3 className="font-bold text-gray-800 mb-4">Strengths</h3>
        <div className="space-y-3">
          {formik.values.strengths.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-gray-800 font-bold w-4">{index + 1}</span>
              <div className="flex items-center flex-grow bg-white rounded-xl border border-gray-50 shadow-sm px-2">
                <FiMoreVertical className="text-gray-300 cursor-grab" />
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem("strengths", index, e.target.value)}
                  placeholder="Enter strength"
                  className="w-full p-3 outline-none text-sm text-gray-700"
                />
                <div className="text-red-500 text-xs">{formik.errors.strengths?.[index]}</div>
              </div>
              <button
                type="button"
                onClick={() => removeItem("strengths", index)}
                className="p-3 rounded-xl border border-gray-100 bg-white text-orange-500 hover:bg-orange-50 transition-colors"
              >
                <FiX size={18} />
              </button>
              {index === formik.values.strengths.length - 1 && (
                <button
                  type="button"
                  onClick={() => addItem("strengths")}
                  className="p-3 rounded-xl border border-gray-100 bg-white text-emerald-500 hover:bg-emerald-50 transition-colors"
                >
                  <FiPlus size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>


      <section className="bg-white/40 p-6 rounded-2xl border border-white/50">
        <h3 className="font-bold text-gray-800 mb-4">Weaknesses</h3>
        <div className="space-y-3">
          {formik.values.weaknesses.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-gray-800 font-bold w-4">{index + 1}</span>
              <div className="flex items-center flex-grow bg-white rounded-xl border border-gray-50 shadow-sm px-2">
                <FiMoreVertical className="text-gray-300 cursor-grab" />
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem("weaknesses", index, e.target.value)}
                  placeholder="Enter weakness"
                  className="w-full p-3 outline-none text-sm text-gray-700"
                />
                <div className="text-red-500 text-xs">{formik.errors.weaknesses?.[index]}</div>
              </div>
              <button
                type="button"
                onClick={() => removeItem("weaknesses", index)}
                className="p-3 rounded-xl border border-gray-100 bg-white text-orange-500 hover:bg-orange-50 transition-colors"
              >
                <FiX size={18} />
              </button>
              {index === formik.values.weaknesses.length - 1 && (
                <button
                  type="button"
                  onClick={() => addItem("weaknesses")}
                  className="p-3 rounded-xl border border-gray-100 bg-white text-emerald-500 hover:bg-emerald-50 transition-colors"
                >
                  <FiPlus size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </form>
  );
}
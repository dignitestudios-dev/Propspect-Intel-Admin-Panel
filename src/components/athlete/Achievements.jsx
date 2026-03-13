import React, { useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { useFormik } from "formik";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import { achievementInfoSchema } from "../../schema/athleteFormSchema/athleteSchema";

export default function Achievements({ onNext, setSubmit }) {
  const dispatch = useAppDispatch();
  const achievementData = useAppSelector((s) => s.athleteForm.formData.achievements);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      achievements: achievementData.length > 0
        ? achievementData.map((item, i) => ({ ...item, id: item.id || i + 1 })) : [{ title: "", description: "" }],
    },
    validationSchema: achievementInfoSchema,
    onSubmit: (values) => {
      dispatch(updateSection({ section: "achievements", data: values.achievements }));
      onNext();
    },
  });
  useEffect(() => {
    setSubmit(() => formik.submitForm);
  }, [formik.submitForm]);

  const addAchievement = () => {
    const newArray = [...formik.values.achievements, { title: "", description: "" }];
    formik.setFieldValue("achievements", newArray);
    dispatch(updateSection({ section: "achievements", data: newArray }));
  };
  const removeAchievement = (index) => {
    if (formik.values.achievements.length <= 1) return;
    const newArray = [...formik.values.achievements];
    newArray.splice(index, 1);
    formik.setFieldValue("achievements", newArray);
    dispatch(updateSection({ section: "achievements", data: newArray }));
  };

  return (
    <div className="min-h-screen  font-sans">
      <div className=" max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg">Add Achievements</h3>
            <button
              onClick={addAchievement}
              className="px-6 py-2 rounded-xl border-2 border-[#0085CA] text-[#0085CA] font-bold text-sm hover:bg-blue-50 transition-colors"
            >
              Add Achievement
            </button>
          </div>

          <div className="space-y-6">
            {formik.values.achievements.map((ach, index) => (
              <div key={index} className="p-6 rounded-2xl border-2 border-gray-200 relative">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-600">Achievement {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className={`p-2 rounded-lg ${formik.values.achievements.length > 1
                      ? "bg-orange-50 text-orange-500 hover:bg-orange-100"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"
                      } transition-colors`}
                    disabled={formik.values.achievements.length <= 1}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <input
                  name={`achievements[${index}].title`}
                  value={ach.title}
                  onChange={formik.handleChange}
                  placeholder="Enter Achievement Name"
                  className="w-full p-3 border rounded-xl text-sm mb-2"
                />
                {formik.errors.achievements?.[index]?.title && formik.touched.achievements?.[index]?.title && (
                  <span className="text-red-500 text-xs">{formik.errors.achievements[index].title}</span>
                )}
                <textarea
                  name={`achievements[${index}].description`}
                  value={ach.description}
                  onChange={formik.handleChange}
                  placeholder="Description"
                  className="w-full h-32 p-4 outline-none text-sm text-gray-700 placeholder:text-gray-300 resize-none rounded-xl border"
                />
                {formik.errors.achievements?.[index]?.description && formik.touched.achievements?.[index]?.description && (
                  <span className="text-red-500 text-xs">{formik.errors.achievements[index].description}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


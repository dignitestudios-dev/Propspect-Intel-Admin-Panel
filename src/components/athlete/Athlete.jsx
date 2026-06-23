import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { useFormik } from "formik";
import { athleteInfoSchema } from "../../schema/athleteFormSchema/athleteSchema";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import { InputField } from "./InputField";

export default function Athlete({ setSubmit, onNext }) {
  const athleteInfo = useAppSelector((s) => s.athleteForm.formData.athlete);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      otherSports: athleteInfo?.otherSports || "",
      activities: athleteInfo?.activities || "",
      coachEvaluation: athleteInfo?.coachEvaluation || "",
      footballPiScore: athleteInfo?.footballPiScore || "",
      footballDescription: athleteInfo?.footballDescription || "",
      personalPiScore: athleteInfo?.personalPiScore || "",
      personalDescription: athleteInfo?.personalDescription || "",
      otherInfo: athleteInfo?.otherInfo || "",
    },
    validationSchema: athleteInfoSchema,
    onSubmit: (values) => {
      dispatch(updateSection({ section: "athlete", data: values }));
      onNext();
    },
  });

  useEffect(() => {
    setSubmit(() => formik.submitForm);
  }, [formik.submitForm]);

  return (
    <div className="min-h-screen font-sans">
      <div className=" max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
          <section className="space-y-4">
            <h3 className="font-bold text-gray-800">Athletic Background</h3>
            <InputField
              label="Other Sports"
              maxLength={150}
              placeholder="Enter name"
              fullWidth
              name="otherSports"
              formik={formik}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <InputField
                label="Activities"
                maxLength={150}
                placeholder="Activities here"
                name="activities"
                formik={formik}
              />
              <InputField
                label="Coach Evaluation"
                placeholder="Evaluation here"
                name="coachEvaluation"
                formik={formik}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm">
              Football Character
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <div className="md:col-span-1">
                <div className="bg-white px-3 py-2 rounded-xl border border-gray-300 focus-within:border-blue-500 transition">
                  <label className="block text-[10px] text-gray-400 font-semibold mb-1 uppercase">
                    Pi Score
                  </label>

                  <select
                    name="footballPiScore"
                    value={formik.values.footballPiScore}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-transparent text-gray-800 text-sm focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Pi Score
                    </option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="D-">D-</option>
                    <option value="F+">F+</option>
                    <option value="F">F</option>
                    <option value="F-">F-</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                {formik.touched.footballPiScore &&
                  formik.errors.footballPiScore && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.footballPiScore}
                    </p>
                  )}
              </div>

              <div className="md:col-span-3">
                <InputField
                  label="Description"
                  placeholder="Enter description..."
                  name="footballDescription"
                  formik={formik}
                  // disabled={formik.values.footballPiScore === "N/A"}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm">
              Personal Character
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              {/* Pi Score */}
              <div className="md:col-span-1">
                <div className="bg-white px-3 py-2 rounded-xl border border-gray-300 focus-within:border-blue-500 transition">
                  <label className="block text-[10px] text-gray-400 font-semibold mb-1 uppercase">
                    Pi Score
                  </label>

                  <select
                    name="personalPiScore"
                    value={formik.values.personalPiScore}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-transparent text-gray-800 text-sm focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Pi Score
                    </option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="B-">B-</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="C-">C-</option>
                    <option value="D+">D+</option>
                    <option value="D">D</option>
                    <option value="D-">D-</option>
                    <option value="F+">F+</option>
                    <option value="F">F</option>
                    <option value="F-">F-</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>

                {formik.touched.personalPiScore &&
                  formik.errors.personalPiScore && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.personalPiScore}
                    </p>
                  )}
              </div>

              {/* Description */}
              <div className="md:col-span-3">
                <InputField
                  label="Description"
                  placeholder="Enter description..."
                  name="personalDescription"
                  formik={formik}
                  // disabled={formik.values.personalPiScore === "N/A"}
                />
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <label className="font-bold text-gray-800">
              Other Relevant Information
            </label>
            <textarea
              className="w-full h-32 p-4 bg-white rounded-2xl border border-gray-50 outline-none placeholder:text-gray-300 text-sm shadow-sm focus:ring-1 focus:ring-blue-100 transition-all"
              placeholder="Coach Quote here"
              name="otherInfo"
              value={formik.values.otherInfo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.otherInfo && formik.errors.otherInfo && (
              <span className="text-red-500 text-xs">
                {formik.errors.otherInfo}
              </span>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

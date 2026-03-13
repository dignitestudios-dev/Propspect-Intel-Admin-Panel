import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiChevronRight, FiPlus, FiX, FiMoreVertical } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { statsInfoSchema } from "../../schema/athleteFormSchema/athleteSchema";
import { useFormik } from "formik";
import { InputField } from "./InputField";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";

export default function Stats({ onNext, setSubmit }) {
  const basicInfo = useAppSelector((s) => s.athleteForm.formData.stats);
  const dispatch = useAppDispatch();


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      touches: basicInfo?.touches || "",
      successfulPasses: basicInfo?.successfulPasses || "",
      passAccuracy: basicInfo?.passAccuracy || "",
      tacklesCompleted: basicInfo?.tacklesCompleted || "",
      carries: basicInfo?.carries || "",
      tries: basicInfo?.tries || "",


    },
    validationSchema: statsInfoSchema,

    onSubmit: (values) => {
      dispatch(updateSection({ section: "stats", data: values }));
      onNext()
    },
  });

  useEffect(() => {
    setSubmit(() => formik.submitForm);
  }, [formik.submitForm]);


  return (
    <div className="min-h-screen  font-sans">

      <div className=" max-w-6xl mx-auto min-h-[600px] flex flex-col justify-between">


        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
          <h3 className="font-bold text-gray-800 text-lg">Add Career Stats</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField label="Touches" placeholder="Enter touches" name={'touches'} type="number" formik={formik} />
            <InputField label="Successful Passes" placeholder="Enter passes" type="number" name={'successfulPasses'} formik={formik} />

            <InputField
              label="Pass Accuracy"
              placeholder="Enter accuracy"
              suffix="%"
              name={'passAccuracy'}
              formik={formik}
              type="number"
            />
            <InputField
              label="Tackles Completed"
              placeholder="Enter tackles"
              suffix="%"
              type="number"
              name={'tacklesCompleted'}
              formik={formik}
            />

            <InputField label="Carries" type="number" placeholder="Enter carries" name={'carries'} formik={formik} />
            <InputField label="Tries" type="number" placeholder="Enter tries" name={'tries'} formik={formik} />
          </div>
        </div>



      </div>
    </div>
  );
}



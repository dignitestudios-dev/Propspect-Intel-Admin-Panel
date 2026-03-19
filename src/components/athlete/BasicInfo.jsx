import { FiEdit2, } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { useFormik } from "formik";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import { useEffect } from "react";
import { BasicInfoSchema } from "../../schema/athleteFormSchema/athleteSchema";
import { InputField } from "./InputField";
import { Selector } from "./Selector";

export default function BasicInfo({ setSubmit, onNext }) {
  const basicInfo = useAppSelector((s) => s.athleteForm.formData.basicInfo);
  const dispatch = useAppDispatch();


  const positions = [
    "Point Guard",
    "Shooting Guard",
    "Small Forward",
    "Center",
    "Power Forward",
  ];

  const statuses = [
    "Rookie",
    "Fresh Talent",
    "Emerging Star",
    "Prospect",
    "Debutant",
  ];
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: basicInfo?.name || "",
      dob: basicInfo?.dob ? new Date(basicInfo.dob).toISOString().split("T")[0] : "",
      position: basicInfo?.position || "",
      height: basicInfo?.height || "",
      weight: basicInfo?.weight || "",
      hometown: basicInfo?.hometown || "",
      email: basicInfo?.email || "",
      phone: basicInfo?.phone || "",
      team: basicInfo?.team || "",
      status: statuses.find(s => s.toLowerCase() === (basicInfo?.status || "").toLowerCase()) || "",
      image: basicInfo?.image || null,
    },
    validationSchema: BasicInfoSchema,
    onSubmit: (values) => {
      dispatch(updateSection({ section: "basicInfo", data: values }));
      onNext()
    },
  });

  useEffect(() => {
    setSubmit(() => formik.submitForm);
  }, [formik.submitForm]);



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
              onClick={() => document.querySelector('input[type="file"]').click()}
            >
              <FiEdit2 size={14} />
            </button>
          </div>
          {formik.touched.image && formik.errors.image && (
            <span className="text-red-500 text-xs text-center mt-1">
              {formik.errors.image}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

          <InputField label="Athlete Name" name="name" formik={formik} />
          <InputField label="Date of Birth" name="dob" type="date" formik={formik} />

          <Selector
            label="Select Position"
            name="position"
            options={positions}
            formik={formik}
          />

          <InputField label="Height (Ft)" type="number" name="height" formik={formik} />
          <InputField label="Weight (Lbs)" name="weight" type="number" formik={formik} />
          <InputField label="Hometown" name="hometown" formik={formik} />
          <InputField label="Contact Email" name="email" type="email" formik={formik} />

          <div className="flex flex-col gap-1">
            <div className="bg-white rounded-xl px-4 py-3 border border-gray-50">
              <label className="text-xs text-gray-400">Phone Number</label>
              <input
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full outline-none text-sm"
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <span className="text-red-500 text-xs">{formik.errors.phone}</span>
            )}
          </div>

          <InputField label="Committed Team" name="team" formik={formik} />

          <Selector
            label="Current Status"
            name="status"
            options={statuses}
            formik={formik}
          />

        </div>
      </div>
    </form>
  );
}




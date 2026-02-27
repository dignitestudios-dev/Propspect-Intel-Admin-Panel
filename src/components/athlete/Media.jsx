import { Upload } from "lucide-react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { useFormik } from "formik";
import { FiTrash2 } from "react-icons/fi";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import * as Yup from "yup";
import { mediaSchema } from "../../schema/athleteFormSchema/athleteSchema";

export default function Media({ setSubmit, onNext }) {
  const dispatch = useAppDispatch();
  const mediaData = useAppSelector((s) => s.athleteForm.formData.media || []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      files: mediaData.length > 0 ? mediaData : [],
    },
    validationSchema: mediaSchema,
    onSubmit: (values) => {
      dispatch(updateSection({ section: "media", data: values.files }));
      onNext();
    },
  });

  useEffect(() => setSubmit(() => formik.submitForm), [formik.submitForm]);

  const removeFile = (id) => {
    const newFiles = formik.values.files.filter((file) => file.id !== id);
    formik.setFieldValue("files", newFiles);
  };
  const addFile = (file) => {
    const newFiles = [
      ...formik.values.files,
      {
        id: Date.now(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} mb`,
        type: file.type.startsWith("video") ? "video" : "image",
        file,             
        thumbnail: URL.createObjectURL(file),
      },
    ];
    formik.setFieldValue("files", newFiles);
  };

  const handleFileChange = (e) => {
    Array.from(e.target.files).forEach((file) => addFile(file));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="min-h-screen font-sans max-w-6xl mx-auto py-10">


      <div className="border-2 border-dashed border-white rounded-2xl p-12 flex flex-col items-center justify-center bg-white/30 mb-8 relative">
        <Upload size={48} className="text-gray-400 mb-4" />
        <h4 className="font-bold text-gray-700 mb-1">Drop images and videos here</h4>
        <p className="text-[11px] text-gray-400 mb-6">Or click to browse files · Max 50MB per file</p>
        <p className="text-[10px] text-gray-300 mb-6">Supported formats: JPG, PNG, GIF, MP4, MOV, AVI, WebM</p>


        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <button
          type="button"
          className="flex items-center gap-2 px-6 py-2 rounded-xl border-2 border-[#0085CA] text-[#0085CA] font-bold text-xs hover:bg-blue-50 transition-colors z-10"
        >
          <Upload />
          Choose Files
        </button>
      </div>


      {formik.errors.files && formik.touched.files && (
        <p className="text-red-500 text-xs mb-4">{formik.errors.files}</p>
      )}


      <div className="space-y-3">
        {formik.values.files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between bg-white/80 p-3 rounded-2xl border border-gray-50 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={file.thumbnail}
                alt={file.name}
                className="w-12 h-12 rounded-lg object-cover bg-gray-100"
              />
              <div>
                <p className="text-sm font-bold text-gray-700">{file.name}</p>
                <p className="text-[11px] text-gray-400">{file.size}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeFile(file.id)}
              className="p-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </form>
  );
}
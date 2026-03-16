import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/store/hook";
import { useFormik } from "formik";
import { FiTrash2 } from "react-icons/fi";
import { updateSection } from "../../lib/store/feature/athleteFormSlice";
import { mediaSchema } from "../../schema/athleteFormSchema/athleteSchema";

export default function Media({ setSubmit, onNext }) {
  const dispatch = useAppDispatch();
  const mediaData = useAppSelector((s) => s.athleteForm.formData.media || []);
  const [deletedMedia, setDeletedMedia] = useState([]);

  const [initialFiles] = useState(
    mediaData
      .map((item) => {
        if (typeof item === "string") {

          return { name: item.split("/").pop(), file: null, thumbnail: item, url: item, size: "" };
        } else if (item instanceof File) {

          return { name: item.name, file: item, thumbnail: URL.createObjectURL(item), size: `${(item.size / 1024 / 1024).toFixed(2)} MB` };
        } else {

          console.warn("Invalid media item skipped:", item);
          return null;
        }
      })
      .filter(Boolean)
  );

  const formik = useFormik({
    initialValues: { files: initialFiles },

    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: mediaSchema,
    onSubmit: (values) => {
      const filesToSend = values.files.map((f) => f.file || f.url);
      dispatch(updateSection({ section: "media", data: filesToSend }));
      dispatch(updateSection({ section: "mediaToDeleted", data: deletedMedia }));
      onNext();
    },
  });

  useEffect(() => setSubmit(() => formik.submitForm), [formik.submitForm]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      file,
      thumbnail: URL.createObjectURL(file), // only for File
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    }));
    formik.setFieldValue("files", [...formik.values.files, ...newFiles]);
  };

  const removeFile = (index) => {
    const fileToRemove = formik.values.files[index];
    formik.setFieldValue("files", formik.values.files.filter((_, i) => i !== index));
    if (fileToRemove.url) setDeletedMedia((prev) => [...prev, fileToRemove.url]);
  };
  useEffect(() => {
    dispatch(updateSection({
      section: "media",
      data: formik.values.files.filter(f => f.file)
    }));
    dispatch(updateSection({
      section: "mediaToDeleted",
      data: deletedMedia
    }));
  }, [formik.values.files, deletedMedia]);

  return (
    <form onSubmit={formik.handleSubmit} className="min-h-screen font-sans max-w-6xl mx-auto py-10">
      <div className="border-2 border-dashed border-white rounded-2xl p-12 flex flex-col items-center justify-center bg-white/30 mb-8 relative">
        <Upload size={48} className="text-gray-400 mb-4" />
        <h4 className="font-bold text-gray-700 mb-1">Drop images and videos here</h4>
        <p className="text-[11px] text-gray-400 mb-6">Or click to browse files · Max 50MB per file</p>
        <input type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
        <button type="button" className="flex items-center gap-2 px-6 py-2 rounded-xl border-2 border-[#0085CA] text-[#0085CA] font-bold text-xs hover:bg-blue-50 transition-colors z-10">
          <Upload /> Choose Files
        </button>
      </div>

      <div className="space-y-3">
        {formik.values.files.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-white/80 p-3 rounded-2xl border border-gray-50 shadow-sm">
            <div className="flex items-center gap-4">
              <img src={file.thumbnail} alt={file.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
              <div>
                <p className="text-sm font-bold text-gray-700">{file.name}</p>
                <p className="text-[11px] text-gray-400">{file.size}</p>
              </div>
            </div>
            <button type="button" onClick={() => removeFile(index)} className="p-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors">
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
        {formik.errors.files && formik.touched.files && (
          <p className="text-red-500 text-xs mt-2">{formik.errors.files}</p>
        )}
      </div>
    </form>
  );
}
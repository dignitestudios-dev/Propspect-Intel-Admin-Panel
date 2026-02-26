export const InputField = ({ label, name, formik, type = "text" }) => (
    <div className="flex flex-col gap-1">
        <div className="bg-white rounded-xl px-4 py-3 border border-gray-50">
            <label className="text-xs text-gray-400">{label}</label>
            <input
                type={type}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full outline-none text-sm"
            />
        </div>
        {formik.touched[name] && formik.errors[name] && (
            <span className="text-red-500 text-xs">{formik.errors[name]}</span>
        )}
    </div>
);


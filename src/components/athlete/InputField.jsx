export const InputField = ({ label, name, formik, type = "text" }) => {
    const getNested = (path, obj) => path.split(/[\.\[\]]/).filter(Boolean).reduce((o, k) => o?.[k], obj);
    const value = getNested(name, formik.values) || "";
    const error = getNested(name, formik.errors);
    const touched = getNested(name, formik.touched);

    return (
        <div className="flex flex-col gap-1">
            <div className="bg-white rounded-xl px-4 py-3 border border-gray-50">
                <label className="text-xs text-gray-400">{label}</label>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full outline-none text-sm"
                />
            </div>
            {touched && error && (
                <span className="text-red-500 text-xs">{error}</span>
            )}
        </div>
    );
};
export const Selector = ({ label, name, options, formik }) => (
    <div className="md:col-span-2 flex flex-col gap-2">
        <label className="block text-sm font-bold text-gray-700">{label}</label>

        <div className="flex flex-wrap gap-3">
            {options.map((opt) => (
                <button
                    key={opt}
                    type="button"
                    onClick={() => formik.setFieldValue(name, opt)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-medium border transition-all ${formik.values[name] === opt
                        ? "bg-[#0085CA] text-white border-[#0085CA]"
                        : "bg-white text-gray-500 border-gray-100"
                        }`}
                >
                    {opt}
                </button>
            ))}
        </div>

        {formik.touched[name] && formik.errors[name] && (
            <span className="text-red-500 text-xs">{formik.errors[name]}</span>
        )}
    </div>
);
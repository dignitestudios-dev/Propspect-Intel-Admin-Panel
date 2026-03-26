export const MultiSelector = ({ label, name, options, formik, isMulti = false }) => {

   const handleSelect = (opt) => {
    if (isMulti) {
        const current = formik.values[name] || [];

        const lowerOpt = opt.toLowerCase().trim();

        if (current.some((item) => item.toLowerCase().trim() === lowerOpt)) {
            // remove
            formik.setFieldValue(
                name,
                current.filter((item) => item.toLowerCase().trim() !== lowerOpt)
            );
        } else {
            // add
            formik.setFieldValue(name, [...current, opt]);
        }
    } else {
        formik.setFieldValue(name, opt);
    }
};
    const isSelected = (opt) => {
    if (isMulti) {
        return formik.values[name]?.some(
            (item) => item?.toLowerCase().trim() === opt.toLowerCase().trim()
        );
    }
    return formik.values[name] === opt;
};

    return (
        <div className="md:col-span-2 flex flex-col gap-2">
            <label className="block text-sm font-bold text-gray-700">{label}</label>

            <div className="flex flex-wrap gap-3">
                {options.map((opt) => (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelect(opt)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                            isSelected(opt)
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
};
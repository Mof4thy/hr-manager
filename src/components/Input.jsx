const Input = ({ type = "text", placeholder, label, className = '', value, onChange, onBlur, required, error }) => {
    const standardClassName = `
        w-full px-3 py-2 sm:px-4 sm:py-2 
        bg-white text-gray-900 
        border-b-2 border-gray-200 
        outline-none 
        transition-all duration-200 ease-in-out
        focus:border-gray-500 
        hover:border-gray-300
        placeholder:text-gray-400
        shadow-sm
        text-xs sm:text-sm md:text-base
    `

    return (
        <div className="flex flex-col gap-1 sm:gap-2">
            {label && <label className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 mb-1 rtl-text">
                {label} {required && <span className="text-red-500 ml-1">*</span>}
            </label>}
            <input 
                type={type}
                placeholder={placeholder}
                className={`${standardClassName} ${className}`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                max={14}
                min={11}
            />
            {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}

        </div>
    )
}

export default Input
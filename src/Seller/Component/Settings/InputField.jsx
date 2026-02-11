export const InputField = ({
  label,
  value,
  onChange,        
  disabled,
  type = "text",
}) => (
  <div className="group">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em] mb-3 block group-focus-within:text-[#39b02c] transition-colors">
      {label}
    </label>

    <input
      type={type}
      disabled={disabled}
      value={value ?? ""} 
      onChange={onChange}   
      className={`w-full px-6 py-4 rounded-[20px] text-sm font-semibold transition-all outline-none border-none
        ${
          disabled
            ? "bg-gray-100 text-gray-400"
            : "bg-gray-50 focus:bg-white focus:ring-4 ring-[#39b02c]/5 text-gray-800 shadow-inner"
        }
      `}
    />
  </div>
);

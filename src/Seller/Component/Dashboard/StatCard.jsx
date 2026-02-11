
export const StatCard = ({ label, value, icon }) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border shadow-sm">
    <p className="text-xs uppercase font-bold text-slate-400">{label}</p>
    <div className="flex justify-between items-end mt-2">
      <h3 className="text-2xl font-black">{value}</h3>
      {icon}
    </div>
  </div>
)

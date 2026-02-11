export const TopProduct = ({ name, sold, revenue, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left flex justify-between items-center
      hover:bg-slate-100 dark:hover:bg-slate-800
      p-2 rounded-lg transition"
  >
    <div>
      <p className="font-bold text-sm">{name}</p>
      <p className="text-xs text-slate-400">{sold} sold</p>
    </div>
    <p className="font-bold text-[#39b02c]">{revenue}</p>
  </button>
)

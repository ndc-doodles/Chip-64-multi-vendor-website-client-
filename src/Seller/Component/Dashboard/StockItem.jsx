
export const StockItem = ({ name, stock }) => (
  <div className="flex justify-between items-center">
    <div>
      <p className="font-bold text-sm">{name}</p>
      <p className="text-xs text-slate-400">{stock} units left</p>
    </div>
    <span className={`text-xs font-bold px-2 py-1 rounded ${
      stock === 0
        ? 'bg-red-100 text-red-600'
        : 'bg-amber-100 text-amber-600'
    }`}>
      {stock === 0 ? 'Out' : 'Low'}
    </span>
  </div>
)
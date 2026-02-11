import { useNavigate } from "react-router-dom"
export const Card = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 space-y-4">
    <h3 className="font-bold text-lg">{title}</h3>
    {children}
  </div>
)
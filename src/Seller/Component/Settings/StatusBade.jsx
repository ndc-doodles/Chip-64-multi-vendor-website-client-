export const StatusBadge = ({ status }) => {
  const styles = {
    verified: "text-[#39b02c] bg-[#39b02c]/10 border-[#39b02c]/20",
    pending: "text-amber-500 bg-amber-50 border-amber-100",
    rejected: "text-rose-500 bg-rose-50 border-rose-100"
  };
  return (
    <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-tighter flex items-center gap-2 ${styles[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {status} Account
    </div>
  );
};
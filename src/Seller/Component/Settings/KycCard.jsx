export const KycCard = ({ label, url }) => (
  <div className="border rounded-2xl p-5 bg-gray-50">
    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
      {label}
    </p>

    {url ? (
      <a
        href={url}
        target="_blank"
        className="text-[#39b02c] font-bold text-sm hover:underline"
      >
        View Document
      </a>
    ) : (
      <p className="text-sm text-gray-400">Not uploaded</p>
    )}
  </div>
);

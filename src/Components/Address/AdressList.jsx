import { Plus, Edit2, Trash2, Star, MapPin, Phone, User, CheckCircle2 } from "lucide-react";

const AddressList = ({
  addresses,
  onAdd,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-white">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-[#39b02c] font-bold tracking-widest text-xs uppercase italic">Your Locations</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-1">My Addresses</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Manage where you receive your Chip orders</p>
        </div>
        
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-[#39b02c] hover:bg-[#2d8a22] text-white px-8 py-3.5 rounded-2xl font-bold transition-all hover:shadow-[0_10px_20px_rgba(57,176,44,0.3)] active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          <span>Add New Address</span>
        </button>
      </div>

      {/* EMPTY STATE */}
      {!addresses.length ? (
        <div className="text-center py-24 bg-[#39b02c]/5 rounded-[40px] border-2 border-dashed border-[#39b02c]/20">
          <div className="bg-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-sm mb-6">
             <MapPin size={32} className="text-[#39b02c]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No addresses saved</h3>
          <p className="mt-2 text-gray-500 max-w-xs mx-auto">Your saved addresses will appear here for faster checkout.</p>
          <button
            onClick={onAdd}
            className="mt-8 bg-white border border-[#39b02c] text-[#39b02c] px-6 py-2 rounded-full font-bold hover:bg-[#39b02c] hover:text-white transition-all"
          >
            Create your first address
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`relative overflow-hidden group rounded-[32px] border-2 p-7 transition-all duration-500
                ${address.isDefault 
                  ? "border-[#39b02c] bg-white shadow-[0_25px_50px_rgba(57,176,44,0.1)]" 
                  : "border-gray-100 bg-white hover:border-[#39b02c]/30 hover:shadow-2xl hover:-translate-y-1.5"
                }
              `}
            >
              {/* Default Badge - Modern Top-Right Ribbon */}
              {address.isDefault && (
                <div className="absolute top-0 right-0 bg-[#39b02c] text-white px-5 py-2 rounded-bl-3xl flex items-center gap-2 shadow-md">
                  <CheckCircle2 size={14} strokeWidth={3} />
                  <span className="text-[11px] font-black uppercase tracking-widest">Active</span>
                </div>
              )}

              {/* Address Content */}
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#39b02c] group-hover:text-white transition-all duration-300">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 text-lg leading-none">{address.fullName}</p>
                        <p className="text-sm text-[#39b02c] font-semibold mt-1 flex items-center gap-1">
                            <Phone size={12} /> {address.phone}
                        </p>
                    </div>
                </div>

                <div className="pl-1 flex items-start gap-3">
                  <div className="mt-1 bg-gray-100 p-1.5 rounded-lg text-gray-400">
                    <MapPin size={16} />
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm font-medium">
                    {address.line1}<br />
                    <span className="text-gray-400 font-normal">{address.city}, {address.state} — {address.pincode}</span>
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                <button 
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-50 text-gray-700 font-bold text-xs hover:bg-gray-100 transition-colors uppercase tracking-wider"
                  onClick={() => onEdit(address)}
                >
                  <Edit2 size={14} /> Edit
                </button>

                {!address.isDefault && (
                  <button 
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-[#39b02c] text-[#39b02c] font-bold text-xs hover:bg-[#39b02c] hover:text-white transition-all uppercase tracking-wider"
                    onClick={() => onSetDefault(address._id)}
                  >
                    <Star size={14} /> Set Default
                  </button>
                )}

                <button 
                  className="h-[44px] w-[44px] flex items-center justify-center rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shrink-0 shadow-sm"
                  onClick={() => onDelete(address._id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressList;
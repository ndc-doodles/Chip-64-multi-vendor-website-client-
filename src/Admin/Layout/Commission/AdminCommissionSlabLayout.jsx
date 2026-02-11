import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  EyeOff,
  Info,
  CheckCircle2,
  AlertTriangle,
  Save,
  X,
  ChevronRight,
  Calculator,
} from "lucide-react";
import {
  getCommissionApi,
  createCommissionApi,
  updateCommissionApi,
  toggleCommissionApi,
} from "@/API/adminApi";
import { toast } from "sonner";

export default function CommissionSlabs() {
  const [slabs, setSlabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlab, setEditingSlab] = useState(null);

  const [form, setForm] = useState({
    minPrice: "",
    maxPrice: "",
    flatCommission: "",
    isActive: true,
  });

  useEffect(() => {
    loadSlabs();
  }, []);

  const loadSlabs = async () => {
    try {
      const res = await getCommissionApi();
      setSlabs(res.slabs || []);
    } catch {
      toast.error("Failed to load commission slabs");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingSlab(null);
    setForm({
      minPrice: "",
      maxPrice: "",
      flatCommission: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (slab) => {
    setEditingSlab(slab);
    setForm({
      minPrice: slab.minPrice,
      maxPrice: slab.maxPrice,
      flatCommission: slab.flatCommission,
      isActive: slab.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      editingSlab
        ? await updateCommissionApi(editingSlab._id, form)
        : await createCommissionApi(form);

      toast.success(
        editingSlab ? "Commission slab updated" : "Commission slab created"
      );
      setIsModalOpen(false);
      loadSlabs();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Save failed");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleCommissionApi(id);
      loadSlabs();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 font-jakarta">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-8 py-6">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              Commission Configuration
            </h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
              Manage flat commission per price range
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-[#39b02c] hover:bg-[#2e8f24] text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg"
          >
            <Plus size={16} /> Add Slab
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-[1400px] mx-auto px-8 mt-10 grid grid-cols-12 gap-8">
        {/* TABLE */}
        <section className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Price Range",
                    "Flat Fee",
                    "Status",
                    "Updated",
                    "Actions",
                  ].map((head) => (
                    <th
                      key={head}
                      className="px-8 py-5 text-[10px] text-gray-400 uppercase tracking-widest font-black"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y">
                {slabs.map((slab) => (
                  <tr
                    key={slab._id}
                    className={!slab.isActive ? "opacity-50" : ""}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 font-mono text-sm font-bold">
                        ₹{slab.minPrice}
                        <ChevronRight size={14} />
                        ₹{slab.maxPrice}
                      </div>
                    </td>

                    <td className="px-8 py-6 text-[#39b02c] font-mono font-black">
                      ₹{slab.flatCommission}
                    </td>

                    <td className="px-8 py-6">
                      <StatusBadge active={slab.isActive} />
                    </td>

                    <td className="px-8 py-6 text-xs text-gray-400 font-bold">
                      {new Date(slab.updatedAt).toLocaleDateString()}
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-2">
                        <IconButton
                          icon={Edit2}
                          onClick={() => openEditModal(slab)}
                        />
                        <IconButton
                          icon={EyeOff}
                          danger={slab.isActive}
                          onClick={() => handleToggle(slab._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* INFO */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-gray-900 text-white p-8 rounded-[32px] relative">
            <Calculator className="absolute bottom-4 right-4 text-white/10 w-24 h-24" />
            <h3 className="flex items-center gap-2 font-black mb-6">
              <Info size={18} className="text-[#39b02c]" /> How it works
            </h3>
            <ul className="space-y-4 text-xs text-gray-400">
              <li>• Applied per item</li>
              <li>• Flat amount only</li>
              <li>• Locked on order time</li>
              <li>• No effect on past orders</li>
            </ul>
          </div>

          <div className="flex gap-3 bg-amber-50 border border-amber-100 p-5 rounded-3xl">
            <AlertTriangle className="text-amber-500" size={18} />
            <p className="text-[11px] font-bold text-amber-700 uppercase">
              Avoid overlapping price ranges
            </p>
          </div>
        </aside>
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-50" />
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[32px] p-8">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-black">
                  {editingSlab ? "Edit Slab" : "Create Slab"}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X />
                </button>
              </div>

              <div className="space-y-5">
                <ModalInput
                  label="Min Price"
                  value={form.minPrice}
                  onChange={(e) =>
                    setForm({ ...form, minPrice: e.target.value })
                  }
                />
                <ModalInput
                  label="Max Price"
                  value={form.maxPrice}
                  onChange={(e) =>
                    setForm({ ...form, maxPrice: e.target.value })
                  }
                />
                <ModalInput
                  label="Flat Commission"
                  value={form.flatCommission}
                  onChange={(e) =>
                    setForm({ ...form, flatCommission: e.target.value })
                  }
                />

                <button
                  onClick={handleSave}
                  className="w-full bg-[#39b02c] text-white py-3 rounded-xl font-black text-xs uppercase"
                >
                  <Save size={14} /> Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- SUB COMPONENTS ---------- */

const StatusBadge = ({ active }) => (
  <span
    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
      active
        ? "bg-green-50 text-[#39b02c]"
        : "bg-gray-100 text-gray-400"
    }`}
  >
    {active && <CheckCircle2 size={10} />} {active ? "Active" : "Inactive"}
  </span>
);

const IconButton = ({ icon: Icon, danger, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-xl border ${
      danger
        ? "hover:text-red-500 hover:bg-red-50"
        : "hover:bg-gray-100"
    }`}
  >
    <Icon size={16} />
  </button>
);

const ModalInput = ({ label, value, onChange }) => (
  <div>
    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">
      {label}
    </label>
    <input
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-gray-50 rounded-xl font-bold"
    />
  </div>
);

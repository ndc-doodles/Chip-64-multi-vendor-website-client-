"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import HeaderLayout from "@/Layout/Header/HeaderLayout";
import AddressFormModal from "@/Components/Address/AddressFormModal";
import { useNavigate } from "react-router-dom";
import {
  getAddressesApi,
  createAddressApi,
  updateAddressApi,
  deleteAddressApi,
  setDefaultAddressApi,
} from "@/API/userAPI";

export default function AddressManagement() {
  const [addresses, setAddresses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const navigate = useNavigate();

  const defaultAddress = addresses.find((a) => a.isDefault);
  const otherAddresses = addresses.filter((a) => !a.isDefault);

  const emptyForm = {
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  };

  const [formData, setFormData] = useState(emptyForm);

  /* ================= FETCH ================= */

  const fetchAddresses = async () => {
    const data = await getAddressesApi();
    setAddresses(data.addresses || []);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  /* ================= SAVE ================= */

  const handleSave = async () => {
    if (editing) {
      await updateAddressApi(editing._id, formData);
    } else {
      await createAddressApi(formData);
    }

    setOpen(false);
    setEditing(null);
    setFormData(emptyForm);
    fetchAddresses();
  };

  /* ================= CARD ================= */

  const AddressCard = ({ a }) => {
    const addressText = `
      ${a.line1},
      ${a.line2 ? a.line2 + "," : ""}
      ${a.city}, ${a.state} ${a.postalCode}, ${a.country}
    `;

    return (
      <div
        className="
          bg-white border border-gray-100
          rounded-3xl
          p-4 sm:p-6
          shadow-sm
          relative mb-4
          hover:shadow-md active:shadow-md
          transition
        "
      >
        {/* Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className="bg-[#8bf606]/20 text-[#5cb000] px-3 py-1 rounded-lg text-xs font-bold">
            {a.isDefault ? "Default Address" : "Address"}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          {a.fullName}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-1">
          {addressText}
        </p>

        <p className="text-gray-500 text-sm mb-6">{a.phone}</p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          {a.isDefault && (
            <CheckCircle2 size={18} className="text-[#8bf606]" />
          )}

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Edit */}
            <button
              onClick={() => {
                setEditing(a);
                setFormData(a);
                setOpen(true);
              }}
              className="
                w-full sm:w-auto
                flex items-center justify-center gap-1
                px-4 py-2
                border border-gray-200
                rounded-xl
                text-sm font-medium
                hover:bg-gray-50 active:bg-gray-50
              "
            >
              <Edit2 size={14} /> Edit
            </button>

            {/* Default OR Delete */}
            {!a.isDefault ? (
              <button
                onClick={async () => {
                  await setDefaultAddressApi(a._id);
                  fetchAddresses();
                }}
                className="
                  w-full sm:w-auto
                  flex items-center justify-center gap-1
                  px-4 py-2
                  bg-[#8bf606] text-black
                  rounded-xl
                  text-sm font-bold
                  shadow
                  active:scale-95
                "
              >
                <CheckCircle2 size={14} />
                Set Default
              </button>
            ) : (
              <button
                onClick={async () => {
                  await deleteAddressApi(a._id);
                  fetchAddresses();
                }}
                className="
                  w-full sm:w-auto
                  flex items-center justify-center gap-1
                  px-4 py-2
                  border border-red-100
                  text-red-500
                  rounded-xl
                  text-sm font-medium
                  hover:bg-red-50 active:bg-red-50
                "
              >
                <Trash2 size={14} /> Delete
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ================= UI ================= */

  return (
    <>
      <HeaderLayout />

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 font-sans bg-white min-h-screen">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8 lg:mb-12">
          <div>
            <nav className="text-xs text-gray-400 mb-2 flex items-center gap-2">
              <ChevronRight
                size={12}
                className="rotate-180 cursor-pointer"
                onClick={() => navigate("/account")}
              />
              Account /
              <span className="text-black font-semibold">
                Address Book
              </span>
            </nav>

            <h1 className="text-4xl font-black text-slate-800">
              Address Book
            </h1>
          </div>

          {/* Add Button */}
          <button
            onClick={() => {
              setEditing(null);
              setFormData(emptyForm);
              setOpen(true);
            }}
            className="
              w-full sm:w-auto
              justify-center
              bg-[#8bf606] text-black
              px-6 py-3
              rounded-2xl
              font-bold
              flex items-center gap-2
              shadow
              hover:scale-105 active:scale-95
              transition
            "
          >
            <Plus size={20} /> Add New Address
          </button>
        </div>

        {/* LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT (Desktop only) */}
          <div className="hidden lg:block">
            <img
              src="/address.png"
              alt="Delivery"
              className="w-full rounded-3xl mb-8"
            />

            {defaultAddress && (
              <>
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  Default Address
                </h3>
                <AddressCard a={defaultAddress} />
              </>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
               Addresses
            </h2>

            <p className="text-gray-400 text-sm mb-8">
              Manage your delivery addresses
            </p>

            {addresses.map((a) => (
              <AddressCard key={a._id} a={a} />
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AddressFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEdit={!!editing}
      />
    </>
  );
}

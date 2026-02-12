"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import AdminSidebar from "@/Admin/Layout/Sidebar/AdminSidebarLayout";
import AdminHeader from "@/Admin/Components/Header/AdminHeader";
import { Button } from "@/Components/ui/button";

import BrandList from "@/Admin/Components/Brands/BrandList";
import BrandRequests from "@/Admin/Components/Brands/BrandRequests";
import CreateBrandModal from "@/Admin/Components/Brands/CreateBrandModal";

import { getBrandsApi,getBrandRequestsApi } from "@/API/adminApi";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState([]);
  const [requests, setRequests] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  const loadData = async () => {
    try {
      const [brandsRes, reqRes] = await Promise.all([
        getBrandsApi(),
        getBrandRequestsApi(),
      ]);
      setBrands(brandsRes.brands || []);
      setRequests(reqRes.requests || []);
    } catch {
      toast.error("Failed to load brands");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <AdminSidebar />

      <div className="lg:ml-[260px] min-h-screen">
        <AdminHeader title="Brands" />

        <div className="px-6 pt-6 flex justify-end">
          <Button onClick={() => setOpenCreate(true)} className="gap-2">
            <Plus size={16} />
            Create Brand
          </Button>
        </div>

        <main className="px-6 py-6 space-y-10">
          <BrandRequests requests={requests} onAction={loadData} />
          <BrandList brands={brands} />
        </main>
      </div>

      <CreateBrandModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={loadData}
      />
      
    </>
  );
}

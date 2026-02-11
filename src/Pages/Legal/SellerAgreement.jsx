"use client";

import { useNavigate } from "react-router-dom";

export default function SellerAgreement() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-background px-4 py-16">
      <div className="max-w-4xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/seller/register")}
          className="mb-6 text-sm text-accent underline hover:opacity-80"
        >
          ← Back to Seller Registration
        </button>

        {/* HEADER */}
        <h1 className="text-3xl md:text-4xl font-serif mb-4">
          Seller Agreement
        </h1>

        <p className="text-sm text-muted-foreground mb-10">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        {/* CONTENT */}
        <div className="space-y-8 text-sm leading-relaxed text-foreground">

          <Block title="1. Introduction">
            This Seller Agreement (“Agreement”) is entered into between
            <strong> CHIP-64</strong> (“Platform”) and the seller
            (“You”). By registering as a seller, you agree to comply with
            all terms mentioned below.
          </Block>

          <Block title="2. Seller Eligibility">
            You must provide accurate business information, valid KYC
            documents, and maintain compliance with applicable laws.
          </Block>

          <Block title="3. Product Responsibilities">
            Sellers are responsible for product authenticity, pricing,
            inventory accuracy, and lawful sourcing of goods.
          </Block>

          <Block title="4. Commission & Payments">
            CHIP-64 charges a commission on each successful sale.
            Payouts will be processed after order completion and return
            windows.
          </Block>

          <Block title="5. Suspension & Termination">
            CHIP-64 reserves the right to suspend or terminate seller
            accounts in case of policy violations, fraud, or misconduct.
          </Block>

          <Block title="6. Agreement Acceptance">
            By submitting the seller registration form, you acknowledge
            that you have read, understood, and accepted this agreement.
          </Block>

        </div>
      </div>
    </section>
  );
}

/* ---------------- UI BLOCK ---------------- */

const Block = ({ title, children }) => (
  <div className="space-y-2">
    <h2 className="text-lg font-medium">{title}</h2>
    <p className="text-muted-foreground">{children}</p>
  </div>
);

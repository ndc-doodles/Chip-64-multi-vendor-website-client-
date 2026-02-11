"use client";

import { useNavigate } from "react-router-dom";

export default function CommissionPolicy() {
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
          Commission Policy
        </h1>

        <p className="text-sm text-muted-foreground mb-10">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        {/* CONTENT */}
        <div className="space-y-8 text-sm leading-relaxed text-foreground">

          <Block title="1. Overview">
            Chip-64 charges a commission on every successful sale made
            through the platform. This commission covers platform usage,
            marketing, payment processing, and seller support.
          </Block>

          <Block title="2. Commission Rate">
            The standard commission rate is decided by Chip-64 and may
            vary based on product category, seller performance, or special
            agreements.
          </Block>

          <Block title="3. Calculation">
            Commission is calculated as a percentage of the final order value
            (excluding shipping charges unless stated otherwise).
          </Block>

          <Block title="4. Deductions & Payouts">
            Commission is deducted automatically before seller payouts.
            Payouts are processed after successful order delivery and return
            window completion.
          </Block>

          <Block title="5. Changes to Commission">
            CHIP-64 reserves the right to revise commission rates.
            Sellers will be notified in advance of any changes.
          </Block>

          <Block title="6. Acceptance">
            By registering as a seller, you acknowledge and accept the
            commission structure defined by CHIP-64.
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

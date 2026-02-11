"use client";

import { useNavigate } from "react-router-dom";

export default function ReturnsPolicy() {
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
          Returns & Refund Policy
        </h1>

        <p className="text-sm text-muted-foreground mb-10">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        {/* CONTENT */}
        <div className="space-y-8 text-sm leading-relaxed text-foreground">

          <Block title="1. Overview">
            This Returns & Refund Policy outlines the responsibilities of
            sellers regarding product returns, refunds, and exchanges on
            the CHIP-64 platform.
          </Block>

          <Block title="2. Seller Responsibility">
            Sellers are responsible for accepting valid return requests
            in accordance with CHIP-64 guidelines and applicable laws.
            Returned products must be inspected promptly upon receipt.
          </Block>

          <Block title="3. Eligible Returns">
            Returns may be initiated for reasons including damaged items,
            incorrect products, manufacturing defects, or other valid cases
            approved by CHIP-64.
          </Block>

          <Block title="4. Refund Processing">
            Once a return is approved and received, sellers must process
            refunds within the stipulated time period. Refund amounts will
            be adjusted against future payouts if applicable.
          </Block>

          <Block title="5. Non-Returnable Items">
            Certain products may be marked as non-returnable due to hygiene,
            customization, or other category-specific reasons. Such details
            must be clearly mentioned on the product listing.
          </Block>

          <Block title="6. Disputes & Resolution">
            In case of disputes, CHIP-64 reserves the right to review
            transaction details, customer evidence, and seller responses
            before making a final decision.
          </Block>

          <Block title="7. Policy Compliance">
            Failure to comply with return and refund obligations may result
            in penalties, suspension, or termination of the seller account.
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

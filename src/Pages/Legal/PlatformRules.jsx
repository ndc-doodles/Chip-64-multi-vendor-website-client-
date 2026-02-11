"use client";

import { useNavigate } from "react-router-dom";

export default function PlatformRules() {
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
          Platform Rules & Seller Code of Conduct
        </h1>

        <p className="text-sm text-muted-foreground mb-10">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        {/* CONTENT */}
        <div className="space-y-8 text-sm leading-relaxed text-foreground">

          <Block title="1. General Conduct">
            Sellers must operate honestly, ethically, and in compliance
            with all applicable laws and CHIP-64 policies. Any form
            of misleading, fraudulent, or abusive behavior is strictly
            prohibited.
          </Block>

          <Block title="2. Product Listing Rules">
            All product listings must be accurate, complete, and truthful.
            Sellers must not upload misleading images, false descriptions,
            counterfeit goods, or prohibited items.
          </Block>

          <Block title="3. Pricing & Inventory">
            Sellers are responsible for maintaining correct pricing and
            real-time inventory. Artificial price inflation, manipulation,
            or false discounts are not allowed.
          </Block>

          <Block title="4. Order Fulfillment">
            Orders must be processed and shipped within the defined
            timelines. Repeated order cancellations, delays, or failures
            to fulfill orders may lead to penalties.
          </Block>

          <Block title="5. Customer Communication">
            Sellers must maintain professional communication with customers.
            Harassment, offensive language, or unresponsive behavior is
            considered a violation of platform rules.
          </Block>

          <Block title="6. Reviews & Ratings">
            Sellers must not attempt to manipulate reviews or ratings.
            Fake reviews, incentives for positive feedback, or suppression
            of negative reviews are strictly prohibited.
          </Block>

          <Block title="7. Account Misuse">
            Sellers may not create multiple accounts, transfer accounts,
            or allow unauthorized access to their seller dashboard.
          </Block>

          <Block title="8. Enforcement Actions">
            CHIP-64 reserves the right to take action including
            warnings, suspension, blocking, or permanent termination
            of seller accounts for any rule violations.
          </Block>

          <Block title="9. Updates to Rules">
            Platform rules may be updated periodically. Continued use
            of the platform after updates constitutes acceptance of
            the revised rules.
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

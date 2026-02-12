import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10 bg-[#8af606d7]">

      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

        {/* ================= GRID ================= */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10 md:gap-14
            text-center sm:text-left
          "
        >

          {/* ================= BRAND ================= */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-black tracking-tight">
              CHIP-64
            </h3>

            <p className="text-sm text-black/80 font-light leading-relaxed max-w-xs mx-auto sm:mx-0">
              Premium hardware marketplace for laptops, components,
              and surveillance systems. Fast. Secure. Trusted.
            </p>
          </div>


          {/* ================= CUSTOMER SERVICE ================= */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-black">
              Customer Service
            </h4>

            <ul className="space-y-2">
              <FooterLink to="/contact" label="Contact Us" />
              <FooterLink to="/shipping" label="Shipping Info" />
              <FooterLink to="/returns" label="Returns" />
              <FooterLink to="/faq" label="FAQ" />
            </ul>
          </div>


          {/* ================= ABOUT ================= */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-black">
              About
            </h4>

            <ul className="space-y-2">
              <FooterLink to="/about" label="Our Story" />
              <FooterLink to="/about" label="Vendors" />
              <FooterLink to="/about" label="Careers" />
              <FooterLink to="/contact" label="Support" />
            </ul>
          </div>


          {/* ================= POLICIES ================= */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-black">
              Policies
            </h4>

            <ul className="space-y-2">
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms of Service" />
              <FooterLink to="/refund" label="Refund Policy" />
              <FooterLink to="/security" label="Security" />
            </ul>
          </div>
        </div>


        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-black/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">

          <p className="text-xs text-black/70 tracking-widest">
  © 2025 Cybexel. All rights reserved.
</p>


          <div className="flex gap-6 text-xs text-black/70">
            <span>Secure Payments</span>
            <span>Fast Delivery</span>
            <span>Verified Sellers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}


/* ================= REUSABLE LINK ================= */
function FooterLink({ to, label }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-black/80 hover:text-black hover:underline transition-colors font-light"
      >
        {label}
      </Link>
    </li>
  );
}

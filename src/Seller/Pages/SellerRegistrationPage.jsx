import SellerRegisterForm from "../Layout/Register/SellerRegisterationLayout"
import { Link } from "react-router-dom"
export default function SellerRegisterPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT: Brand / Trust Panel */}
        <div className="flex flex-col justify-start pt-10 space-y-6">

          <span className="inline-block text-xs tracking-widest uppercase text-primary">
            Partner Program
          </span>

          <h1 className="text-4xl md:text-5xl font-serif leading-tight">
            Become a Seller on <br />
            <span className="text-primary">CHIP</span>
          </h1>

          <p className="text-muted-foreground max-w-md">
            Join our curated marketplace and showcase your craftsmanship
            to customers who value quality, authenticity, and timeless design.
          </p>

          {/* Trust points */}
          <ul className="space-y-3 text-sm text-foreground/80">
            <li>• Verified sellers only</li>
            <li>• Secure payouts & transparent commission</li>
            <li>• Dedicated seller dashboard</li>
            <li>• Manual approval for quality control</li>
          </ul>
        <Link
  to="/seller"
  className="
    inline-flex items-center gap-2
    mt-5 px-5 py-2
    text-sm font-medium
    text-primary
    border border-primary/40
    rounded-full
    cursor-pointer
    hover:border-primary
    hover:gap-3
    transition-all duration-300
  "
>
  Already a vendor? Sign in →
</Link>



        </div>

        {/* RIGHT: Form Card */}
        <div className="relative">
          <div
            className="
              rounded-2xl bg-card/90 backdrop-blur
              border border-border
              shadow-xl shadow-black/5
              p-8 md:p-10
            "
          >
            <div className="mb-8">
              <h2 className="text-2xl font-sans tracking-tight">
                Seller Registration
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Complete the details below. Your application will be reviewed by our team.
              </p>
            </div>

            <SellerRegisterForm />
          </div>
        </div>

      </div>
    </section>
  )
}

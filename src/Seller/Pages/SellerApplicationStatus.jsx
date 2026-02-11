"use client";

import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function SellerApplicationStatus() {
  return (
    <section className="min-h-screen flex items-start justify-center px-4 pt-24">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-10 text-center space-y-6">
        
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Clock className="w-8 h-8 text-accent" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Application Under Review
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Thank you for registering as a seller on <b>CHIP</b>.
          <br />
          Your application is currently under review by our team.
        </p>

        <p className="text-sm text-muted-foreground">
          This usually takes <b>24–48 hours</b>.  
          We’ll notify you once your account is verified.
        </p>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-block rounded-md border border-border px-5 py-2 text-sm tracking-widest hover:bg-muted transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

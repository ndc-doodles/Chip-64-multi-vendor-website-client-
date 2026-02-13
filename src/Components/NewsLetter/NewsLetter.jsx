import React, { useState } from 'react';
import { Send } from 'lucide-react'; // Optional: install lucide-react for icons

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center">
        
        {/* Left Side: Visual/Text */}
        <div className="p-8 md:p-12 md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay in the <span className="text-primary">Loop.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Get exclusive deals on the latest tech and products delivered straight to your inbox.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12 md:w-1/2 w-full bg-zinc-900/50">
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-primary transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#7ad805] text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                Subscribe Now
                <Send size={18} />
              </button>
              <p className="text-center text-xs text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-primary text-3xl">✓</div>
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">You're on the list!</h3>
              <p className="text-gray-400">Check your inbox for a welcome surprise.</p>
              <button 
                onClick={() => setSubscribed(false)}
                className="mt-6 text-primary text-sm hover:underline"
              >
                Send to another email
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
import { useState } from "react";
import {
  BugPlay,
  Facebook,
  Twitter,
  Github,
  Linkedin,
  ChevronRight,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function BugTrackerFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      setEmail("");
      // In a real app, you would handle the subscription here
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BugPlay size={26} className="text-emerald-400" />
              <span className="text-white text-xl font-bold">BugTracker</span>
            </div>
            <p className="mb-6 text-slate-400">
              Helping development teams track, prioritize, and resolve bugs with
              unprecedented efficiency.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors duration-300"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors duration-300"
              >
                <Github size={18} />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Features", href: "#" },
                { name: "Pricing", href: "#" },
                { name: "Documentation", href: "#" },
                { name: "API Reference", href: "#" },
                { name: "Changelog", href: "#" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="inline-flex items-center hover:text-emerald-400 transition-colors duration-300"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "#" },
                { name: "Blog", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="inline-flex items-center hover:text-emerald-400 transition-colors duration-300"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Stay Updated
            </h3>
            <p className="mb-4 text-slate-400">
              Subscribe to our newsletter for the latest updates, tips, and
              features.
            </p>
            <div className="mb-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-slate-800 px-4 py-2 rounded-l-lg flex-grow focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            {subscribed && (
              <div className="text-emerald-400 text-sm mb-4">
                Thank you for subscribing!
              </div>
            )}
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Mail size={16} className="mr-2 text-emerald-400" />
                <span>support@bugtracker.com</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone size={16} className="mr-2 text-emerald-400" />
                <span>+91 8194078744</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin size={16} className="mr-2 text-emerald-400" />
                <span>Cantt, Bareilly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="mb-4 md:mb-0 text-sm text-slate-400">
              © {currentYear} BugTracker. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="hover:text-emerald-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-emerald-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-emerald-400 transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Top Curved Edge */}
      <div className="bg-slate-900 relative -mt-1">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-12 transform rotate-180 -translate-y-full"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,141.89,111.51,214.86,91.39A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-slate-900"
          ></path>
        </svg>
      </div>
    </footer>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEOHead from "@/components/SEOHead";

export default function Legal() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    <SEOHead
      title="Privacy Policy & Terms | Bradley Brown Inc"
      description="Bradley Brown Inc. Privacy Policy and Terms & Conditions for our website, SMS messaging service, and custom home building services in Mississippi."
      canonicalUrl="https://bradleybrowninc.com/legal"
      noindex={false}
    />
    <div className="min-h-screen bg-[#FAFAF8] pt-20">
      {/* Navigation Bar */}
      <div className="sticky top-20 bg-white border-b border-gray-200 shadow-sm z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex gap-4 overflow-x-auto">
            <button
              onClick={() => scrollToSection("privacy")}
              className="text-sm font-medium text-gray-600 hover:text-sky-400 whitespace-nowrap transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => scrollToSection("terms")}
              className="text-sm font-medium text-gray-600 hover:text-sky-400 whitespace-nowrap transition-colors"
            >
              Terms & Conditions
            </button>
            <Link
              to="/sms-optin"
              className="text-sm font-medium text-sky-500 hover:text-sky-600 whitespace-nowrap transition-colors font-semibold"
            >
              SMS Opt-In Policy →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Privacy Policy */}
        <section id="privacy" className="mb-16">
          <h1 className="text-3xl font-bold text-[#1E2D3D] mb-6 flex items-center gap-3">
            Privacy Policy
            <a href="#privacy" className="text-gray-300 hover:text-sky-400 transition-colors text-xl font-normal" title="Link to Privacy Policy">#</a>
          </h1>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6 text-gray-700 leading-relaxed">
            <p>
              <strong>Effective Date: January 1, 2024</strong>
            </p>
            <p>
              Bradley Brown Inc. ("Company," "we," "us," "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process personal information in connection with our websites, mobile applications, and services.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">1. Information We Collect</h3>
              <p>
                <strong>Information You Provide:</strong> We collect information you directly provide to us, including your name, email address, phone number, physical address, project details, budget information, and any communications you send us through our chat, contact forms, or quote requests.
              </p>
              <p className="mt-2">
                <strong>Automatic Information:</strong> When you visit our website, we automatically collect certain information about your device and browsing activity, including IP address, browser type, pages visited, and time spent on pages.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">2. How We Use Your Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and provide customer service</li>
                <li>Generate personalized project quotes and estimates</li>
                <li>Send you SMS messages (only with your explicit consent)</li>
                <li>Improve our services and website functionality</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and enhance security</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">3. Sharing Your Information</h3>
              <p>
                We do not sell, trade, or share your personal information with third parties for marketing purposes. Your information may be shared with:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Service providers who assist us in operating our website and conducting our business</li>
                <li>Our Twilio communications partner (for SMS messaging only with your consent)</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">4. Data Security</h3>
              <p>
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">5. Your Rights</h3>
              <p>
                You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at info@bradleybrownhomes.com. You can also opt out of marketing communications at any time.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">6. Contact Us</h3>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                Bradley Brown Inc.<br />
                Email: info@bradleybrownhomes.com<br />
                Phone: (844) 351-4154
                </p>
                </div>
                </div>
                </section>

                {/* Terms & Conditions */}
        <section id="terms" className="mb-16">
          <h1 className="text-3xl font-bold text-[#1E2D3D] mb-6 flex items-center gap-3">
            Terms & Conditions
            <a href="#terms" className="text-gray-300 hover:text-sky-400 transition-colors text-xl font-normal" title="Link to Terms & Conditions">#</a>
          </h1>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6 text-gray-700 leading-relaxed">
            <p>
              <strong>Effective Date: January 1, 2024</strong>
            </p>
            <p>
              These Terms and Conditions ("Terms") govern your access to and use of Bradley Brown Inc.'s website, mobile applications, and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">1. Program Name & Description</h3>
              <p>
                <strong>Program Name:</strong> Bradley Brown Inc. Custom Home Building & SMS Messaging Service
              </p>
              <p className="mt-2">
                <strong>Description:</strong> This program allows customers to receive SMS messages from Bradley Brown Inc. regarding project quotes, updates, and customer service communications.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">2. Message Frequency & Rates</h3>
              <p>
                Message frequency will vary based on your project and communications with us. Standard message and data rates from your mobile carrier may apply. We will never charge you for messages initiated by Bradley Brown Inc., but your carrier's standard rates apply.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">3. Support & Help</h3>
              <p>
                For support or to report issues with our messaging service, contact us at:
              </p>
              <p className="mt-2">
                Email: info@bradleybrownhomes.com<br />
                Phone: (844) 351-4154<br />
                Hours: Monday-Friday, 9am-5pm CST
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">4. Opt-Out Instructions</h3>
              <p>
                <strong>HELP:</strong> Text "HELP" to our number for additional support and information.
              </p>
              <p className="mt-2">
                <strong>STOP:</strong> You can opt out of SMS messages at any time by texting <strong>"STOP"</strong> to the number we use to message you. Upon receipt of a STOP message, we will no longer send you SMS messages.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">5. Use of Services</h3>
              <p>
                You agree to use our services only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of our services.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">6. Limitation of Liability</h3>
              <p>
                Bradley Brown Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the services.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">7. Modification of Terms</h3>
              <p>
                We reserve the right to modify these Terms at any time. Your continued use of our services following any such modification constitutes your acceptance of the updated Terms.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">8. Governing Law</h3>
              <p>
                These Terms are governed by and construed in accordance with the laws of the State of Mississippi, without regard to its conflict of law provisions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-3">9. Contact Information</h3>
              <p>
                For questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="mt-2">
                Bradley Brown Inc.<br />
                Email: info@bradleybrownhomes.com<br />
                Phone: (844) 351-4154
              </p>
            </div>
          </div>
        </section>

        {/* SMS Opt-In Link */}
        <div className="mb-10 bg-sky-50 border border-sky-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#1E2D3D] mb-1">SMS Opt-In Policy</h2>
            <p className="text-slate-500 text-sm">View our full SMS consent policy, opt-in methods, confirmation messages, and how to stop receiving texts.</p>
          </div>
          <Link to="/sms-optin" className="flex-shrink-0 inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
            View SMS Policy →
          </Link>
        </div>

        {/* Footer Links */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-sky-400 transition-colors"
            >
              ← Back to Home
            </Link>
            <a
              href="mailto:info@bradleybrownhomes.com"
              className="text-sm text-gray-600 hover:text-sky-400 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
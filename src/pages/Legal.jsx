import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function Legal() {
  const [smsOptIn, setSmsOptIn] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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
            <button
              onClick={() => scrollToSection("sms-optin")}
              className="text-sm font-medium text-gray-600 hover:text-sky-400 whitespace-nowrap transition-colors"
            >
              SMS Opt-In
            </button>
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
                Phone: (601) 234-5678
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
                Phone: (601) 234-5678<br />
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
                Phone: (601) 234-5678
              </p>
            </div>
          </div>
        </section>

        {/* SMS Opt-In */}
        <section id="sms-optin" className="mb-16">
          <h1 className="text-3xl font-bold text-[#1E2D3D] mb-6 flex items-center gap-3">
            SMS Opt-In & Consent
            <a href="#sms-optin" className="text-gray-300 hover:text-sky-400 transition-colors text-xl font-normal" title="Link to SMS Opt-In">#</a>
          </h1>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">SMS Messaging Information</h3>
                  <p className="text-sm text-blue-800">
                    Bradley Brown Inc. uses SMS messaging to provide you with project updates, quotes, and customer service. Standard message and data rates from your carrier may apply.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-4">How You Opt-In</h3>
              <p className="text-gray-700 mb-4">
                You opt-in to receive SMS messages from Bradley Brown Inc. by selecting one of the following actions:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-sky-400 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="font-semibold text-gray-800">During Quote Request</p>
                    <p className="text-sm text-gray-600">Agreeing to receive SMS updates when submitting a project quote through our AI Quote Assistant</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-sky-400 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="font-semibold text-gray-800">Live Chat Transfer</p>
                    <p className="text-sm text-gray-600">Selecting to transfer your chat conversation to a live agent via SMS messaging</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-sky-400 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="font-semibold text-gray-800">Text "START"</p>
                    <p className="text-sm text-gray-600">Texting "START" to Bradley Brown Inc.'s SMS number to enroll in our messaging service</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-4">Opt-In Confirmation</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-gray-800">You will receive this confirmation message:</p>
                <div className="bg-white border-l-4 border-sky-400 p-4 mt-3">
                  <p className="text-sm text-gray-700">
                    "Bradley Brown Inc. You are not opted in to sms messaging with Bradley Brown Inc. text STOP to opt out. Msg&Data rates may apply. Reply HELP for help."
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-4">Opting Out</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-3">
                  You can stop receiving SMS messages at any time by texting:
                </p>
                <p className="font-bold text-lg text-red-600 mb-3">STOP</p>
                <p className="text-sm text-gray-700">
                  Once we receive your STOP message, we will immediately cease sending you SMS messages. You will receive a confirmation message acknowledging your opt-out request.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#1E2D3D] mb-4">Getting Help</h3>
              <p className="text-gray-700 mb-3">
                For questions or support regarding SMS messaging, text:
              </p>
              <p className="font-semibold text-gray-800 mb-3">HELP</p>
              <p className="text-gray-700">
                Or contact us directly at (601) 234-5678 or info@bradleybrownhomes.com
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsOptIn}
                  onChange={(e) => setSmsOptIn(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-sky-400 mt-1 cursor-pointer"
                />
                <span className="text-sm text-gray-700">
                  I have read and understand the Privacy Policy, Terms & Conditions, and SMS Opt-In information. I agree to receive SMS messages from Bradley Brown Inc. regarding my project and customer service communications.
                </span>
              </label>
            </div>

            {smsOptIn && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-800">
                  You have acknowledged these terms. By proceeding with quotes or chat transfers, you're agreeing to receive SMS messages.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer Links */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to={createPageUrl("Home")}
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
  );
}
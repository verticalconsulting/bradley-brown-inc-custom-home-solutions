import React, { useRef } from "react";
import SEOHead from "@/components/SEOHead";
import { Download } from "lucide-react";

const TARGET_URL = "https://bradleybrowninc.com";
// High-resolution QR code generated via the goqr.me API (returns a real PNG)
const QR_IMAGE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${encodeURIComponent(
  TARGET_URL,
)}&margin=10&qzone=1&color=000000&bgcolor=ffffff`;

export default function QRCode() {
  const linkRef = useRef(null);

  const handleDownload = async () => {
    try {
      const res = await fetch(QR_IMAGE_URL);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bradley-brown-qr-code.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open the image in a new tab so the user can save it manually
      window.open(QR_IMAGE_URL, "_blank");
    }
  };

  return (
    <>
      <SEOHead
        title="Website QR Code"
        description="Download a QR code linking to the Bradley Brown Inc. website."
        noindex
      />
      <section className="min-h-[calc(100svh-5rem)] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-border p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Bradley Brown Inc. QR Code
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Scan to visit <span className="font-medium text-foreground">bradleybrowninc.com</span>
          </p>

          <div className="inline-block p-4 bg-white rounded-xl border border-border shadow-sm">
            <img
              src={QR_IMAGE_URL}
              alt="QR code linking to bradleybrowinc.com"
              width={300}
              height={300}
              className="w-64 h-64 sm:w-72 sm:h-72 object-contain"
            />
          </div>

          <button
            onClick={handleDownload}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 min-h-[48px] rounded-lg font-semibold hover:opacity-90 transition-colors">
            <Download className="w-5 h-5" /> Download QR Code
          </button>

          <p className="mt-4 text-xs text-muted-foreground">
            Right-click the image and select "Save image as" to save the PNG directly.
          </p>
          <a ref={linkRef} href={QR_IMAGE_URL} download className="hidden" aria-hidden="true">
            download
          </a>
        </div>
      </section>
    </>
  );
}
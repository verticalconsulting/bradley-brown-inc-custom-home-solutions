import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { MapPin, Camera, Loader2, CheckCircle, Upload } from "lucide-react";

const SERVICES = [
  { value: "custom_home", label: "Custom Home" },
  { value: "kitchen_remodel", label: "Kitchen Remodel" },
  { value: "bathroom_renovation", label: "Bathroom Renovation" },
  { value: "room_addition", label: "Room Addition" },
  { value: "outdoor_living", label: "Outdoor Living" },
  { value: "barndominium", label: "Barndominium" },
  { value: "repair_maintenance", label: "Repair / Maintenance" },
  { value: "other", label: "Other" },
];

const inputCls = "w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm";

export default function JobCheckinForm() {
  const [form, setForm] = useState({
    passcode: "",
    submitted_by: "",
    title: "",
    service: "",
    description: "",
    city: "",
    neighborhood: "",
    state: "MS",
    zip: "",
    latitude: "",
    longitude: "",
    checkin_date: new Date().toISOString().split("T")[0],
  });
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const captureGPS = () => {
    if (!navigator.geolocation) { setError("Geolocation not supported"); return; }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        update("latitude", pos.coords.latitude.toFixed(6));
        update("longitude", pos.coords.longitude.toFixed(6));
        setGpsLoading(false);
      },
      err => { setError("Could not get GPS: " + err.message); setGpsLoading(false); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handlePhotos = async (e) => {
    const input = e.target;
    const files = Array.from(input.files || []);
    if (!files.length) return;
    setUploading(true);
    setError("");
    const uploaded = [];
    const failed = [];
    // Upload in parallel — much faster on phones with several photos.
    const results = await Promise.allSettled(
      files.map(file => base44.integrations.Core.UploadFile({ file }))
    );
    results.forEach((r, i) => {
      if (r.status === "fulfilled" && r.value?.file_url) {
        uploaded.push(r.value.file_url);
      } else {
        failed.push(files[i]?.name || `photo ${i + 1}`);
      }
    });
    if (uploaded.length) setPhotos(p => [...p, ...uploaded]);
    if (failed.length) {
      setError(`Couldn't upload ${failed.length} photo${failed.length > 1 ? "s" : ""} (${failed.join(", ")}). Try smaller images or check your signal.`);
    }
    setUploading(false);
    // Reset input so the same file can be picked again after a failure.
    if (input) input.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.passcode) { setError("Passcode required"); return; }
    if (!form.title || !form.service || !form.city) { setError("Title, service, and city are required"); return; }
    if (uploading) { setError("Photos are still uploading — please wait a moment."); return; }

    setSubmitting(true);
    try {
      const res = await base44.functions.invoke("submitJobCheckin", {
        ...form,
        photos,
        latitude: form.latitude ? Number(form.latitude) : undefined,
        longitude: form.longitude ? Number(form.longitude) : undefined,
      });
      if (res.data?.success) {
        setDone(true);
      } else {
        setError(res.data?.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      setError(err?.message || "Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-white rounded-2xl border-2 border-green-300 shadow p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-[#1E2D3D] mb-1">Check-in submitted!</h3>
        <p className="text-slate-500 text-sm mb-4">Sent to admin for review. You'll see it on the site once approved.</p>
        <button
          onClick={() => { setDone(false); setForm({ ...form, title: "", description: "", neighborhood: "", latitude: "", longitude: "" }); setPhotos([]); }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg text-sm font-semibold"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow p-5 md:p-7 space-y-4">
      <div>
        <label className="block text-xs font-bold text-[#1E2D3D] uppercase mb-1">Crew Passcode *</label>
        <input type="password" value={form.passcode} onChange={e => update("passcode", e.target.value)} className={inputCls} placeholder="Enter shared passcode" />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#1E2D3D] uppercase mb-1">Your Name</label>
        <input type="text" value={form.submitted_by} onChange={e => update("submitted_by", e.target.value)} className={inputCls} placeholder="e.g. Brad" />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#1E2D3D] uppercase mb-1">Job Title *</label>
        <input type="text" required value={form.title} onChange={e => update("title", e.target.value)} className={inputCls} placeholder="e.g. Kitchen remodel — Magnolia Lane" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#1E2D3D] uppercase mb-1">Service *</label>
          <select required value={form.service} onChange={e => update("service", e.target.value)} className={inputCls}>
            <option value="">Select...</option>
            {SERVICES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#1E2D3D] uppercase mb-1">Date</label>
          <input type="date" value={form.checkin_date} onChange={e => update("checkin_date", e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#1E2D3D] uppercase mb-1">City *</label>
          <input type="text" required value={form.city} onChange={e => update("city", e.target.value)} className={inputCls} placeholder="Brandon" />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#1E2D3D] uppercase mb-1">Neighborhood</label>
          <input type="text" value={form.neighborhood} onChange={e => update("neighborhood", e.target.value)} className={inputCls} placeholder="Castlewoods" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#1E2D3D] uppercase mb-1">State</label>
          <input type="text" value={form.state} onChange={e => update("state", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#1E2D3D] uppercase mb-1">ZIP</label>
          <input type="text" value={form.zip} onChange={e => update("zip", e.target.value)} className={inputCls} placeholder="39042" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-bold text-[#1E2D3D] uppercase">GPS Coordinates</label>
          <button type="button" onClick={captureGPS} disabled={gpsLoading} className="flex items-center gap-1 text-xs bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-md font-semibold">
            {gpsLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <MapPin className="w-3 h-3" />} Capture from device
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input type="text" value={form.latitude} onChange={e => update("latitude", e.target.value)} className={inputCls} placeholder="Latitude" />
          <input type="text" value={form.longitude} onChange={e => update("longitude", e.target.value)} className={inputCls} placeholder="Longitude" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#1E2D3D] uppercase mb-1">What did you do?</label>
        <textarea rows={4} value={form.description} onChange={e => update("description", e.target.value)} className={`${inputCls} resize-none`} placeholder="Quick rundown of the work performed at this site..." />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#1E2D3D] uppercase mb-2">Photos</label>
        <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg py-6 cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-colors">
          {uploading ? <><Loader2 className="w-5 h-5 animate-spin text-sky-500" /> <span className="text-sm">Uploading...</span></> : <><Camera className="w-5 h-5 text-slate-400" /><span className="text-sm text-slate-500">Tap to add photos</span></>}
          <input type="file" accept="image/*" multiple capture="environment" onChange={handlePhotos} className="hidden" />
        </label>
        {photos.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mt-3">
            {photos.map((p, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
                <img src={p} alt="" width="100" height="100" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setPhotos(arr => arr.filter((_, j) => j !== i))} className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full">×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

      <button type="submit" disabled={submitting} className="w-full bg-[#C4922A] hover:bg-[#A37820] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><Upload className="w-4 h-4" /> Submit Check-In</>}
      </button>
    </form>
  );
}
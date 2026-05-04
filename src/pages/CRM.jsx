import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { MessageSquare, Plus, Search, Phone, Mail, Building2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobCheckinAdminPanel from "@/components/jobcheckin/JobCheckinAdminPanel";

export default function CRM() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [smsInput, setSmsInput] = useState("");
  const [sendingMessage, setSendingMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    project_type: "",
    status: "lead",
    notes: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const data = await base44.entities.Client.list("-updated_date", 100);
    setClients(data || []);
    setLoading(false);
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Name and phone are required");
      return;
    }
    await base44.entities.Client.create(formData);
    setFormData({ name: "", email: "", phone: "", company: "", project_type: "", status: "lead", notes: "" });
    setShowForm(false);
    fetchClients();
  };

  const handleSendSMS = async (client) => {
    if (!smsInput.trim()) {
      alert("Enter a message");
      return;
    }
    setSendingMessage(client.id);
    try {
      const response = await base44.functions.invoke('sendSMS', {
        to: client.phone,
        message: smsInput,
      });
      if (response.data.status === "success") {
        alert("SMS sent successfully!");
        setSmsInput("");
        setSelectedClient(null);
      } else {
        alert(`Error: ${response.data.error_message}`);
      }
    } catch (err) {
      alert(`Failed to send SMS: ${err.message}`);
    }
    setSendingMessage(null);
  };

  const filtered = clients.filter(
    c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         c.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#F3F4F6] pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1E2D3D] flex items-center gap-3">
            <Building2 className="w-8 h-8 text-sky-400" />
            Client CRM
          </h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-sky-400 hover:bg-sky-500 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Client
          </Button>
        </div>

        {/* Add Client Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-[#1E2D3D] mb-4">New Client</h2>
            <form onSubmit={handleAddClient} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Name *"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="border-gray-200"
              />
              <Input
                placeholder="Phone *"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="border-gray-200"
              />
              <Input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border-gray-200"
              />
              <Input
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="border-gray-200"
              />
              <select
                value={formData.project_type}
                onChange={(e) => setFormData({...formData, project_type: e.target.value})}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select Project Type</option>
                <option value="custom_home">Custom Home</option>
                <option value="renovation">Renovation</option>
                <option value="addition">Addition</option>
                <option value="outdoor">Outdoor Living</option>
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="lead">Lead</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="inactive">Inactive</option>
              </select>
              <textarea
                placeholder="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="md:col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                rows="3"
              />
              <div className="md:col-span-2 flex gap-3">
                <Button type="submit" className="flex-1 bg-sky-400 hover:bg-sky-500 text-white">
                  Save Client
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Jobsite Check-In Review */}
        <JobCheckinAdminPanel />

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-200"
          />
        </div>

        {/* Clients Grid */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-sky-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {clients.length === 0 ? "No clients yet. Add one to get started!" : "No results found."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-[#1E2D3D]">{client.name}</h3>
                  {client.company && (
                    <p className="text-sm text-gray-600">{client.company}</p>
                  )}
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <a href={`tel:${client.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-sky-400">
                    <Phone className="w-4 h-4" /> {client.phone}
                  </a>
                  {client.email && (
                    <a href={`mailto:${client.email}`} className="flex items-center gap-2 text-gray-600 hover:text-sky-400">
                      <Mail className="w-4 h-4" /> {client.email}
                    </a>
                  )}
                </div>

                <div className="mb-4 flex gap-2 flex-wrap">
                  <span className={`text-xs px-2.5 py-1 rounded-full ${
                    client.status === "lead" ? "bg-blue-100 text-blue-800" :
                    client.status === "active" ? "bg-green-100 text-green-800" :
                    client.status === "completed" ? "bg-gray-100 text-gray-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {client.status}
                  </span>
                  {client.project_type && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
                      {client.project_type}
                    </span>
                  )}
                </div>

                {selectedClient?.id === client.id ? (
                  <div className="space-y-2">
                    <textarea
                      placeholder="Enter SMS message..."
                      value={smsInput}
                      onChange={(e) => setSmsInput(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                      rows="3"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSendSMS(client)}
                        disabled={sendingMessage === client.id}
                        className="flex-1 bg-sky-400 hover:bg-sky-500 disabled:opacity-50 text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        {sendingMessage === client.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Send SMS
                      </button>
                      <button
                        onClick={() => {
                          setSelectedClient(null);
                          setSmsInput("");
                        }}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedClient(client)}
                    className="w-full bg-sky-50 hover:bg-sky-100 text-sky-400 px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" /> Send SMS
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
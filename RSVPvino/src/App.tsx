import { useState, useEffect } from 'react';
import { 
  Users, CheckCircle2, XCircle, Search, RefreshCw, Download, 
  ExternalLink, Plus, Lock, KeyRound, Heart, ShieldCheck, 
  Calendar, Phone, Mail
} from 'lucide-react';

interface RSVPItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  attending: string;
  guestsCount: number;
  events: string[];
  message: string;
  createdAt: string;
}

interface StatsData {
  totalSubmissions: number;
  attendingSubmissions: number;
  notAttendingSubmissions: number;
  totalGuests: number;
  receptionCount: number;
  marriageCount: number;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  const [rsvps, setRsvps] = useState<RSVPItem[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  
  // Add Entry Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: '',
    phone: '',
    email: '',
    attending: 'yes',
    guestsCount: 1,
    reception: true,
    marriage: true,
    message: ''
  });

  const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1quzVgJ3Vntt7N8pMxsioeyGEKjovaFfMBAQX65xPfso/edit?usp=sharing";

  // Check URL auth bypass or localStorage session
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === 'super' || urlParams.get('key') === 'vino' || localStorage.getItem('rsvpvino_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'vino&sam' || passcode.toLowerCase() === 'vinoliya' || passcode === '2026') {
      setIsAuthenticated(true);
      localStorage.setItem('rsvpvino_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Fetch RSVPs from Backend API (http://localhost:5000)
  const fetchRSVPData = async () => {
    setLoading(true);
    try {
      const [rsvpsRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/rsvps'),
        fetch('http://localhost:5000/api/rsvps/stats')
      ]);

      const rsvpsData = await rsvpsRes.json();
      const statsData = await statsRes.json();

      if (rsvpsData.success) {
        setRsvps(rsvpsData.rsvps.reverse());
      }
      if (statsData.success) {
        setStats(statsData.stats);
      }
    } catch (err) {
      console.error("Failed to fetch RSVP data from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRSVPData();
    }
  }, [isAuthenticated]);

  // Add guest manually
  const handleAddGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuest.name.trim()) return;

    const eventsList = [];
    if (newGuest.reception) eventsList.push('reception');
    if (newGuest.marriage) eventsList.push('marriage');

    const payload = {
      name: newGuest.name.trim(),
      phone: newGuest.phone.trim(),
      email: newGuest.email.trim(),
      attending: newGuest.attending,
      guestsCount: Number(newGuest.guestsCount) || 1,
      events: eventsList,
      message: newGuest.message.trim()
    };

    try {
      const res = await fetch('http://localhost:5000/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setNewGuest({ name: '', phone: '', email: '', attending: 'yes', guestsCount: 1, reception: true, marriage: true, message: '' });
        fetchRSVPData();
      }
    } catch (err) {
      console.error("Error adding entry:", err);
    }
  };

  // Export CSV Function
  const exportToCSV = () => {
    if (!rsvps.length) return;
    const headers = ['ID', 'Guest Name', 'Phone', 'Email', 'Attending', 'Guests Count', 'Events Attending', 'Message', 'Submitted Date'];
    const rows = rsvps.map(r => [
      r.id,
      `"${r.name}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      r.attending,
      r.guestsCount,
      `"${(r.events || []).join(', ')}"`,
      `"${(r.message || '').replace(/"/g, '""')}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RSVPvino_Guest_List_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered RSVPs
  const filteredRSVPs = rsvps.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'ATTENDING') return item.attending === 'yes';
    if (activeFilter === 'NOT_ATTENDING') return item.attending === 'no';
    if (activeFilter === 'RECEPTION') return item.events && item.events.includes('reception');
    if (activeFilter === 'MARRIAGE') return item.events && item.events.includes('marriage');

    return true;
  });

  // ================= LIGHT LAVENDER SUPER USER LOGIN SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8FC] text-[#4A3763] flex items-center justify-center p-4 font-['Inter',_sans-serif]">
        <div className="w-full max-w-md bg-[#F4EFF9]/90 border border-[#C8A97E]/50 rounded-3xl p-8 shadow-2xl backdrop-blur-xl text-center">
          <div className="w-16 h-16 rounded-full bg-[#EBE2F5] border border-[#C8A97E]/50 mx-auto flex items-center justify-center text-[#4A3763] mb-4 shadow-sm">
            <Lock size={28} />
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-[#8B73A6] font-bold block mb-1">
            SUPER USER PORTAL
          </span>
          <h1 className="text-3xl font-bold font-['Cinzel',_serif] text-[#4A3763] mb-2">
            RSVPvino Admin
          </h1>
          <p className="text-xs text-[#75628C] font-medium mb-6">
            Enter passcode to manage Vinoliya & Samdaniel's wedding RSVP guest list.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#8B73A6] mb-1.5">
                PASSCODE / KEY
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-3.5 text-[#A28BBF]" />
                <input
                  type="password"
                  placeholder="Enter passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#DDD0EB] rounded-xl text-[#4A3763] focus:outline-none focus:border-[#4A3763] text-sm font-medium"
                />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-rose-600 font-bold text-center">
                Incorrect passcode. Try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#4A3763] hover:bg-[#38284C] text-white rounded-xl text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md cursor-pointer active:scale-95"
            >
              ACCESS DASHBOARD →
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#DDD0EB] text-[11px] text-[#8B73A6] font-medium">
            Super User Secured Entry Point • <span className="text-[#4A3763] font-bold">RSVPvino</span>
          </div>
        </div>
      </div>
    );
  }

  // ================= LIGHT LAVENDER SUPER USER DASHBOARD SCREEN =================
  return (
    <div className="min-h-screen bg-[#FAF8FC] text-[#4A3763] font-['Inter',_sans-serif] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F4EFF9]/90 border border-[#C8A97E]/40 p-6 rounded-3xl backdrop-blur-xl shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#4A3763] flex items-center justify-center text-[#FAF8FC] shadow-sm">
              <ShieldCheck size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] bg-[#EBE2F5] text-[#4A3763] px-2.5 py-0.5 rounded-full font-bold border border-[#DDD0EB]">
                  SUPER USER PORTAL
                </span>
                <span className="text-xs text-[#8B73A6] font-bold">RSVPvino</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-['Cinzel',_serif] text-[#4A3763] tracking-wide mt-1">
                Vinoliya & Sam Daniel RSVP Dashboard
              </h1>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-[#F4EFF9] border border-[#C8A97E]/50 text-[#4A3763] px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <ExternalLink size={14} className="text-[#C8A97E]" />
              <span>OPEN GOOGLE SHEET</span>
            </a>

            <button
              onClick={exportToCSV}
              className="bg-white hover:bg-[#F4EFF9] border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Download size={14} className="text-emerald-600" />
              <span>EXPORT CSV</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#4A3763] hover:bg-[#38284C] text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Plus size={14} className="text-[#C8A97E]" />
              <span>ADD GUEST</span>
            </button>

            <button
              onClick={fetchRSVPData}
              disabled={loading}
              className="p-2.5 bg-white hover:bg-[#F4EFF9] border border-[#DDD0EB] text-[#4A3763] rounded-xl transition-all cursor-pointer shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </header>

        {/* Stats KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 border border-[#C8A97E]/30 p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B73A6] font-bold">TOTAL SUBMISSIONS</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-3xl font-bold text-[#4A3763] font-['Cinzel',_serif]">{stats?.totalSubmissions || rsvps.length}</span>
              <Users size={20} className="text-[#8B73A6]" />
            </div>
          </div>

          <div className="bg-white/80 border border-[#C8A97E]/30 p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B73A6] font-bold">CONFIRMED GUESTS</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-3xl font-bold text-emerald-700 font-['Cinzel',_serif]">{stats?.totalGuests || rsvps.reduce((s,r) => s + (r.attending === 'yes' ? r.guestsCount : 0), 0)}</span>
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
          </div>

          <div className="bg-white/80 border border-[#C8A97E]/30 p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B73A6] font-bold">RECEPTION ATTENDEES</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-3xl font-bold text-[#C8A97E] font-['Cinzel',_serif]">{stats?.receptionCount || rsvps.filter(r => r.events && r.events.includes('reception')).length}</span>
              <Calendar size={20} className="text-[#C8A97E]" />
            </div>
          </div>

          <div className="bg-white/80 border border-[#C8A97E]/30 p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B73A6] font-bold">HOLY MARRIAGE ATTENDEES</span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-3xl font-bold text-[#4A3763] font-['Cinzel',_serif]">{stats?.marriageCount || rsvps.filter(r => r.events && r.events.includes('marriage')).length}</span>
              <Heart size={20} className="text-[#4A3763]" />
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-[#F4EFF9]/90 border border-[#C8A97E]/30 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-3 text-[#A28BBF]" />
            <input
              type="text"
              placeholder="Search by guest name, phone, or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#DDD0EB] rounded-xl text-xs font-medium text-[#4A3763] focus:outline-none focus:border-[#4A3763]"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            {['ALL', 'ATTENDING', 'NOT_ATTENDING', 'RECEPTION', 'MARRIAGE'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === tab
                    ? 'bg-[#4A3763] text-white shadow-sm'
                    : 'bg-white text-[#75628C] hover:bg-[#EBE2F5] border border-[#DDD0EB]'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* RSVP Data Table */}
        <div className="bg-white border border-[#C8A97E]/40 rounded-2xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#4A3763]">
              <thead className="bg-[#F0EBF7] text-[10px] uppercase tracking-wider font-bold text-[#4A3763] border-b border-[#DDD0EB]">
                <tr>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4">GUEST NAME</th>
                  <th className="py-3.5 px-4">CONTACT</th>
                  <th className="py-3.5 px-4 text-center">GUESTS</th>
                  <th className="py-3.5 px-4">EVENTS ATTENDING</th>
                  <th className="py-3.5 px-4">WISHES / MESSAGE</th>
                  <th className="py-3.5 px-4 text-right">DATE SUBMITTED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD0EB]/60 font-['Inter',_sans-serif]">
                {filteredRSVPs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#8B73A6] font-medium">
                      No RSVP entries found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRSVPs.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F4EFF9]/80 transition-colors">
                      <td className="py-3.5 px-4">
                        {item.attending === 'yes' ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
                            <CheckCircle2 size={12} /> ATTENDING
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 border border-rose-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
                            <XCircle size={12} /> DECLINED
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-[#4A3763] text-sm font-['Cinzel',_serif]">
                        {item.name}
                      </td>

                      <td className="py-3.5 px-4 text-[#75628C] space-y-0.5">
                        {item.phone && <div className="flex items-center gap-1"><Phone size={12} /> <span>{item.phone}</span></div>}
                        {item.email && <div className="flex items-center gap-1"><Mail size={12} /> <span>{item.email}</span></div>}
                        {!item.phone && !item.email && <span className="text-[#A28BBF] italic">No contact provided</span>}
                      </td>

                      <td className="py-3.5 px-4 text-center font-bold text-[#4A3763] text-sm">
                        {item.guestsCount}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {(item.events || []).map((ev) => (
                            <span key={ev} className="bg-[#F0EBF7] text-[#4A3763] px-2 py-0.5 rounded text-[10px] uppercase font-bold border border-[#DDD0EB]">
                              {ev}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs truncate text-[#4A3763] italic">
                        {item.message ? `"${item.message}"` : <span className="text-[#A28BBF] not-italic">—</span>}
                      </td>

                      <td className="py-3.5 px-4 text-right text-[#8B73A6] text-[11px] font-medium">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Modal: Add Manual Guest Entry */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#38284C]/40 backdrop-blur-md">
          <div className="bg-[#FAF8FC] border border-[#C8A97E]/50 rounded-3xl p-6 w-full max-w-md shadow-2xl text-left">
            <h3 className="text-xl font-bold font-['Cinzel',_serif] text-[#4A3763] mb-4">Add Guest Entry</h3>

            <form onSubmit={handleAddGuestSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8B73A6] mb-1">GUEST NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  className="w-full p-2.5 bg-[#F4EFF9] border border-[#DDD0EB] rounded-xl text-[#4A3763] focus:outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8B73A6] mb-1">PHONE</label>
                  <input
                    type="tel"
                    placeholder="Mobile"
                    value={newGuest.phone}
                    onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                    className="w-full p-2.5 bg-[#F4EFF9] border border-[#DDD0EB] rounded-xl text-[#4A3763] focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#8B73A6] mb-1">GUESTS COUNT</label>
                  <input
                    type="number"
                    min={1}
                    value={newGuest.guestsCount}
                    onChange={(e) => setNewGuest({ ...newGuest, guestsCount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#F4EFF9] border border-[#DDD0EB] rounded-xl text-[#4A3763] focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8B73A6] mb-1">EVENTS ATTENDING</label>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[#4A3763] font-medium">
                    <input
                      type="checkbox"
                      checked={newGuest.reception}
                      onChange={(e) => setNewGuest({ ...newGuest, reception: e.target.checked })}
                      className="accent-[#4A3763]"
                    />
                    <span>Dinner & Reception</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[#4A3763] font-medium">
                    <input
                      type="checkbox"
                      checked={newGuest.marriage}
                      onChange={(e) => setNewGuest({ ...newGuest, marriage: e.target.checked })}
                      className="accent-[#4A3763]"
                    />
                    <span>Holy Marriage</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8B73A6] mb-1">WISHES / MESSAGE</label>
                <textarea
                  rows={2}
                  placeholder="Notes..."
                  value={newGuest.message}
                  onChange={(e) => setNewGuest({ ...newGuest, message: e.target.value })}
                  className="w-full p-2.5 bg-[#F4EFF9] border border-[#DDD0EB] rounded-xl text-[#4A3763] focus:outline-none resize-none font-medium"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 bg-[#EBE2F5] hover:bg-[#DFD3EC] text-[#4A3763] rounded-xl font-bold uppercase"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#4A3763] hover:bg-[#38284C] text-white rounded-xl font-bold uppercase"
                >
                  SAVE GUEST
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

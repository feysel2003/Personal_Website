import { useState, useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import axios from 'axios';
import { 
  Shield, Lock, LayoutDashboard, Plus, Trash2, Edit2, RefreshCw, Send, 
  FileText, Code, GraduationCap, Briefcase, Award, BarChart3, Users, Calendar 
} from 'lucide-react';

// API Base URL
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api";

const AdminDashboard = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  
  // --- GLOBAL DATA STATE ---
  const [activeTab, setActiveTab] = useState('projects'); 
  const [stats, setStats] = useState({ total: 0, weekly: 0, recentVisits: [] }); // <--- NEW: Stats
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [skills, setSkills] = useState([]);
  const [journey, setJourney] = useState([]);
  const [services, setServices] = useState([]);
  const [certs, setCerts] = useState([]);
  
  // --- FORM STATES ---

  // 1. Project Form
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const initialProjectForm = { title: '', description: '', category: 'WEB3', techStack: '', githubUrl: '', liveUrl: '', imageUrl: '' };
  const [formData, setFormData] = useState(initialProjectForm);

  // 2. Blog Form
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const initialBlogForm = { title: '', content: '', imageUrl: '', videoUrl: '', readTime: '5 min read', tags: '' };
  const [blogForm, setBlogForm] = useState(initialBlogForm);

  // 3. Skill Form
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const initialSkillForm = { name: '', category: 'Frontend', description: '', level: '50', iconName: 'Code' };
  const [skillForm, setSkillForm] = useState(initialSkillForm);

  // 4. Journey Form
  const [isEditingJourney, setIsEditingJourney] = useState(false);
  const [editingJourneyId, setEditingJourneyId] = useState(null);
  const initialJourneyForm = { 
    year: '', type: 'University', title: '', description: '', 
    instructor: '', skills: '', projectTitle: '', projectLink: '', orderId: 0 
  };
  const [journeyForm, setJourneyForm] = useState(initialJourneyForm);

  // 5. Service Form
  const [isEditingService, setIsEditingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const initialServiceForm = { title: '', description: '', icon: 'Code', price: '', features: '' };
  const [serviceForm, setServiceForm] = useState(initialServiceForm);

  // 6. Cert Form
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [editingCertId, setEditingCertId] = useState(null);
  const initialCertForm = { title: '', issuer: '', date: '', link: '', imageUrl: '' };
  const [certForm, setCertForm] = useState(initialCertForm);

  // 7. --- RESUME STATE ---
  const [resumeItems, setResumeItems] = useState([]);
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [editingResumeId, setEditingResumeId] = useState(null);
  const initialResumeForm = { type: 'Experience', title: '', organization: '', startDate: '', endDate: '', description: '', technologies: '' };
  const [resumeForm, setResumeForm] = useState(initialResumeForm);

  // --- AUTH & FETCH ---

  const handleLogin = async () => {
    try {
      const message = "Login to Portfolio Admin Panel";
      const signature = await signMessageAsync({ message });
      const res = await axios.post(`${API_URL}/auth/login`, { address, signature });
      setToken(res.data.token);
      localStorage.setItem('adminToken', res.data.token);
    } catch (error) {
      alert("Login Failed: You are not the admin.");
    }
  };

  const fetchData = async () => {
    if (!token) return;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      // Added Analytics Endpoint
      const [msgRes, projRes, postRes, skillRes, journeyRes, serviceRes, certRes, statsRes, resumeRes] = await Promise.all([
        axios.get(`${API_URL}/messages`, config),
        axios.get(`${API_URL}/projects`),
        axios.get(`${API_URL}/posts`),
        axios.get(`${API_URL}/skills`),
        axios.get(`${API_URL}/journey`),
        axios.get(`${API_URL}/services`),
        axios.get(`${API_URL}/certifications`),
        axios.get(`${API_URL}/analytics`, config),
        axios.get(`${API_URL}/resume`) // <--- NEW
      ]);
      
      setMessages(msgRes.data);
      setProjects(projRes.data);
      setPosts(postRes.data);
      setSkills(skillRes.data);
      setJourney(journeyRes.data);
      setServices(serviceRes.data);
      setCerts(certRes.data);
      setStats(statsRes.data);
      setResumeItems(resumeRes.data); // <--- NEW

    } catch (error) {
      if (error.response && (error.response.status === 400 || error.response.status === 401)) {
        setToken(null);
        localStorage.removeItem('adminToken');
      }
    }
  };

  useEffect(() => { fetchData(); }, [token, activeTab]);

  // --- HANDLERS ---

  //visitor log handlers
const handleDeleteLog = async (id) => {
    try {
      // FIX: Use axios + API_URL + Header
      await axios.delete(`${API_URL}/analytics/log/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      // Update UI instantly
      setStats(prev => ({
        ...prev,
        recentVisits: prev.recentVisits.filter(log => log._id !== id),
        total: Math.max(0, prev.total - 1)
      }));
    } catch (e) { 
      console.error("Delete Error:", e);
      alert("Failed to delete log."); 
    }
  };

  const handleClearLogs = async () => {
    if(!window.confirm("Are you sure you want to DELETE ALL LOGS?")) return;
    try {
      // FIX: Use axios + API_URL + Header
      await axios.delete(`${API_URL}/analytics/clear`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      // Clear UI instantly
      setStats(prev => ({ ...prev, recentVisits: [], total: 0, weekly: 0, monthly: 0, yearly: 0 }));
    } catch (e) { 
      console.error("Clear Error:", e);
      alert("Failed to clear logs."); 
    }
  };
  // Projects
  const handleSubmitProject = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = {
      ...formData,
      techStack: Array.isArray(formData.techStack) ? formData.techStack : formData.techStack.split(',').map(s => s.trim()).filter(s => s !== ""),
      githubUrl: formData.githubUrl === "" ? null : formData.githubUrl,
      liveUrl: formData.liveUrl === "" ? null : formData.liveUrl,
      imageUrl: formData.imageUrl === "" ? null : formData.imageUrl
    };
    try {
      if (isEditing) await axios.put(`${API_URL}/projects/${editingId}`, payload, config);
      else await axios.post(`${API_URL}/projects`, payload, config);
      alert("Success"); setFormData(initialProjectForm); setIsEditing(false); setEditingId(null); fetchData(); 
    } catch (e) { alert("Error"); }
  };
  const handleEditClick = (p) => { setFormData({...p, techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : p.techStack}); setIsEditing(true); setEditingId(p.id); setActiveTab('projects'); window.scrollTo(0,0); };
  const handleDeleteProject = async (id) => { if(confirm("Delete?")) { await axios.delete(`${API_URL}/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }};

  // Journey
  const handleSubmitJourney = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = { ...journeyForm, skills: Array.isArray(journeyForm.skills) ? journeyForm.skills : journeyForm.skills.split(',').map(s => s.trim()) };
    try { 
        if(isEditingJourney) await axios.put(`${API_URL}/journey/${editingJourneyId}`, payload, config);
        else await axios.post(`${API_URL}/journey`, payload, config); 
        alert("Success"); setJourneyForm(initialJourneyForm); setIsEditingJourney(false); setEditingJourneyId(null); fetchData(); 
    } catch(e) { alert("Error"); }
  };
  const handleEditJourney = (j) => { setJourneyForm({...j, skills: j.skills.join(', ')}); setIsEditingJourney(true); setEditingJourneyId(j.id); window.scrollTo(0,0); };
  const handleDeleteJourney = async (id) => { if(confirm("Delete?")) { await axios.delete(`${API_URL}/journey/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }};

  // Skills
  const handleSubmitSkill = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if(isEditingSkill) await axios.put(`${API_URL}/skills/${editingSkillId}`, skillForm, config);
      else await axios.post(`${API_URL}/skills`, skillForm, config);
      alert("Success"); setSkillForm(initialSkillForm); setIsEditingSkill(false); fetchData();
    } catch (e) { alert("Error"); }
  };
  const handleEditSkill = (s) => { setSkillForm(s); setIsEditingSkill(true); setEditingSkillId(s.id); window.scrollTo(0,0); };
  const handleDeleteSkill = async (id) => { if(confirm("Delete?")) { await axios.delete(`${API_URL}/skills/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }};

  // Services
  const handleSubmitService = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = { ...serviceForm, features: Array.isArray(serviceForm.features) ? serviceForm.features : serviceForm.features.split(',').map(s => s.trim()) };
    try {
      if(isEditingService) await axios.put(`${API_URL}/services/${editingServiceId}`, payload, config);
      else await axios.post(`${API_URL}/services`, payload, config);
      alert("Success"); setServiceForm(initialServiceForm); setIsEditingService(false); fetchData();
    } catch (e) { alert("Error"); }
  };
  const handleEditService = (s) => { setServiceForm({...s, features: s.features.join(', ')}); setIsEditingService(true); setEditingServiceId(s.id); window.scrollTo(0,0); };
  const handleDeleteService = async (id) => { if(confirm("Delete?")) { await axios.delete(`${API_URL}/services/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }};

  // Certs
  const handleSubmitCert = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = { ...certForm, link: certForm.link || null, imageUrl: certForm.imageUrl || null };
    try {
      if(isEditingCert) await axios.put(`${API_URL}/certifications/${editingCertId}`, payload, config);
      else await axios.post(`${API_URL}/certifications`, payload, config);
      alert("Success"); setCertForm(initialCertForm); setIsEditingCert(false); fetchData();
    } catch (e) { alert("Error"); }
  };
  const handleEditCert = (c) => { setCertForm(c); setIsEditingCert(true); setEditingCertId(c.id); window.scrollTo(0,0); };
  const handleDeleteCert = async (id) => { if(confirm("Delete?")) { await axios.delete(`${API_URL}/certifications/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }};

  // Blog
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = { ...blogForm, tags: Array.isArray(blogForm.tags) ? blogForm.tags : blogForm.tags.split(',').map(t => t.trim()), videoUrl: blogForm.videoUrl || null };
    try {
      if(isEditingPost) await axios.put(`${API_URL}/posts/${editingPostId}`, payload, config);
      else await axios.post(`${API_URL}/posts`, payload, config);
      alert("Success"); setBlogForm(initialBlogForm); setIsEditingPost(false); fetchData();
    } catch (e) { alert("Error"); }
  };
  const handleEditPost = (p) => { setBlogForm({...p, tags: p.tags.join(', ')}); setIsEditingPost(true); setEditingPostId(p.id); window.scrollTo(0,0); };
  const handleDeletePost = async (id) => { if(confirm("Delete?")) { await axios.delete(`${API_URL}/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }};

  // --- RESUME HANDLERS (Axios) ---
  const handleSubmitResume = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      if (isEditingResume) {
        await axios.put(`${API_URL}/resume/${editingResumeId}`, resumeForm, config);
        alert("Resume Item Updated!");
      } else {
        await axios.post(`${API_URL}/resume`, resumeForm, config);
        alert("Resume Item Added!");
      }
      setResumeForm(initialResumeForm);
      setIsEditingResume(false);
      setEditingResumeId(null);
      fetchData();
    } catch (e) { alert("Error saving resume item"); }
  };

  const handleEditResume = (item) => {
    setResumeForm(item);
    setIsEditingResume(true);
    setEditingResumeId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteResume = async (id) => {
    if(!window.confirm("Delete this resume item?")) return;
    try { 
      await axios.delete(`${API_URL}/resume/${id}`, { headers: { Authorization: `Bearer ${token}` } }); 
      fetchData(); 
    } catch (e) { alert("Delete failed"); }
  };

  // Messages
  const handleDeleteMessage = async (id) => { if(confirm("Delete?")) { await axios.delete(`${API_URL}/messages/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); }};

  // --- RENDER LOGIN ---
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-6 bg-gray-50 dark:bg-[#0f172a]">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 text-center max-w-md w-full shadow-xl">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Admin Portal</h1>
          {!isConnected ? <p className="text-red-500">Connect Wallet First</p> : (
            <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"><Lock size={18} /> Sign & Login</button>
          )}
        </div>
      </div>
    );
  }

  // --- RENDER DASHBOARD ---
  return (
    <div className="min-h-screen pt-24 px-6 pb-20 bg-gray-50 dark:bg-[#0f172a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-200 dark:border-slate-800 pb-4 gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white"><LayoutDashboard className="text-blue-600" /> Dashboard</h1>
          <div className="flex gap-4">
            <button onClick={fetchData} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"><RefreshCw size={20}/></button>
            <button onClick={() => { setToken(null); localStorage.removeItem('adminToken'); }} className="text-red-500 hover:text-red-600 font-medium">Logout</button>
          </div>
        </div>

        {/* === ANALYTICS SECTION === */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Total Views */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
             <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full"><BarChart3 size={24}/></div>
             <div>
               <p className="text-sm text-gray-500">Total Page Views</p>
               <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</h3>
             </div>
          </div>

          {/* Card 2: Weekly Views */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
             <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full"><Calendar size={24}/></div>
             <div>
               <p className="text-sm text-gray-500">This Week</p>
               <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats.weekly}</h3>
             </div>
          </div>

          {/* Card 3: Status */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
             <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full"><Users size={24}/></div>
             <div>
               <p className="text-sm text-gray-500">System Status</p>
               <h3 className="text-xl font-bold text-green-500">Live & Tracking</h3>
             </div>
          </div>
        </div>

       
        {/* === VISITOR LOG TABLE === */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm mb-10 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 dark:text-white">Recent Visitors Log</h3>
            <button 
              onClick={handleClearLogs}
              className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 border border-red-200 dark:border-red-900/30 px-3 py-1 rounded-full transition"
            >
              <Trash2 size={12} /> Clear All History
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-slate-950">
                <tr>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Device / Browser</th>
                  <th className="px-6 py-3">IP Address</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentVisits && stats.recentVisits.map((visit, i) => (
                  <tr key={visit._id || i} className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {new Date(visit.timestamp).toLocaleTimeString()} <span className="text-gray-500 text-xs block">{new Date(visit.timestamp).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">
                      {visit.city !== 'Unknown' && visit.city ? `${visit.city}, ` : ''}{visit.country}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {visit.browser} <span className="text-xs text-gray-400 block">{visit.os}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                      {visit.ip}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteLog(visit._id)}
                        className="text-gray-400 hover:text-red-500 transition p-1"
                        title="Delete Log"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {(!stats.recentVisits || stats.recentVisits.length === 0) && (
                   <tr><td colSpan="5" className="text-center py-6 text-gray-500">No data yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['projects', 'journey', 'skills', 'services', 'achievements', 'blog', 'messages', 'resume'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-medium transition capitalize whitespace-nowrap ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-slate-700'}`}>{tab}</button>
          ))}
        </div>

        {/* 1. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
             <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 lg:h-fit lg:sticky lg:top-24 shadow-lg">
               <h3 className="font-bold mb-4 text-gray-900 dark:text-white text-xl flex items-center gap-2">{isEditing ? <><Edit2 className="text-yellow-500"/> Edit</> : <><Plus className="text-blue-500"/> Add</>} Project</h3>
               <form onSubmit={handleSubmitProject} className="space-y-4">
                 <input placeholder="Title" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                 <select className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}><option value="WEB3">Web3</option><option value="MERN">MERN</option><option value="PERN">PERN</option><option value="UNIVERSITY">University</option><option value="SELF-TAUGHT">Self-Taught</option></select>
                 <textarea placeholder="Description" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                 <input placeholder="Tech Stack" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} />
                 <div className="grid grid-cols-2 gap-2"><input placeholder="GitHub" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-sm text-gray-900 dark:text-white" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} /><input placeholder="Live" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-sm text-gray-900 dark:text-white" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} /></div>
                 <input placeholder="Image URL" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-sm text-gray-900 dark:text-white" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                 <div className="flex gap-2"><button type="submit" className={`flex-1 py-3 rounded font-bold transition text-white ${isEditing ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}>{isEditing ? 'Update' : 'Create'}</button>{isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData(initialProjectForm); }} className="px-4 bg-gray-200 dark:bg-slate-700 rounded text-gray-900 dark:text-white">Cancel</button>}</div>
               </form>
             </div>
             <div className="lg:col-span-8 space-y-2">
               {projects.map(p => (<div key={p.id} className="bg-white dark:bg-slate-900 p-4 rounded border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm"><span className="text-gray-900 dark:text-white font-bold">{p.title}</span><div className="flex gap-2"><button onClick={() => handleEditClick(p)} className="text-yellow-500 p-2"><Edit2 size={18}/></button><button onClick={() => handleDeleteProject(p.id)} className="text-red-500 p-2"><Trash2 size={18}/></button></div></div>))}
             </div>
          </div>
        )}

        {/* 2. JOURNEY TAB */}
        {activeTab === 'journey' && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 lg:h-fit lg:sticky lg:top-24 shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><GraduationCap className="text-blue-500"/> {isEditingJourney ? 'Edit' : 'Add'} Journey</h3>
              <form onSubmit={handleSubmitJourney} className="space-y-4">
                <div className="grid grid-cols-2 gap-2"><input required placeholder="Year" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={journeyForm.year} onChange={e => setJourneyForm({...journeyForm, year: e.target.value})} /><input type="number" placeholder="Order" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={journeyForm.orderId} onChange={e => setJourneyForm({...journeyForm, orderId: e.target.value})} /></div>
                <select className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={journeyForm.type} onChange={e => setJourneyForm({...journeyForm, type: e.target.value})}><option value="University">University</option><option value="Self-Taught">Self-Taught</option><option value="Certification">Certification</option></select>
                <input required placeholder="Title" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={journeyForm.title} onChange={e => setJourneyForm({...journeyForm, title: e.target.value})} />
                <textarea required placeholder="Description" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={journeyForm.description} onChange={e => setJourneyForm({...journeyForm, description: e.target.value})} />
                <input placeholder="Instructor" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={journeyForm.instructor} onChange={e => setJourneyForm({...journeyForm, instructor: e.target.value})} />
                <input required placeholder="Skills" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={journeyForm.skills} onChange={e => setJourneyForm({...journeyForm, skills: e.target.value})} />
                <div className="grid grid-cols-2 gap-2"><input placeholder="Project" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={journeyForm.projectTitle} onChange={e => setJourneyForm({...journeyForm, projectTitle: e.target.value})} /><input placeholder="Link" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={journeyForm.projectLink} onChange={e => setJourneyForm({...journeyForm, projectLink: e.target.value})} /></div>
                <div className="flex gap-2"><button className="flex-1 bg-blue-600 text-white py-3 rounded">{isEditingJourney ? 'Update' : 'Add'}</button>{isEditingJourney && <button type="button" onClick={() => { setIsEditingJourney(false); setJourneyForm(initialJourneyForm); }} className="px-4 bg-slate-700 text-white rounded">Cancel</button>}</div>
              </form>
            </div>
            <div className="lg:col-span-7 space-y-4">
              {journey.map(j => (<div key={j.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm"><div><h4 className="font-bold text-gray-900 dark:text-white">{j.title}</h4><div className="text-xs text-gray-500">{j.year}</div></div><div className="flex gap-2"><button onClick={() => handleEditJourney(j)} className="text-yellow-500 p-2"><Edit2 size={18}/></button><button onClick={() => handleDeleteJourney(j.id)} className="text-red-500 p-2"><Trash2 size={18}/></button></div></div>))}
            </div>
          </div>
        )}

        {/* 3. SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 lg:h-fit lg:sticky lg:top-24 shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><Code className="text-purple-500"/> {isEditingSkill ? 'Edit' : 'Add'} Skill</h3>
              <form onSubmit={handleSubmitSkill} className="space-y-4">
                <input required placeholder="Name" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} />
                <select className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})}><option value="Academic">Academic</option><option value="Frontend">Frontend</option><option value="Backend">Backend</option><option value="Web3">Web3</option></select>
                <select className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={skillForm.iconName} onChange={e => setSkillForm({...skillForm, iconName: e.target.value})}><option value="Code">Code</option><option value="Database">Database</option><option value="Server">Server</option><option value="Globe">Web</option><option value="Terminal">Terminal</option><option value="Cpu">CPU</option><option value="Shield">Security</option></select>
                <input required placeholder="Description" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={skillForm.description} onChange={e => setSkillForm({...skillForm, description: e.target.value})} />
                <div className="flex items-center gap-2"><span className="text-sm">{skillForm.level}%</span><input type="range" min="0" max="100" className="flex-1" value={skillForm.level} onChange={e => setSkillForm({...skillForm, level: e.target.value})} /></div>
                <div className="flex gap-2"><button className="flex-1 bg-purple-600 text-white py-3 rounded">{isEditingSkill ? 'Update' : 'Add'}</button>{isEditingSkill && <button type="button" onClick={() => { setIsEditingSkill(false); setSkillForm(initialSkillForm); }} className="px-4 bg-slate-700 text-white rounded">Cancel</button>}</div>
              </form>
            </div>
            <div className="lg:col-span-8 space-y-2">
              {skills.map(s => (<div key={s.id} className="bg-white dark:bg-slate-900 p-4 rounded border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm"><div className="flex items-center gap-3"><span className="font-bold text-gray-900 dark:text-white">{s.name}</span><span className="text-xs bg-gray-100 dark:bg-slate-950 px-2 py-1 rounded text-gray-500">{s.category}</span></div><div className="flex gap-2"><button onClick={() => handleEditSkill(s)} className="text-yellow-500 p-2"><Edit2 size={18}/></button><button onClick={() => handleDeleteSkill(s.id)} className="text-red-500 p-2"><Trash2 size={18}/></button></div></div>))}
            </div>
          </div>
        )}

        {/* 4. SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 lg:h-fit lg:sticky lg:top-24 shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><Briefcase className="text-blue-500"/> {isEditingService ? 'Edit' : 'Add'} Service</h3>
              <form onSubmit={handleSubmitService} className="space-y-4">
                <input required placeholder="Title" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} />
                <select className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={serviceForm.icon} onChange={e => setServiceForm({...serviceForm, icon: e.target.value})}><option value="Code">Code</option><option value="Smartphone">Mobile</option><option value="Globe">Web</option><option value="Server">Backend</option><option value="Cpu">Web3</option><option value="PenTool">Design</option></select>
                <textarea required placeholder="Desc" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} />
                <input required placeholder="Features" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={serviceForm.features} onChange={e => setServiceForm({...serviceForm, features: e.target.value})} />
                <input placeholder="Price" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={serviceForm.price} onChange={e => setServiceForm({...serviceForm, price: e.target.value})} />
                <div className="flex gap-2"><button className="flex-1 bg-blue-600 text-white py-3 rounded">{isEditingService ? 'Update' : 'Add'}</button>{isEditingService && <button type="button" onClick={() => { setIsEditingService(false); setServiceForm(initialServiceForm); }} className="px-4 bg-slate-700 text-white rounded">Cancel</button>}</div>
              </form>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {services.map(s => (<div key={s.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm"><div><h4 className="font-bold text-gray-900 dark:text-white">{s.title}</h4></div><div className="flex gap-2"><button onClick={() => handleEditService(s)} className="text-yellow-500 p-2"><Edit2 size={18}/></button><button onClick={() => handleDeleteService(s.id)} className="text-red-500 p-2"><Trash2 size={18}/></button></div></div>))}
            </div>
          </div>
        )}

        {/* 5. ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 lg:h-fit lg:sticky lg:top-24 shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><Award className="text-yellow-500"/> {isEditingCert ? 'Edit' : 'Add'} Cert</h3>
              <form onSubmit={handleSubmitCert} className="space-y-4">
                <input required placeholder="Title" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={certForm.title} onChange={e => setCertForm({...certForm, title: e.target.value})} />
                <input required placeholder="Issuer" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={certForm.issuer} onChange={e => setCertForm({...certForm, issuer: e.target.value})} />
                <input required placeholder="Date" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={certForm.date} onChange={e => setCertForm({...certForm, date: e.target.value})} />
                <input placeholder="Link" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={certForm.link} onChange={e => setCertForm({...certForm, link: e.target.value})} />
                <input placeholder="Image URL" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={certForm.imageUrl} onChange={e => setCertForm({...certForm, imageUrl: e.target.value})} />
                <div className="flex gap-2"><button className="flex-1 bg-yellow-600 text-white py-3 rounded">{isEditingCert ? 'Update' : 'Add'}</button>{isEditingCert && <button type="button" onClick={() => { setIsEditingCert(false); setCertForm(initialCertForm); }} className="px-4 bg-slate-700 text-white rounded">Cancel</button>}</div>
              </form>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {certs.map(c => (<div key={c.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm"><div><h4 className="font-bold text-gray-900 dark:text-white">{c.title}</h4></div><div className="flex gap-2"><button onClick={() => handleEditCert(c)} className="text-yellow-500 p-2"><Edit2 size={18}/></button><button onClick={() => handleDeleteCert(c.id)} className="text-red-500 p-2"><Trash2 size={18}/></button></div></div>))}
            </div>
          </div>
        )}

        {/* 6. BLOG TAB */}
        {activeTab === 'blog' && (
           <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
             <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 lg:h-fit lg:sticky lg:top-24 shadow-lg dark:shadow-none">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><FileText className="text-green-500"/> {isEditingPost ? 'Edit' : 'Write'} Article</h3>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <input required placeholder="Title" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} />
                  <textarea required rows="10" placeholder="Markdown..." className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none font-mono text-sm text-gray-900 dark:text-white" value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} />
                  <div className="grid grid-cols-2 gap-2"><input placeholder="Time" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={blogForm.readTime} onChange={e => setBlogForm({...blogForm, readTime: e.target.value})} /><input placeholder="Tags" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={blogForm.tags} onChange={e => setBlogForm({...blogForm, tags: e.target.value})} /></div>
                  <input placeholder="Image URL" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={blogForm.imageUrl} onChange={e => setBlogForm({...blogForm, imageUrl: e.target.value})} />
                  <input placeholder="Video URL" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={blogForm.videoUrl} onChange={e => setBlogForm({...blogForm, videoUrl: e.target.value})} />
                  <div className="flex gap-2"><button className="flex-1 bg-green-600 text-white py-3 rounded">{isEditingPost ? 'Update' : 'Publish'}</button>{isEditingPost && <button type="button" onClick={() => { setIsEditingPost(false); setBlogForm(initialBlogForm); }} className="px-4 bg-slate-700 text-white rounded">Cancel</button>}</div>
                </form>
             </div>
             <div className="lg:col-span-7 space-y-4">
               {posts.map(p => (<div key={p.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm"><span className="font-bold text-gray-900 dark:text-white">{p.title}</span><div className="flex gap-2"><button onClick={() => handleEditPost(p)} className="text-yellow-500 p-2"><Edit2 size={18}/></button><button onClick={() => handleDeletePost(p.id)} className="text-red-500 p-2"><Trash2 size={18}/></button></div></div>))}
             </div>
           </div>
        )}

{/* === RESUME TAB === */}
        {activeTab === 'resume' && (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 h-fit sticky top-24 shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <FileText className="text-blue-500"/> {isEditingResume ? 'Edit Item' : 'Add Item'}
              </h3>
              <form onSubmit={handleSubmitResume} className="space-y-4">
                
                <select className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white"
                  value={resumeForm.type} onChange={e => setResumeForm({...resumeForm, type: e.target.value})}>
                  <option value="Experience">Experience</option>
                  <option value="Education">Education</option>
                </select>

                <input required placeholder="Title / Degree" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                  value={resumeForm.title} onChange={e => setResumeForm({...resumeForm, title: e.target.value})} />
                
                <input required placeholder="Organization / University" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                  value={resumeForm.organization} onChange={e => setResumeForm({...resumeForm, organization: e.target.value})} />
                
                <div className="grid grid-cols-2 gap-2">
                  <input required placeholder="Start Year" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                    value={resumeForm.startDate} onChange={e => setResumeForm({...resumeForm, startDate: e.target.value})} />
                  <input required placeholder="End Year" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                    value={resumeForm.endDate} onChange={e => setResumeForm({...resumeForm, endDate: e.target.value})} />
                </div>

                <textarea required placeholder="Description..." rows="3" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                  value={resumeForm.description} onChange={e => setResumeForm({...resumeForm, description: e.target.value})} />

                <input placeholder="Technologies (comma separated)" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                  value={resumeForm.technologies} onChange={e => setResumeForm({...resumeForm, technologies: e.target.value})} />

                <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-bold transition">
                        {isEditingResume ? 'Update' : 'Add'}
                    </button>
                    {isEditingResume && (
                        <button type="button" onClick={() => { setIsEditingResume(false); setResumeForm(initialResumeForm); }} className="px-4 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white rounded">
                          Cancel
                        </button>
                    )}
                </div>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-8 space-y-4">
              {resumeItems.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${item.type === 'Experience' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'bg-green-100 dark:bg-green-900/30 text-green-600'}`}>
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-500">{item.startDate} - {item.endDate}</span>
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.organization}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditResume(item)} className="text-yellow-500 p-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 rounded"><Edit2 size={18}/></button>
                    <button onClick={() => handleDeleteResume(item.id)} className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
              {resumeItems.length === 0 && <p className="text-gray-500 text-center col-span-full">No resume items yet.</p>}
            </div>
          </div>
        )}
        
        {/* 7. MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="grid gap-4">
            {messages.length === 0 && <p className="text-gray-500 text-center py-10">No messages yet.</p>}
            {messages.map((msg) => (
              <div key={msg._id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start gap-4 shadow-sm">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2"><h3 className="font-bold text-lg text-gray-900 dark:text-white">{msg.name}</h3></div>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">{msg.email}</p>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-950/50 p-3 rounded-lg">{msg.message}</p>
                </div>
                <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                  <a href={`mailto:${msg.email}`} className="flex-1 md:flex-none p-2 bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-600 hover:text-white flex justify-center"><Send size={18} /></a>
                  <button onClick={() => handleDeleteMessage(msg._id)} className="flex-1 md:flex-none p-2 bg-red-100 dark:bg-red-600/20 text-red-600 dark:text-red-400 rounded hover:bg-red-600 hover:text-white flex justify-center"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
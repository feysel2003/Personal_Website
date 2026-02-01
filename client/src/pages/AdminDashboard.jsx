import { useState, useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import axios from 'axios';
import { Shield, Lock, LayoutDashboard, Mail, Plus, Trash2, Edit2, ExternalLink, RefreshCw, Send, FileText, Code, Database, Server, Globe, Terminal, Cpu, Shield as ShieldIcon, GraduationCap } from 'lucide-react';

// API Base URL
const API_URL = "http://localhost:5000/api";

const AdminDashboard = () => {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  
  // --- GLOBAL DATA STATE ---
  const [activeTab, setActiveTab] = useState('projects'); 
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [skills, setSkills] = useState([]);
  const [journey, setJourney] = useState([]); // Journey Data
  
  // --- FORM STATES & EDITING STATES ---

  // 1. Project Form
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const initialProjectForm = { title: '', description: '', category: 'WEB3', techStack: '', githubUrl: '', liveUrl: '', imageUrl: '' };
  const [formData, setFormData] = useState(initialProjectForm);

  // 2. Blog Form
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const initialBlogForm = { title: '', content: '', imageUrl: '', readTime: '5 min read', tags: '' };
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
      const [msgRes, projRes, postRes, skillRes, journeyRes] = await Promise.all([
        axios.get(`${API_URL}/messages`, config),
        axios.get(`${API_URL}/projects`),
        axios.get(`${API_URL}/posts`),
        axios.get(`${API_URL}/skills`),
        axios.get(`${API_URL}/journey`)
      ]);
      setMessages(msgRes.data);
      setProjects(projRes.data);
      setPosts(postRes.data);
      setSkills(skillRes.data);
      setJourney(journeyRes.data);
    } catch (error) {
      if (error.response && (error.response.status === 400 || error.response.status === 401)) {
        setToken(null);
        localStorage.removeItem('adminToken');
      }
    }
  };

  useEffect(() => { fetchData(); }, [token, activeTab]);

  // --- HANDLERS ---

  // 1. Projects
  const handleSubmitProject = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = {
      ...formData,
      techStack: Array.isArray(formData.techStack) ? formData.techStack : formData.techStack.split(',').map(s => s.trim())
    };
    try {
      if (isEditing) await axios.put(`${API_URL}/projects/${editingId}`, payload, config);
      else await axios.post(`${API_URL}/projects`, payload, config);
      alert("Project Saved!");
      setFormData(initialProjectForm);
      setIsEditing(false);
      setEditingId(null);
      fetchData(); 
    } catch (error) { alert("Operation failed"); }
  };

  const handleEditClick = (p) => {
    setFormData({ ...p, techStack: p.techStack.join(', ') });
    setIsEditing(true);
    setEditingId(p.id);
    setActiveTab('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleDeleteProject = async (id) => {
    if(!window.confirm("Delete project?")) return;
    try { await axios.delete(`${API_URL}/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); } catch (e) { alert("Delete failed"); }
  };

  // 2. Blog
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = { 
        ...blogForm, 
        tags: Array.isArray(blogForm.tags) ? blogForm.tags : blogForm.tags.split(',').map(t => t.trim()) 
    };
    try {
      if (isEditingPost) await axios.put(`${API_URL}/posts/${editingPostId}`, payload, config);
      else await axios.post(`${API_URL}/posts`, payload, config);
      alert("Saved!");
      setBlogForm(initialBlogForm);
      setIsEditingPost(false);
      setEditingPostId(null);
      fetchData();
    } catch (error) { alert("Failed"); }
  };

  const handleEditPost = (post) => {
    setBlogForm({ ...post, tags: post.tags.join(', ') });
    setIsEditingPost(true);
    setEditingPostId(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleDeletePost = async (id) => {
    if(!window.confirm("Delete?")) return;
    try { await axios.delete(`${API_URL}/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); } catch (e) { alert("Delete failed"); }
  };

  // 3. Skills
  const handleSubmitSkill = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (isEditingSkill) await axios.put(`${API_URL}/skills/${editingSkillId}`, skillForm, config);
      else await axios.post(`${API_URL}/skills`, skillForm, config);
      alert("Skill Saved!");
      setSkillForm(initialSkillForm);
      setIsEditingSkill(false);
      setEditingSkillId(null);
      fetchData();
    } catch (error) { alert("Failed"); }
  };

  const handleEditSkill = (skill) => {
    setSkillForm(skill);
    setIsEditingSkill(true);
    setEditingSkillId(skill.id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const handleDeleteSkill = async (id) => {
    if(!window.confirm("Delete?")) return;
    try { await axios.delete(`${API_URL}/skills/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); } catch (e) { alert("Delete failed"); }
  };

  // 4. Journey
  const handleSubmitJourney = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const payload = {
      ...journeyForm,
      skills: Array.isArray(journeyForm.skills) ? journeyForm.skills : journeyForm.skills.split(',').map(s => s.trim())
    };
    try { 
        if(isEditingJourney) await axios.put(`${API_URL}/journey/${editingJourneyId}`, payload, config);
        else await axios.post(`${API_URL}/journey`, payload, config); 
        alert("Journey Saved!"); 
        setJourneyForm(initialJourneyForm); 
        setIsEditingJourney(false);
        setEditingJourneyId(null);
        fetchData(); 
    }
    catch(e) { alert("Error"); }
  };

  const handleEditJourney = (item) => {
      setJourneyForm({ ...item, skills: item.skills.join(', ') });
      setIsEditingJourney(true);
      setEditingJourneyId(item.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteJourney = async (id) => {
      if(!window.confirm("Delete?")) return;
      try { await axios.delete(`${API_URL}/journey/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); } catch (e) { alert("Delete failed"); }
  }

  // 5. Messages
  const handleDeleteMessage = async (id) => {
    if(!window.confirm("Delete?")) return;
    try { await axios.delete(`${API_URL}/messages/${id}`, { headers: { Authorization: `Bearer ${token}` } }); fetchData(); } catch (e) { alert("Delete failed"); }
  };

  // --- RENDER ---

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-6 bg-gray-50 dark:bg-[#0f172a]">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 text-center max-w-md w-full shadow-xl">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Admin Portal</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Authenticate via Blockchain</p>
          {!isConnected ? <p className="text-red-500">Connect Wallet First</p> : (
            <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition">
              <Lock size={18} /> Sign & Login
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-20 bg-gray-50 dark:bg-[#0f172a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-200 dark:border-slate-800 pb-4 gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <LayoutDashboard className="text-blue-600" /> Dashboard
          </h1>
          <div className="flex gap-4">
            <button onClick={fetchData} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"><RefreshCw size={20}/></button>
            <button onClick={() => { setToken(null); localStorage.removeItem('adminToken'); }} className="text-red-500 hover:text-red-600 font-medium">Logout</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['projects', 'blog', 'skills', 'journey', 'messages'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)} 
              className={`px-4 py-2 rounded-lg font-medium transition capitalize whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-slate-700'
              }`}
            >
              {tab === 'messages' ? `Inbox (${messages.length})` : `${tab} Manager`}
            </button>
          ))}
        </div>

        {/* ================= JOURNEY TAB ================= */}
        {activeTab === 'journey' && (
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 h-fit sticky top-24 shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><GraduationCap className="text-blue-500"/> {isEditingJourney ? 'Edit Journey' : 'Add Journey Node'}</h3>
              <form onSubmit={handleSubmitJourney} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-2">
                  <input required placeholder="Year/Sem" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                    value={journeyForm.year} onChange={e => setJourneyForm({...journeyForm, year: e.target.value})} />
                  
                  <input type="number" placeholder="Order ID" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                    value={journeyForm.orderId} onChange={e => setJourneyForm({...journeyForm, orderId: e.target.value})} />
                </div>

                <select className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white"
                  value={journeyForm.type} onChange={e => setJourneyForm({...journeyForm, type: e.target.value})}>
                  <option value="University">University</option>
                  <option value="Self-Taught">Self-Taught</option>
                  <option value="Certification">Certification</option>
                </select>

                <input required placeholder="Title (e.g. OOP Mastery)" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                  value={journeyForm.title} onChange={e => setJourneyForm({...journeyForm, title: e.target.value})} />

                <textarea required placeholder="Description..." className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                  value={journeyForm.description} onChange={e => setJourneyForm({...journeyForm, description: e.target.value})} />

                <input placeholder="Instructor" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                  value={journeyForm.instructor} onChange={e => setJourneyForm({...journeyForm, instructor: e.target.value})} />

                <input required placeholder="Skills (comma separated)" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                  value={journeyForm.skills} onChange={e => setJourneyForm({...journeyForm, skills: e.target.value})} />

                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="Project Name" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                    value={journeyForm.projectTitle} onChange={e => setJourneyForm({...journeyForm, projectTitle: e.target.value})} />
                  <input placeholder="Project Link (URL)" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                    value={journeyForm.projectLink} onChange={e => setJourneyForm({...journeyForm, projectLink: e.target.value})} />
                </div>

                <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-bold transition">
                        {isEditingJourney ? 'Update Journey' : 'Add Journey'}
                    </button>
                    {isEditingJourney && (
                        <button type="button" onClick={() => { setIsEditingJourney(false); setJourneyForm(initialJourneyForm); }} className="px-4 bg-gray-200 dark:bg-slate-700 rounded hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white">
                          Cancel
                        </button>
                    )}
                </div>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-7 space-y-4">
              {journey.map(j => (
                <div key={j.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{j.title}</h4>
                    <div className="text-xs text-gray-500">{j.year} • {j.type}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditJourney(j)} className="text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 p-2 rounded"><Edit2 size={18}/></button>
                    <button onClick={() => handleDeleteJourney(j.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
              {journey.length === 0 && <p className="text-gray-500 text-center">No journey history yet.</p>}
            </div>
          </div>
        )}

        {/* ================= SKILLS TAB ================= */}
        {activeTab === 'skills' && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 h-fit sticky top-24 shadow">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><Code className="text-purple-500"/> {isEditingSkill ? 'Edit Skill' : 'Add Skill'}</h3>
              <form onSubmit={handleSubmitSkill} className="space-y-4">
                <input required placeholder="Skill Name" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                  value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} />
                <select className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white"
                  value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})}>
                  <option value="Academic">Academic</option><option value="Frontend">Frontend</option><option value="Backend">Backend</option><option value="Web3">Web3</option>
                </select>
                <select className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white"
                  value={skillForm.iconName} onChange={e => setSkillForm({...skillForm, iconName: e.target.value})}>
                  <option value="Code">Code</option><option value="Database">Database</option><option value="Server">Server</option><option value="Globe">Web</option><option value="Terminal">Terminal</option><option value="Cpu">CPU</option><option value="Shield">Security</option>
                </select>
                <input required placeholder="Description" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                  value={skillForm.description} onChange={e => setSkillForm({...skillForm, description: e.target.value})} />
                <div className="flex items-center gap-2"><span className="text-sm text-gray-500">{skillForm.level}%</span><input type="range" min="0" max="100" className="flex-1" value={skillForm.level} onChange={e => setSkillForm({...skillForm, level: e.target.value})} /></div>
                
                <div className="flex gap-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-bold transition">{isEditingSkill ? 'Update' : 'Add'}</button>
                    {isEditingSkill && <button type="button" onClick={() => { setIsEditingSkill(false); setSkillForm(initialSkillForm); }} className="px-4 bg-slate-700 text-white rounded">Cancel</button>}
                </div>
              </form>
            </div>
            <div className="lg:col-span-8 space-y-2">
              {skills.map(s => (
                <div key={s.id} className="bg-white dark:bg-slate-900 p-4 rounded border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-3"><span className="font-bold text-gray-900 dark:text-white">{s.name}</span><span className="text-xs bg-gray-100 dark:bg-slate-950 px-2 py-1 rounded text-gray-500">{s.category} ({s.level}%)</span></div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditSkill(s)} className="text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 p-2 rounded"><Edit2 size={18}/></button>
                    <button onClick={() => handleDeleteSkill(s.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === BLOG TAB === */}
        {activeTab === 'blog' && (
           <div className="grid lg:grid-cols-12 gap-8">
             <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 h-fit sticky top-24 shadow-lg dark:shadow-none">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><FileText className="text-green-500"/> {isEditingPost ? 'Edit Article' : 'Write Article'}</h3>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <input required placeholder="Title" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                    value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} />
                  <textarea required rows="10" placeholder="Markdown Content..." className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none font-mono text-sm text-gray-900 dark:text-white" 
                    value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} />
                  <div className="grid grid-cols-2 gap-2">
                    <input placeholder="Read Time" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={blogForm.readTime} onChange={e => setBlogForm({...blogForm, readTime: e.target.value})} />
                    <input placeholder="Tags" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={blogForm.tags} onChange={e => setBlogForm({...blogForm, tags: e.target.value})} />
                  </div>
                  <input placeholder="Cover Image URL" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                    value={blogForm.imageUrl} onChange={e => setBlogForm({...blogForm, imageUrl: e.target.value})} />
                  <div className="flex gap-2">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded font-bold transition">{isEditingPost ? 'Update' : 'Publish'}</button>
                    {isEditingPost && <button type="button" onClick={() => { setIsEditingPost(false); setBlogForm(initialBlogForm); }} className="px-4 bg-slate-700 text-white rounded">Cancel</button>}
                  </div>
                </form>
             </div>
             <div className="lg:col-span-7 space-y-4">
               {posts.map(p => (
                 <div key={p.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm">
                    <span className="font-bold text-gray-900 dark:text-white">{p.title}</span>
                    <div className="flex gap-2">
                        <button onClick={() => handleEditPost(p)} className="text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 p-2 rounded"><Edit2 size={18}/></button>
                        <button onClick={() => handleDeletePost(p.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded"><Trash2 size={18}/></button>
                    </div>
                 </div>
               ))}
             </div>
           </div>
        )}

        {/* === MESSAGES TAB === */}
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
        
        {/* === PROJECTS TAB === */}
        {activeTab === 'projects' && (
          <div className="grid lg:grid-cols-12 gap-8">
             <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 h-fit sticky top-24 shadow-lg dark:shadow-none">
               <h3 className="font-bold mb-4 text-gray-900 dark:text-white text-xl flex items-center gap-2">
                 {isEditing ? <><Edit2 className="text-yellow-500"/> Edit Project</> : <><Plus className="text-blue-500"/> Add Project</>}
               </h3>
               <form onSubmit={handleSubmitProject} className="space-y-4">
                 <input placeholder="Title" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                 <select className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" 
                    value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="WEB3">Web3 / Blockchain</option><option value="MERN">MERN Stack</option><option value="PERN">PERN Stack</option><option value="UNIVERSITY">University</option><option value="SELF-TAUGHT">Self-Taught</option>
                  </select>
                 <textarea placeholder="Description" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                 <input placeholder="Tech Stack" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-gray-900 dark:text-white" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} />
                 <div className="grid grid-cols-2 gap-2">
                    <input placeholder="GitHub" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-sm text-gray-900 dark:text-white" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} />
                    <input placeholder="Live" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-sm text-gray-900 dark:text-white" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} />
                 </div>
                 <input placeholder="Image" className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded outline-none text-sm text-gray-900 dark:text-white" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                 <div className="flex gap-2">
                   <button type="submit" className={`flex-1 py-3 rounded font-bold transition text-white ${isEditing ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}>{isEditing ? 'Update' : 'Create'}</button>
                   {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData(initialFormState); }} className="px-4 bg-gray-200 dark:bg-slate-700 rounded text-gray-900 dark:text-white">Cancel</button>}
                 </div>
               </form>
             </div>
             <div className="lg:col-span-8 space-y-2">
               {projects.map(p => (
                 <div key={p.id} className="bg-white dark:bg-slate-900 p-4 rounded border border-gray-200 dark:border-slate-800 flex justify-between items-center shadow-sm">
                   <span className="text-gray-900 dark:text-white">{p.title}</span>
                   <div className="flex gap-2">
                     <button onClick={() => handleEditClick(p)} className="text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 p-2 rounded"><Edit2 size={18}/></button>
                     <button onClick={() => handleDeleteProject(p.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded"><Trash2 size={18}/></button>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
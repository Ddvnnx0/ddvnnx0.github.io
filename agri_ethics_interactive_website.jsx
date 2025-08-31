import React, { useMemo, useState, useEffect } from "react";

// AgriEthics Interactive Website — single-file React app (TSX)
// Regenerated per request: only four team members + more images across sections.

// ---------- helpers ----------
const svgURI = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const makeAvatar = (bg1: string, bg2: string, letter: string) =>
  svgURI(`
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${bg1}' />
        <stop offset='1' stop-color='${bg2}' />
      </linearGradient>
    </defs>
    <rect width='200' height='200' rx='36' ry='36' fill='url(#g)'/>
    <circle cx='160' cy='40' r='10' fill='rgba(255,255,255,.45)'/>
    <circle cx='30' cy='160' r='14' fill='rgba(255,255,255,.35)'/>
    <text x='100' y='120' text-anchor='middle' font-family='Inter, Arial, Helvetica, sans-serif' font-weight='900' font-size='92' fill='white'>${letter}</text>
  </svg>`);

// Small inline SVGs for section imagery
const leafImg = svgURI(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 140'>
  <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#4CAF50'/><stop offset='1' stop-color='#2E7D32'/></linearGradient></defs>
  <rect width='200' height='140' rx='16' fill='rgba(60,99,73,.08)'/>
  <path d='M30,90 C50,50 100,20 160,40 C110,60 90,90 80,120 C60,120 45,110 30,90 Z' fill='url(#g)'/>
  <path d='M30,90 C60,88 110,70 150,46' stroke='rgba(36,48,66,.35)' stroke-width='4' fill='none'/>
</svg>`);

const cowImg = svgURI(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 140'>
  <rect width='200' height='140' rx='16' fill='rgba(30,90,180,.08)'/>
  <circle cx='70' cy='70' r='30' fill='#243042'/>
  <rect x='90' y='60' width='70' height='40' rx='10' fill='#243042'/>
  <circle cx='60' cy='60' r='6' fill='white'/>
  <circle cx='80' cy='60' r='6' fill='white'/>
  <circle cx='150' cy='76' r='6' fill='white'/>
</svg>`);

const workersImg = svgURI(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 140'>
  <rect width='200' height='140' rx='16' fill='rgba(211,182,141,.25)'/>
  <circle cx='60' cy='60' r='18' fill='#1E5AB4'/>
  <rect x='42' y='78' width='36' height='42' rx='8' fill='#1E5AB4'/>
  <circle cx='120' cy='60' r='18' fill='#3C6349'/>
  <rect x='102' y='78' width='36' height='42' rx='8' fill='#3C6349'/>
</svg>`);

const robotImg = svgURI(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 140'>
  <rect width='200' height='140' rx='16' fill='rgba(36,48,66,.08)'/>
  <rect x='50' y='40' width='100' height='60' rx='12' fill='#1E5AB4'/>
  <circle cx='80' cy='70' r='8' fill='white'/>
  <circle cx='120' cy='70' r='8' fill='white'/>
  <rect x='75' y='102' width='50' height='8' rx='4' fill='#243042'/>
</svg>`);

const aboutBanner = svgURI(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 240'>
  <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
    <stop offset='0' stop-color='#D3B68D' stop-opacity='.25'/>
    <stop offset='1' stop-color='white' stop-opacity='0'/>
  </linearGradient>
  <rect width='800' height='240' rx='18' fill='url(#g)'/>
  <circle cx='700' cy='90' r='50' fill='#D3B68D' opacity='.9'/>
  <path d='M0,160 C160,130 340,130 520,160 L520,240 L0,240 Z' fill='#3C6349' opacity='.9'/>
  <path d='M0,190 C220,150 480,170 800,160 L800,240 L0,240 Z' fill='#3C6349' opacity='.85'/>
</svg>`);

// ---------- types ----------
type TeamMember = { name: string; role: string; location: string; focus: string; photo: string };

export default function App() {
  const [theme, setTheme] = useState("light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("land");
  const [showToolkit, setShowToolkit] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [bio, setBio] = useState<TeamMember | null>(null);

  // Four team members only (with image avatars)
  const team: TeamMember[] = [
    { name: 'Dr Alex Morgan', role: 'Director & Ethicist', location: 'Melbourne, VIC', focus: 'Governance, policy, standards', photo: makeAvatar('#1E5AB4', '#243042', 'AM') },
    { name: 'Priya Singh', role: 'Program Lead — Animal Welfare', location: 'Brisbane, QLD', focus: 'Welfare standards, audits', photo: makeAvatar('#3C6349', '#1E5AB4', 'PS') },
    { name: 'Jack Thompson', role: 'Regenerative Agronomist', location: 'Wagga Wagga, NSW', focus: 'Soil, rotations, carbon', photo: makeAvatar('#D3B68D', '#3C6349', 'JT') },
    { name: 'Mei Chen', role: 'Data & AI Lead', location: 'Sydney, NSW', focus: 'Data governance, AI/ML', photo: makeAvatar('#243042', '#1E5AB4', 'MC') },
  ];

  useEffect(() => {
    document.documentElement.style.setProperty("--ae-blue", "#1E5AB4");
    document.documentElement.style.setProperty("--ae-gold", "#D3B68D");
    document.documentElement.style.setProperty("--ae-green", "#3C6349");
    document.documentElement.style.setProperty("--ae-slate", "#243042");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const issues = useMemo(
    () => ({
      land: {
        title: "Land & Sustainability",
        emoji: "🌱",
        text: "Soil health, water stewardship, and climate-smart practices for long‑term productivity.",
        bullets: ["Regenerative rotations", "Water use disclosures", "Net‑zero transition plans"],
        img: leafImg,
      },
      animals: {
        title: "Animal Welfare",
        emoji: "🐄",
        text: "Husbandry standards, humane handling, and transparent auditing across supply chains.",
        bullets: ["Shelter & enrichment", "Transport stress reduction", "Independent audits"],
        img: cowImg,
      },
      labour: {
        title: "Farm Labour & Human Rights",
        emoji: "🧑🏽‍🌾",
        text: "Fair contracts, safe conditions, grievance mechanisms, and living wages for workers.",
        bullets: ["Seasonal worker protections", "Safety & training", "Whistleblower channels"],
        img: workersImg,
      },
      biodiversity: {
        title: "Biodiversity & Ethics",
        emoji: "🦋",
        text: "Habitat corridors, chemical minimisation, and stewardship for native species.",
        bullets: ["Pesticide reduction", "Pollinator buffers", "Riparian restoration"],
        img: leafImg,
      },
      tech: {
        title: "Technology & AI in Ag",
        emoji: "🤖",
        text: "Responsible data, explainable models, and farmer‑centric innovation in ag‑tech.",
        bullets: ["Data governance", "Bias testing", "Open standards"],
        img: robotImg,
      },
    }),
    []
  );

  // --- smoke tests (dev) ---
  useEffect(() => {
    console.assert(team.length === 4, "Team list should contain exactly 4 members");
    console.assert(Object.keys(issues).length >= 5, "Issues should include at least 5 topics");
    console.assert(team.every(t => t.photo.startsWith('data:image/svg+xml')), 'Team photos should be inline data URIs');
  }, [team, issues]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /.+@.+\..+/.test(email);
    if (ok) setSubscribed(true); else alert("Please enter a valid email address.");
  };

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="ae">
      <style>{`
        :root { --ae-blue:#1E5AB4; --ae-gold:#D3B68D; --ae-green:#3C6349; --ae-slate:#243042; --ae-bg:#fff; --ae-text:#1f2937; --ae-card:#fff; }
        [data-theme="dark"] { --ae-bg:#0b1220; --ae-text:#e5e7eb; --ae-card:#111827; }
        *{box-sizing:border-box} body,html,#root{height:100%}
        .ae{background:var(--ae-bg);color:var(--ae-text);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}
        a{color:var(--ae-blue);text-decoration:none}
        .container{max-width:1150px;margin:0 auto;padding:0 20px}
        .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.9rem 1.1rem;border-radius:1rem;font-weight:700;transition:.2s transform,.2s filter,.2s background}
        .btn:hover{transform:translateY(-1px);filter:brightness(1.05)}
        .btn-primary{background:var(--ae-blue);color:#fff}
        .btn-ghost{background:rgba(36,48,66,.08);color:var(--ae-text);border:1px solid rgba(36,48,66,.15)}
        [data-theme="dark"] .btn-ghost{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.15)}
        .nav{position:sticky;top:0;backdrop-filter:blur(6px);z-index:40;border-bottom:1px solid rgba(36,48,66,.15);background:color-mix(in oklab, var(--ae-bg), transparent 15%)}
        .nav-inner{display:flex;align-items:center;justify-content:space-between;padding:.7rem 0}
        .nav-menu{display:flex;gap:1rem}
        .nav-menu a{padding:.6rem .9rem;border-radius:.8rem}
        .nav-actions{display:flex;gap:.6rem;align-items:center}
        .mobile-toggle{display:none}
        @media (max-width:900px){.nav-menu{display:none}.mobile-toggle{display:block}}
        .mobile-sheet{display:none;position:fixed;inset:64px 14px auto;background:var(--ae-card);border:1px solid rgba(36,48,66,.15);border-radius:1rem;padding:1rem;box-shadow:0 20px 60px rgba(0,0,0,.25)}
        .mobile-sheet.open{display:block}
        .hero{background:linear-gradient(180deg,color-mix(in oklab, var(--ae-gold), transparent 75%),transparent 75%);padding:80px 0 40px}
        .hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:2rem;align-items:center}
        @media (max-width:900px){.hero-grid{grid-template-columns:1fr}}
        .card{background:var(--ae-card);border:1px solid rgba(36,48,66,.12);border-radius:1.2rem;padding:1.1rem;box-shadow:0 2px 10px rgba(0,0,0,.05)}
        .card.hover:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,.12)}
        .section{padding:56px 0}
        .grid{display:grid;gap:1rem}
        .footer{padding:48px 0;border-top:1px solid rgba(36,48,66,.15);margin-top:56px}
        .pill{background:color-mix(in oklab, var(--ae-blue), transparent 88%);color:var(--ae-blue);display:inline-block;padding:.35rem .7rem;border-radius:999px;font-weight:600}
        .row{display:flex;gap:1rem;align-items:center}
        .row-wrap{flex-wrap:wrap}
        .img-card{width:100%;border-radius:.8rem;display:block}
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <div className="row"><LogoHorizontal style={{ height: 42 }} /></div>
          <div className="nav-menu">
            <a href="#what" onClick={(e)=>{e.preventDefault(); scrollTo('#what')}}>What we do</a>
            <a href="#about" onClick={(e)=>{e.preventDefault(); scrollTo('#about')}}>About us</a>
            <a href="#issues" onClick={(e)=>{e.preventDefault(); scrollTo('#issues')}}>Key issues</a>
            <a href="#faq" onClick={(e)=>{e.preventDefault(); scrollTo('#faq')}}>FAQ</a>
          </div>
          <div className="nav-actions">
            <button className="btn btn-ghost" title="Toggle theme" onClick={()=> setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? '🌙' : '☀️'}</button>
            <button className="btn btn-primary" onClick={() => setShowToolkit(true)}>Download Toolkit</button>
            <button className="btn btn-ghost mobile-toggle" onClick={()=> setMobileOpen(!mobileOpen)}>Menu</button>
          </div>
        </div>
        <div className={`mobile-sheet ${mobileOpen ? 'open' : ''}`}>
          <div className="grid" style={{gap:".5rem"}}>
            {[{href:'#what',label:'What we do'},{href:'#about',label:'About us'},{href:'#issues',label:'Key issues'},{href:'#faq',label:'FAQ'}].map((i)=> (
              <a key={i.href} href={i.href} onClick={(e)=>{e.preventDefault(); scrollTo(i.href)}} className="card">{i.label}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="container hero-grid">
          <div>
            <p className="pill">Australia · Agriculture · Ethics</p>
            <h1 style={{fontSize: "clamp(34px,3.5vw,56px)", lineHeight:1.05, margin: ".6rem 0 1rem", fontWeight: 900}}>Growing with Integrity</h1>
            <p style={{fontSize:"1.1rem", maxWidth: 640, opacity:.9}}>Exploring the questions shaping how we grow, produce, and care for land, animals, people, and ecosystems.</p>
            <div className="row row-wrap" style={{marginTop:"1.2rem"}}>
              <button className="btn btn-primary" onClick={()=> scrollTo('#issues')}>Explore Key Issues</button>
              <button className="btn btn-ghost" onClick={()=> setShowToolkit(true)}>Download Ethics Toolkit</button>
            </div>
          </div>
          <div><div className="card" style={{padding:0}}><HeroIllustration /></div></div>
        </div>
      </header>

      {/* WHAT WE DO (with images) */}
      <section id="what" className="section">
        <div className="container">
          <h1 style={{fontSize:"clamp(32px,3.2vw,48px)", marginBottom:"1rem"}}>What We Do</h1>
          <p style={{fontSize:"1.1rem", maxWidth:860, opacity:.9}}>AgriEthics helps growers, agribusinesses, and communities put ethics at the heart of Australian agriculture. We turn principles into practical action through programs, tools, and public forums.</p>

          <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:"1rem", marginTop:"1.2rem"}}>
            <div className="card hover">
              <img alt="Leaf over farmland" className="img-card" src={leafImg} />
              <h3>Programs</h3>
              <ul>
                <li>Farm Ethics Foundations (6‑week cohort program)</li>
                <li>Animal Welfare Standards & audits</li>
                <li>Regenerative Land Stewardship pathways</li>
                <li>AI & Data Governance for Ag‑tech teams</li>
              </ul>
            </div>
            <div className="card hover">
              <img alt="Open-source tools" className="img-card" src={robotImg} />
              <h3>Tools & Resources</h3>
              <ul>
                <li>Ethics Toolkit: templates, policies, checklists</li>
                <li>Issue Briefs: plain‑language guides on hot topics</li>
                <li>Self‑assessment and maturity scoring</li>
                <li>Open training slides & facilitation notes</li>
              </ul>
            </div>
            <div className="card hover">
              <img alt="Workers and safety" className="img-card" src={workersImg} />
              <h3>Community & Advocacy</h3>
              <ul>
                <li>Working groups with producers, researchers, and retailers</li>
                <li>Public consultations on guidelines</li>
                <li>School & TAFE learning modules</li>
                <li>Regional meetups and knowledge exchange</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US (with banner + photos) */}
      <section id="about" className="section" style={{background:"color-mix(in oklab, var(--ae-gold), transparent 90%)"}}>
        <div className="container">
          <img src={aboutBanner} alt="Rolling fields at sunrise" className="img-card" />
          <h2 style={{fontSize:"clamp(26px,2.8vw,40px)", marginTop:"1rem"}}>About Us</h2>
          <p style={{maxWidth:860, opacity:.9}}>We’re a multidisciplinary team working with producers, researchers, retailers and communities to embed ethics across Australian agriculture.</p>

          <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit, minmax(240px,1fr))", gap:"1rem", marginTop:"1rem"}}>
            {team.map((m) => (
              <article key={m.name} className="card hover" onClick={()=> setBio(m)} style={{cursor:'pointer'}}>
                <div style={{display:'grid', placeItems:'center'}}>
                  <img alt={`${m.name} portrait`} src={m.photo} style={{width:96, height:96, borderRadius:'999px', border:'2px solid rgba(36,48,66,.2)'}} />
                </div>
                <div style={{marginTop:'.6rem', textAlign:'center'}}>
                  <div style={{fontWeight:800}}>{m.name}</div>
                  <div style={{opacity:.8}}>{m.role}</div>
                </div>
                <div style={{marginTop:'.5rem', fontSize:'.95rem', opacity:.9, textAlign:'center'}}>
                  <div>📍 {m.location}</div>
                  <div>🎯 {m.focus}</div>
                </div>
                <div className="row" style={{marginTop:'.7rem', justifyContent:'center'}}>
                  <button className="btn btn-ghost">View bio</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ISSUES TABS (cards now include images) */}
      <section id="issues" className="section">
        <div className="container">
          <h2 style={{fontSize:"clamp(26px,2.8vw,40px)"}}>Explore Key Issues</h2>
          <div className="row row-wrap" style={{gap:".5rem", marginTop:".6rem"}}>
            {Object.entries(issues).map(([id, x]) => (
              <button key={id} className={`btn ${activeTab === id ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveTab(id)}>
                <span style={{fontSize:"1.1rem"}}>{x.emoji}</span> {x.title}
              </button>
            ))}
          </div>
          <div className="card" style={{marginTop:"1rem"}}>
            {Object.entries(issues).map(([id, x]) => (
              <div key={id} style={{display: activeTab === id ? 'block' : 'none'}}>
                <img src={x.img} alt={`${x.title} illustration`} className="img-card" />
                <div className="row" style={{gap:".6rem", marginTop:'.6rem'}}>
                  <span style={{fontSize:"1.6rem"}}>{x.emoji}</span>
                  <h3 style={{margin:0}}>{x.title}</h3>
                </div>
                <p style={{opacity:.9, marginTop:".5rem"}}>{x.text}</p>
                <ul style={{marginTop:".5rem"}}>
                  {x.bullets.map((b, i) => (<li key={i} style={{margin: ".25rem 0"}}>• {b}</li>))}
                </ul>
                <div className="row row-wrap" style={{marginTop:".8rem"}}>
                  <button className="btn btn-primary">Read guidance</button>
                  <button className="btn btn-ghost" onClick={()=> setShowToolkit(true)}>Download toolkit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE + NEWSLETTER */}
      <section className="section" style={{background:"color-mix(in oklab, var(--ae-green), transparent 86%)"}}>
        <div className="container" style={{display:"grid", gridTemplateColumns:"1.2fr .8fr", gap:"1rem"}}>
          <blockquote className="card" style={{fontSize:"1.2rem"}}>
            <p style={{marginTop:0}}><strong>“Ethics isn’t just about what’s legal.</strong> It’s about what’s right—for people, animals, and the land.”</p>
            <footer style={{opacity:.8}}>AgriEthics Community</footer>
          </blockquote>
          <form className="card" onSubmit={handleSubscribe}>
            <h3 style={{marginTop:0}}>Join the Conversation</h3>
            {!subscribed ? (
              <>
                <label>Email address</label>
                <input type="email" placeholder="you@example.org" value={email} onChange={(e)=> setEmail(e.target.value)}
                       style={{width:"100%", padding:".8rem 1rem", borderRadius:".8rem", border:"1px solid rgba(36,48,66,.2)", background:"var(--ae-bg)", color:"var(--ae-text)", marginTop:".3rem"}}/>
                <div className="row row-wrap" style={{marginTop:".8rem"}}>
                  <button type="submit" className="btn btn-primary">Subscribe</button>
                  <span style={{opacity:.8}}>We’ll send occasional updates. Unsubscribe anytime.</span>
                </div>
              </>
            ) : (
              <div className="card" style={{background:"color-mix(in oklab, var(--ae-blue), transparent 90%)"}}>
                <div className="row" style={{gap: ".6rem"}}>
                  <span>✅</span>
                  <div>
                    <strong>Thanks for subscribing!</strong>
                    <div>Check your inbox to confirm.</div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container">
          <h2 style={{fontSize:"clamp(26px,2.8vw,40px)"}}>FAQ</h2>
          <div className="grid" style={{gridTemplateColumns:"1fr", gap:".8rem", marginTop:"1rem"}}>
            {[
              { q: "What is the Ethics Toolkit?", a: "A practical set of worksheets and sample policies to help farms, co‑ops, and agribusinesses embed ethical practices across operations." },
              { q: "Can I contribute to guidelines?", a: "Yes — join a working group or submit a proposal. We publish drafts for public comment and track changes openly." },
              { q: "Do you work with schools or TAFEs?", a: "Absolutely. We run classroom modules and teacher PD on ethics in modern agriculture." },
            ].map((item, i) => (
              <div key={i} className="card hover" onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{cursor:"pointer"}}>
                <div className="row" style={{justifyContent:"space-between"}}>
                  <strong>{item.q}</strong>
                  <span style={{background:'rgba(0,0,0,.08)', padding:'.15rem .45rem', borderRadius:'.4rem', fontFamily:'ui-monospace', fontSize:'.85rem'}}>{faqOpen === i ? "Hide" : "Show"}</span>
                </div>
                {faqOpen === i && (<p style={{marginTop:".6rem", opacity:.95}}>{item.a}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", alignItems:"center"}}>
          <div className="row row-wrap">
            <LogoIcon style={{ height: 44 }} />
            <div>
              <div style={{fontWeight:800}}>AgriEthics</div>
              <div style={{opacity:.75}}>Ethics at the heart of Australian agriculture</div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <button className="btn btn-ghost" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Back to top ⤴</button>
          </div>
        </div>
      </footer>

      {/* TOOLKIT MODAL */}
      {showToolkit && (
        <div role="dialog" aria-modal="true" className="modal" onClick={() => setShowToolkit(false)}>
          <style>{`
            .modal { position: fixed; inset: 0; background: rgba(0,0,0,.4); display: grid; place-items: center; z-index: 50; }
            .sheet { width: min(720px, 92vw); background: var(--ae-card); border-radius: 1rem; border:1px solid rgba(36,48,66,.2); box-shadow: 0 30px 80px rgba(0,0,0,.3); }
            .sheet header { padding: 1rem 1.2rem; border-bottom: 1px solid rgba(36,48,66,.15); display:flex; align-items:center; gap:.6rem; }
            .sheet main { padding: 1rem 1.2rem; }
          `}</style>
          <div className="sheet card" onClick={(e) => e.stopPropagation()}>
            <header>
              <LogoIcon style={{ height: 28 }} />
              <div style={{fontWeight:800}}>AgriEthics Toolkit</div>
              <div style={{marginLeft:"auto"}}>
                <button className="btn btn-ghost" onClick={()=> setShowToolkit(false)}>Close</button>
              </div>
            </header>
            <main>
              <p>Choose the format that suits you:</p>
              <div className="row row-wrap">
                <a className="btn btn-primary" href="#" onClick={(e)=> e.preventDefault()}>Download PDF</a>
                <a className="btn btn-ghost" href="#" onClick={(e)=> e.preventDefault()}>Download Word</a>
                <a className="btn btn-ghost" href="#" onClick={(e)=> e.preventDefault()}>View online</a>
              </div>
              <p style={{opacity:.8, marginTop:".8rem"}}>This demo is interactive; wire your own links for production.</p>
            </main>
          </div>
        </div>
      )}

      {/* BIO MODAL */}
      {bio && (
        <div role="dialog" aria-modal="true" className="modal" onClick={()=> setBio(null)}>
          <style>{`
            .modal { position: fixed; inset: 0; background: rgba(0,0,0,.4); display: grid; place-items: center; z-index: 60; }
            .sheet { width: min(760px, 92vw); background: var(--ae-card); border-radius: 1rem; border:1px solid rgba(36,48,66,.2); box-shadow: 0 30px 80px rgba(0,0,0,.3); }
            .sheet header { padding: 1rem 1.2rem; border-bottom: 1px solid rgba(36,48,66,.15); display:flex; align-items:center; gap:.6rem; }
            .sheet main { padding: 1rem 1.2rem; }
          `}</style>
          <div className="sheet card" onClick={(e)=> e.stopPropagation()}>
            <header>
              <LogoIcon style={{ height: 28 }} />
              <div style={{fontWeight:800}}>{bio?.name}</div>
              <div style={{marginLeft:'auto'}}>
                <button className="btn btn-ghost" onClick={()=> setBio(null)}>Close</button>
              </div>
            </header>
            <main>
              <div className="row" style={{gap:'1rem', alignItems:'flex-start'}}>
                <img alt={`${bio?.name} portrait`} src={bio?.photo} style={{width:96, height:96, borderRadius:'999px', border:'2px solid rgba(36,48,66,.2)'}} />
                <div>
                  <div style={{fontWeight:800, fontSize:'1.1rem'}}>{bio?.role}</div>
                  <div style={{opacity:.8}}>📍 {bio?.location}</div>
                  <div style={{opacity:.9, marginTop:'.4rem'}}>Focus: {bio?.focus}</div>
                </div>
              </div>
              <p style={{opacity:.9, marginTop:'.8rem'}}>Short bio goes here. Replace with a paragraph describing background, expertise, and current projects. You can also add links to publications or guidance notes.</p>
              <div className="row row-wrap" style={{marginTop:'.8rem'}}>
                <button className="btn btn-primary" onClick={()=> setBio(null)}>Done</button>
                <button className="btn btn-ghost" onClick={()=> setShowToolkit(true)}>Download Toolkit</button>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Logo components ----------
function LogoHorizontal({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: ".6rem", ...style }}>
      <LogoIcon style={{ height: 42 }} />
      <svg width="220" height="48" viewBox="0 0 540 120" aria-label="AgriEthics wordmark">
        <defs>
          <linearGradient id="goldbar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--ae-gold)" stopOpacity="0.4" />
            <stop offset="1" stopColor="var(--ae-gold)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <g fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" fontWeight="800">
          <text x="0" y="70" fontSize="64" fill="var(--ae-slate)">Agri</text>
          <text x="150" y="70" fontSize="64" fill="var(--ae-blue)">Ethics</text>
          <rect x="0" y="84" width="290" height="10" fill="url(#goldbar)" />
        </g>
      </svg>
    </div>
  );
}

function LogoIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 240 240" aria-label="AgriEthics logo icon">
      <circle cx="120" cy="90" r="44" fill="var(--ae-gold)" fillOpacity=".95" />
      <path d="M24,140 C80,110 160,110 216,140 L216,160 C160,140 80,140 24,160 Z" fill="var(--ae-green)" />
      <path d="M24,156 C80,126 160,126 216,156 L216,174 C160,156 80,156 24,174 Z" fill="var(--ae-green)" opacity=".85" />
      <g stroke="var(--ae-blue)" strokeWidth="7" fill="none" strokeLinecap="round">
        <line x1="120" y1="48" x2="120" y2="128" />
        <line x1="96" y1="80" x2="144" y2="80" />
        <line x1="96" y1="80" x2="86" y2="112" />
        <line x1="144" y1="80" x2="154" y2="112" />
        <path d="M72,112 a30,10 0 1,0 60,0" />
        <path d="M120,112 a30,10 0 1,0 60,0" />
      </g>
      <rect x="3" y="3" width="234" height="234" rx="38" ry="38" fill="none" stroke="color-mix(in oklab, var(--ae-slate), transparent 60%)" strokeWidth="6" />
    </svg>
  );
}

// ---------- Illustration ----------
function HeroIllustration() {
  return (
    <svg viewBox="0 0 800 420" width="100%" height="auto" aria-label="Illustration of farmland at sunrise">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--ae-gold)" stopOpacity=".35" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect width="800" height="420" rx="18" fill="url(#sky)" />
      <circle cx="620" cy="120" r="70" fill="var(--ae-gold)" opacity=".9" />
      <path d="M0,250 C150,210 220,210 340,250 C460,290 580,290 800,240 L800,420 L0,420 Z" fill="var(--ae-green)" opacity=".9" />
      <path d="M0,300 C220,250 450,270 800,260 L800,420 L0,420 Z" fill="var(--ae-green)" opacity=".85" />
      <g stroke="white" strokeOpacity=".35" strokeWidth="3">
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M${i*90},420 C${i*90+80},360 ${i*90+140},340 ${i*90+240},320`} fill="none" />
        ))}
      </g>
      <g stroke="color-mix(in oklab, var(--ae-slate), transparent 35%)" strokeWidth="6" strokeLinecap="round">
        <line x1="40" y1="340" x2="760" y2="340" />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={50 + i * 50} y1="320" x2={50 + i * 50} y2="360" />
        ))}
      </g>
    </svg>
  );
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { Briefcase, FileText, Folder, GraduationCap, LayoutDashboard, User, Zap, Check, Settings2 } from 'lucide-react'

const tabs = [
  ['Dashboard', LayoutDashboard], ['Profile', User], ['Projects', Folder], ['Skills', Zap],
  ['Experience', Briefcase], ['Education', GraduationCap], ['Resume', FileText],
] as const
const accents = ['#F28C1E', '#0B2E6B', '#218B4E', '#7C4DDB']

function Template({ name, selected, accent, onClick }: { name: string; selected: boolean; accent: string; onClick: () => void }) {
  return <button className={`template-thumb ${selected ? 'selected' : ''}`} onClick={onClick} role="radio" aria-checked={selected}>
    <span className={`mini-art ${name.toLowerCase()}`}><i style={{ background: name === 'Modern' ? accent : undefined }}/><b/><b/><em/></span><small>{name}</small>{selected && <span className="template-check"><Check size={12}/></span>}
  </button>
}

export default function BuilderPreview() {
  const [active, setActive] = useState('Dashboard')
  const [mode, setMode] = useState<'preview' | 'settings'>('preview')
  const [template, setTemplate] = useState('Modern')
  const [accent, setAccent] = useState(accents[0])
  const [scale, setScale] = useState(1)
  const previewRef = useRef<HTMLDivElement>(null)
  useEffect(() => { const node = previewRef.current; if (!node) return; const update = () => setScale(Math.min(1, node.clientWidth / 688)); update(); const observer = new ResizeObserver(update); observer.observe(node); return () => observer.disconnect() }, [])
  const title = active === 'Dashboard' ? 'Edit Portfolio' : `Edit ${active}`
  return <div className="builder-preview-ref" ref={previewRef}>
    <div className="builder-tabs" role="tablist" aria-label="Portfolio sections">{tabs.map(([label, Icon]) => <button key={label} role="tab" aria-selected={active === label} className={active === label ? 'active' : ''} onClick={() => setActive(label)}><Icon size={16}/>{label}</button>)}</div>
    <div className="builder-scrollbar" />
    <div className="builder-stage-wrap" style={{height: 440 * scale}}><div className="builder-stage" aria-live="polite" style={{transform: `scale(${scale})`, transformOrigin: 'top left'}}>
      <div className="stage-sun"/><div className="stage-floor"/>
      <span className="stage-chip github">✓ GitHub connected</span><span className="stage-chip qr">QR + link ready</span>
      <div className="laptop-ref"><div className="screen-ref"><div className="editor-ref"><strong>{title}</strong><div className="mode-row"><button className={mode === 'preview' ? 'selected' : ''} onClick={() => setMode('preview')}>Preview</button><button className={mode === 'settings' ? 'selected' : ''} onClick={() => setMode('settings')}><Settings2 size={12}/>Settings</button></div>{mode === 'preview' ? <><label>Choose Template</label><div className="templates-ref" role="radiogroup">{['Modern', 'Minimal', 'Classic'].map(name => <Template key={name} name={name} selected={template === name} accent={accent} onClick={() => setTemplate(name)}/>)}</div><label>Accent color</label><div className="swatches-ref" role="radiogroup">{accents.map(color => <button key={color} aria-label={`Accent ${color}`} className={accent === color ? 'selected' : ''} style={{ background: color }} onClick={() => setAccent(color)}/>)}</div></> : <div className="settings-ref"><label><input type="checkbox" defaultChecked/> Show LeetCode</label><label><input type="checkbox" defaultChecked/> Show Open to Work</label></div>}</div><div className={`portfolio-ref ${template.toLowerCase()}`}><div className="portfolio-header"><div className="portfolio-avatar" style={{background: accent}}>AJ</div><div><strong>Alex Johnson</strong><small>Full Stack Developer</small></div><span className="live"><i/>Live</span></div><div className="portfolio-stats"><div><b style={{color: accent}}>12</b><small>Projects</small></div><div><b style={{color: accent}}>850+</b><small>LeetCode</small></div><div><b style={{color: accent}}>4.8</b><small>Rating</small></div></div><div className="portfolio-skills"><span>React</span><span>Node.js</span><span>TypeScript</span><span>AWS</span></div>{template !== 'Minimal' && <div className="color-blocks"><i style={{background: accent}}/><i/><i/></div>}</div></div><div className="laptop-base-ref"/></div>
      <div className="character-ref man-ref"><div className="head-ref"><span>⌁</span></div><div className="body-ref navy-ref"><b>&lt;_&gt;</b></div></div><div className="character-ref woman-ref"><div className="head-ref"><span>⌣</span></div><div className="body-ref white-ref"><b>▮</b></div></div>
    </div></div>
  </div>
}

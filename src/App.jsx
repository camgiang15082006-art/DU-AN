import React, { useMemo, useState } from 'react';
import { GraduationCap, LayoutDashboard, CalendarCheck, ChartColumn, Download, RotateCcw, Users, UserCheck, UserX, Clock3, FileCheck, Percent, ArrowRight, Sparkles, FileSpreadsheet, TrendingUp, Search, Check, X } from 'lucide-react';

const initialStudents = [
  { id:'SV001', name:'Nguyễn Văn An', className:'CNTT-K15A', status:'Có mặt' },
  { id:'SV002', name:'Trần Văn Bình', className:'CNTT-K15A', status:'Có mặt' },
  { id:'SV003', name:'Lê Minh Anh', className:'CNTT-K15A', status:'Vắng' },
  { id:'SV004', name:'Phạm Hoàng Nam', className:'CNTT-K15A', status:'Có mặt' },
  { id:'SV005', name:'Nguyễn Thị Hoa', className:'CNTT-K15A', status:'Đi trễ' },
  { id:'SV006', name:'Trần Quốc Bảo', className:'CNTT-K15B', status:'Có mặt' },
  { id:'SV007', name:'Phan Thị Mai', className:'CNTT-K15B', status:'Có phép' },
  { id:'SV008', name:'Đỗ Minh Tuấn', className:'CNTT-K15B', status:'Có mặt' },
  { id:'SV009', name:'Võ Ngọc Linh', className:'CNTT-K15B', status:'Vắng' },
  { id:'SV010', name:'Bùi Đức Long', className:'CNTT-K15B', status:'Có mặt' },
  { id:'SV011', name:'Nguyễn Hải Yến', className:'DTVT-K15', status:'Có mặt' },
  { id:'SV012', name   :'Lê Thành Đạt', className:'DTVT-K15', status:'Có mặt' },
  { id:'SV013', name:'Trần Mỹ Duyên', className:'DTVT-K15', status:'Đi trễ' },
  { id:'SV014', name:'Phạm Gia Huy', className:'DTVT-K15', status:'Có mặt' },
  { id:'SV015', name:'Hoàng Thu Trang', className:'DTVT-K15', status:'Vắng' }
];
const classes = ['CNTT-K15A','CNTT-K15B','DTVT-K15'];
const iconMap = { 'Có mặt': Check, 'Vắng': X, 'Đi trễ': Clock3, 'Có phép': FileCheck };

export default function App() {
  const [students, setStudents] = useState(() => {
    try { return JSON.parse(localStorage.getItem('attendance-students')) || initialStudents; } catch { return initialStudents; }
  });
  const [page, setPage] = useState('Dashboard');
  const [classFilter, setClassFilter] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const today = new Date().toLocaleDateString('vi-VN', { weekday:'long', day:'2-digit', month:'2-digit', year:'numeric' });
  const stats = useMemo(() => ({ total: students.length, present: students.filter(s=>s.status==='Có mặt').length, absent: students.filter(s=>s.status==='Vắng').length, late: students.filter(s=>s.status==='Đi trễ').length, excused: students.filter(s=>s.status==='Có phép').length }), [students]);
  const filtered = students.filter(s => (classFilter==='Tất cả' || s.className===classFilter) && `${s.id} ${s.name}`.toLowerCase().includes(search.toLowerCase()));
  const save = next => { setStudents(next); localStorage.setItem('attendance-students', JSON.stringify(next)); };
  const updateStatus = (id,status) => save(students.map(s=>s.id===id?{...s,status}:s));
  const exportCsv = () => {
    const rows = [['Mã sinh viên','Họ tên','Lớp','Trạng thái'], ...students.map(s=>[s.id,s.name,s.className,s.status])];
    const csv = '\ufeff' + rows.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'})); const a=document.createElement('a'); a.href=url; a.download='du-lieu-diem-danh.csv'; a.click(); URL.revokeObjectURL(url);
  };
  const reset = () => { if(confirm('Khôi phục dữ liệu mẫu?')) save(initialStudents); };
  const menu = [{name:'Dashboard',Icon:LayoutDashboard},{name:'Điểm danh',Icon:CalendarCheck},{name:'Thống kê',Icon:ChartColumn}];
  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><div className="brand-icon"><GraduationCap size={25}/></div><div><b>Attendance</b><small>Management System</small></div></div>
      <div className="menu-label">MENU CHÍNH</div>{menu.map(({name,Icon})=><button key={name} className={`nav-item ${page===name?'active':''}`} onClick={()=>setPage(name)}><Icon size={17}/>{name}</button>)}
      <div className="menu-label quick-label">TÁC VỤ NHANH</div><button className="nav-item quick" onClick={exportCsv}><Download size={17}/>Xuất dữ liệu <span>CSV/Excel</span></button><button className="nav-item quick reset" onClick={reset}><RotateCcw size={17}/>Khôi phục dữ liệu mẫu</button>
      <div className="offline"><b><Sparkles size={13}/> Chế độ Offline First</b><p>Tự động lưu vào LocalStorage. Không cần kết nối mạng hay cơ sở dữ liệu.</p></div>
    </aside>
    <main className="main"><header className="topbar"><div><b>Attendance Management</b><span> • Quản lý điểm danh sinh viên</span></div><div className="top-actions"><span className="date-pill">▦　{today}</span><button className="export-icon" onClick={exportCsv}><FileSpreadsheet size={18}/></button></div></header>
      <div className="content">
      {page==='Dashboard' ? <>
        <section className="hero"><div className="hero-tag"><Sparkles size={13}/> Hệ thống Quản lý Điểm danh Thông minh</div><h1>Xin chào! Chúc một ngày làm việc hiệu quả.</h1><p>Hôm nay là {today}. Theo dõi sĩ số, ghi nhận có mặt, vắng, trễ và xuất báo cáo một chạm.</p><div className="hero-buttons"><button className="white-btn" onClick={()=>setPage('Điểm danh')}><CalendarCheck size={15}/> Điểm danh ngay hôm nay <ArrowRight size={15}/></button><button className="ghost-btn" onClick={()=>setPage('Thống kê')}><ChartColumn size={15}/> Xem báo cáo thống kê</button><button className="green-btn" onClick={exportCsv}><FileSpreadsheet size={15}/> Xuất Excel / CSV</button></div><CalendarCheck className="hero-watermark" size={180}/></section>
        <div className="section-heading"><h2>Tổng quan ngày hôm nay ({today})</h2><button onClick={()=>setPage('Điểm danh')}>Chi tiết điểm danh <ArrowRight size={14}/></button></div>
        <section className="stat-grid"><Stat title="Tổng sinh viên" value={stats.total} sub="danh sách" Icon={Users} tone="purple"/><Stat title="Có mặt" value={stats.present} sub={`${Math.round(stats.present/stats.total*100)||0}%`} Icon={UserCheck} tone="green"/><Stat title="Vắng" value={stats.absent} sub={`${Math.round(stats.absent/stats.total*100)||0}%`} Icon={UserX} tone="red"/><Stat title="Đi trễ" value={stats.late} sub={`${Math.round(stats.late/stats.total*100)||0}%`} Icon={Clock3} tone="orange"/><Stat title="Có phép" value={stats.excused} sub={`${Math.round(stats.excused/stats.total*100)||0}%`} Icon={FileCheck} tone="blue"/><Stat title="Tỷ lệ tham gia" value={`${Math.round((stats.present+stats.late+stats.excused)/stats.total*100)||0}%`} sub="chuyên cần" Icon={Percent} tone="pink"/></section>
        <section className="lower-grid"><div className="panel class-panel"><div className="panel-title"><b><Users size={16}/> Danh sách các lớp quản lý</b><small>3 Lớp</small></div>{classes.map(c=><button className="class-row" key={c} onClick={()=>{setClassFilter(c);setPage('Điểm danh')}}><span><b>{c}</b><small>Sĩ số: {students.filter(s=>s.className===c).length} sinh viên</small></span><strong>Điểm danh <ArrowRight size={13}/></strong></button>)}<div className="panel-foot"><span>Tổng cộng: {students.length} sinh viên</span><b>Đã đồng bộ LocalStorage</b></div></div>
        <div className="panel summary-panel"><div className="panel-title"><b><TrendingUp size={16}/> Tổng hợp chuyên cần toàn khóa</b><button onClick={()=>setPage('Thống kê')}>Xem đầy đủ →</button></div><small className="muted">Tính từ dữ liệu các buổi đã diễn ra</small><div className="mini-stats"><Mini label="Số buổi học" value="8"/><Mini label="Lượt có mặt" value="97" green/><Mini label="Lượt vắng" value="6" red/><Mini label="Tỷ lệ tham gia" value="90%" blue/></div><h4>SINH VIÊN TIÊU BIỂU GẦN ĐÂY</h4>{students.slice(0,4).map((s,i)=><div className="student-line" key={s.id}><span><small>{s.id}</small>　<b>{s.name}</b> <em>({s.className})</em></span><span>{[7,6,6,7][i]} có mặt / 8 buổi <b className="percent">{[88,100,75,100][i]}%</b></span></div>)}</div></section>
      </> : page==='Điểm danh' ? <><div className="page-title"><h1>Điểm danh sinh viên</h1><p>Chọn trạng thái điểm danh cho từng sinh viên. Thay đổi được lưu tự động.</p></div><div className="toolbar"><select value={classFilter} onChange={e=>setClassFilter(e.target.value)}><option>Tất cả</option>{classes.map(c=><option key={c}>{c}</option>)}</select><div className="search"><Search size={16}/><input placeholder="Tìm mã hoặc tên sinh viên..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div><div className="panel table-panel"><table><thead><tr><th>MÃ SV</th><th>HỌ VÀ TÊN</th><th>LỚP</th><th>TRẠNG THÁI ĐIỂM DANH</th></tr></thead><tbody>{filtered.map(s=><tr key={s.id}><td>{s.id}</td><td><b>{s.name}</b></td><td>{s.className}</td><td><select className={`status-select ${s.status==='Có mặt'?'is-green':s.status==='Vắng'?'is-red':s.status==='Đi trễ'?'is-orange':'is-blue'}`} value={s.status} onChange={e=>updateStatus(s.id,e.target.value)}>{['Có mặt','Vắng','Đi trễ','Có phép'].map(v=><option key={v}>{v}</option>)}</select></td></tr>)}</tbody></table></div></> : <><div className="page-title"><h1>Thống kê điểm danh</h1><p>Tổng hợp tình hình chuyên cần theo dữ liệu hiện có.</p></div><section className="stat-grid report-stats"><Stat title="Tổng sinh viên" value={stats.total} sub="danh sách" Icon={Users} tone="purple"/><Stat title="Có mặt" value={stats.present} sub="sinh viên" Icon={UserCheck} tone="green"/><Stat title="Vắng" value={stats.absent} sub="sinh viên" Icon={UserX} tone="red"/><Stat title="Đi trễ" value={stats.late} sub="sinh viên" Icon={Clock3} tone="orange"/></section><div className="panel report-panel"><h3>Tỷ lệ trạng thái điểm danh</h3>{[['Có mặt',stats.present,'green'],['Vắng',stats.absent,'red'],['Đi trễ',stats.late,'orange'],['Có phép',stats.excused,'blue']].map(([label,value,color])=><div className="bar-row" key={label}><span>{label}</span><div className="bar-bg"><div className={`bar ${color}`} style={{width:`${stats.total?value/stats.total*100:0}%`}}/></div><b>{value}</b></div>)}</div></>}
      </div>
    </main>
  </div>;
}
function Stat({title,value,sub,Icon,tone}){return <div className={`stat-card ${tone}`}><div className="stat-top"><span>{title}</span><i><Icon size={19}/></i></div><div className="stat-value">{value} <small>{sub}</small></div><div className="stat-track"><span/></div></div>}
function Mini({label,value,green,red,blue}){return <div className={`mini ${green?'green':red?'red':blue?'blue':''}`}><span>{label}</span><b>{value}</b></div>}

import React, { useMemo, useState } from 'react';
import { MAJORS_2025 } from '../data/majors2025';

interface PredictionPanelProps {
  currentScore: number;
}

export const PredictionPanel: React.FC<PredictionPanelProps> = ({ currentScore }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const predictions = useMemo(() => {
    return MAJORS_2025.map(major => {
      const diff = currentScore - major.score;
      let status = '';
      let statusColor = '';
      
      // Tính tỷ lệ phần trăm (giả lập)
      let probability = 0;
      if (diff >= 0) {
        probability = Math.min(99, 85 + (diff / 50) * 14);
      } else {
        probability = Math.max(1, 85 + (diff / 40) * 40); // diff=-40 => 45%, diff=-80 => 5%
      }
      
      if (diff >= 0) {
        status = 'Khả năng đỗ cao';
        statusColor = 'var(--success)';
      } else if (diff >= -30) {
        status = `Cân nhắc (Thiếu ${Math.abs(diff).toFixed(1)}đ)`;
        statusColor = '#d97706'; // dark orange for light theme
      } else {
        status = `Khó trúng tuyển (Thiếu ${Math.abs(diff).toFixed(1)}đ)`;
        statusColor = '#dc2626'; // red
      }
      
      return { ...major, status, statusColor, diff, probability };
    }).filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.code.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => b.diff - a.diff);
  }, [currentScore, searchTerm]);

  if (currentScore === 0) return null;

  return (
    <div className="glass-card" style={{ marginTop: '2rem' }}>
      <h2 className="section-title">Bảng Xếp Hạng Khả Năng Trúng Tuyển 2026</h2>
      <p className="helper-text" style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Dựa trên đối chiếu điểm của bạn (<strong>{currentScore.toFixed(2)}</strong>) với điểm chuẩn Phương thức 2 năm 2025. 
        <br/><em style={{color: '#dc2626'}}>Lưu ý: Tỷ lệ % và kết quả phân tích dưới đây chỉ mang tính chất tham khảo.</em>
      </p>
      
      <div className="input-wrapper" style={{ marginBottom: '1.5rem', maxWidth: '400px' }}>
        <input 
          type="text" 
          placeholder="Tìm kiếm ngành học hoặc mã ngành..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}
        />
      </div>

      <div style={{ maxHeight: '600px', overflowY: 'auto', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead style={{ position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', zIndex: 1 }}>
            <tr>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)', textAlign: 'center', width: '60px' }}>Hạng</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Mã Ngành</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Tên Ngành</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)', textAlign: 'center' }}>Điểm 2025</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)', textAlign: 'center' }}>Tỷ Lệ Đỗ</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Dự Đoán</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((p, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)', background: p.diff >= 0 ? 'rgba(5, 150, 105, 0.05)' : 'transparent' }}>
                <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 700, color: idx < 3 ? 'var(--accent)' : 'inherit' }}>
                  #{idx + 1}
                </td>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{p.code}</td>
                <td style={{ padding: '1rem' }}>{p.name}</td>
                <td style={{ padding: '1rem', fontWeight: 600, textAlign: 'center' }}>{p.score}</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    background: p.probability >= 80 ? 'rgba(5, 150, 105, 0.1)' : p.probability >= 50 ? 'rgba(217, 119, 6, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                    color: p.statusColor,
                    fontWeight: 700
                  }}>
                    {p.probability.toFixed(1)}%
                  </div>
                </td>
                <td style={{ padding: '1rem', color: p.statusColor, fontWeight: 600 }}>
                  {p.status}
                </td>
              </tr>
            ))}
            {predictions.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Không tìm thấy ngành nào phù hợp với từ khóa của bạn.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

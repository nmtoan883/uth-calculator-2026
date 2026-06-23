import React, { useEffect, useState } from 'react';

interface ResultPanelProps {
  results: {
    diemHocBa: number;
    diemThiTotNghiep: number;
    maxComponent: number;
    uth120: number;
  };
}

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const end = value;
    if (end === displayValue) return;
    
    let startTimestamp: number | null = null;
    const duration = 500; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setDisplayValue(displayValue + (end - displayValue) * progress);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(end);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  return <span>{displayValue.toFixed(2)}</span>;
};

export const ResultPanel: React.FC<ResultPanelProps> = ({ results }) => {
  return (
    <div className="result-panel">
      <div className="glass-card score-box highlight">
        <div className="score-label">ĐIỂM XÉT TUYỂN UTH120</div>
        <div className="score-value">
          <AnimatedNumber value={results.uth120 || 0} />
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Tối đa 1200 điểm
        </div>
      </div>

      <div className="glass-card score-box">
        <div className="score-label">Điểm Quy Đổi Học Bạ</div>
        <div className="score-value" style={{ fontSize: '2rem' }}>
          <AnimatedNumber value={results.diemHocBa || 0} />
        </div>
      </div>

      <div className="glass-card score-box">
        <div className="score-label">Điểm Quy Đổi Tốt Nghiệp</div>
        <div className="score-value" style={{ fontSize: '2rem' }}>
          <AnimatedNumber value={results.diemThiTotNghiep || 0} />
        </div>
      </div>
      
      <div className="glass-card score-box" style={{ background: 'rgba(0,0,0,0.1)', border: 'none', padding: '1rem' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Hệ thống xét duyệt dựa trên các công thức:<br/><br/>
          <strong>UTH120</strong> = 0.4*Max + 0.3*HọcBạ + 0.3*ThiTN + ƯuTiên<br/>
          (Điểm Học Bạ và Thi TN tối đa 1200 điểm)
        </div>
      </div>
    </div>
  );
};

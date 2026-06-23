import React from 'react';
import type { ScoreInputs } from '../utils/calculator';

interface ScoreFormProps {
  inputs: ScoreInputs;
  onChange: (inputs: ScoreInputs) => void;
}

export const ScoreForm: React.FC<ScoreFormProps> = ({ inputs, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (value !== '') {
      const num = parseFloat(value);
      if (name === 'dgnl') {
        if (num < 0) finalValue = '0';
        if (num > 1200) finalValue = '1200';
      } else if (!['k1', 'k2', 'k3'].includes(name)) {
        // Giới hạn các điểm thành phần từ 0 đến 10
        if (num < 0) finalValue = '0';
        if (num > 10 && name !== 'priorityScore') finalValue = '10';
        // Điểm ưu tiên nếu muốn giới hạn có thể tuỳ chỉnh, tạm thời giới hạn max 10
        if (num > 10 && name === 'priorityScore') finalValue = '10';
      }
    }

    onChange({
      ...inputs,
      [name]: finalValue,
    });
  };

  return (
    <div className="glass-card">
      <h2 className="section-title">Thông tin điểm xét tuyển</h2>
      
      {/* ĐGNL */}
      <div className="form-group">
        <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>1. Điểm Đánh Giá Năng Lực (ĐGNL)</h3>
        <div className="input-grid">
          <div className="input-wrapper">
            <label>Điểm ĐGNL</label>
            <input 
              type="number" 
              name="dgnl" 
              value={inputs.dgnl ?? ''} 
              onChange={handleChange} 
              placeholder="VD: 850" 
            />
          </div>
          <div className="input-wrapper">
            <label>Hệ số k1</label>
            <input 
              type="number" 
              name="k1" 
              value={inputs.k1 ?? ''} 
              onChange={handleChange} 
              placeholder="1.0" 
              step="0.1"
            />
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Học bạ */}
      <div className="form-group">
        <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>2. Điểm Học Bạ (Lớp 12)</h3>
        <p className="helper-text" style={{ marginBottom: '1rem' }}>Nhập điểm trung bình cả năm của từng môn (thang điểm 10)</p>
        <div className="input-grid">
          <div className="input-wrapper">
            <label>Môn 1</label>
            <input type="number" name="hb_m1" value={inputs.hb_m1 ?? ''} onChange={handleChange} max="10" step="0.1" />
          </div>
          <div className="input-wrapper">
            <label>Môn 2</label>
            <input type="number" name="hb_m2" value={inputs.hb_m2 ?? ''} onChange={handleChange} max="10" step="0.1" />
          </div>
          <div className="input-wrapper">
            <label>Môn 3</label>
            <input type="number" name="hb_m3" value={inputs.hb_m3 ?? ''} onChange={handleChange} max="10" step="0.1" />
          </div>
          <div className="input-wrapper">
            <label>Hệ số k2</label>
            <input type="number" name="k2" value={inputs.k2 ?? ''} onChange={handleChange} step="0.1" />
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Thi Tốt nghiệp */}
      <div className="form-group">
        <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>3. Điểm Thi Tốt Nghiệp</h3>
        <p className="helper-text" style={{ marginBottom: '1rem' }}>Nhập điểm thi của từng môn (thang điểm 10)</p>
        <div className="input-grid">
          <div className="input-wrapper">
            <label>Môn 1</label>
            <input type="number" name="tn_m1" value={inputs.tn_m1 ?? ''} onChange={handleChange} max="10" step="0.1" />
          </div>
          <div className="input-wrapper">
            <label>Môn 2</label>
            <input type="number" name="tn_m2" value={inputs.tn_m2 ?? ''} onChange={handleChange} max="10" step="0.1" />
          </div>
          <div className="input-wrapper">
            <label>Môn 3</label>
            <input type="number" name="tn_m3" value={inputs.tn_m3 ?? ''} onChange={handleChange} max="10" step="0.1" />
          </div>
          <div className="input-wrapper">
            <label>Hệ số k3</label>
            <input type="number" name="k3" value={inputs.k3 ?? ''} onChange={handleChange} step="0.1" />
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Điểm Ưu tiên */}
      <div className="form-group">
        <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>4. Điểm Ưu Tiên & Khuyến Khích</h3>
        <div className="input-wrapper" style={{ maxWidth: '300px' }}>
          <label>Tổng điểm ưu tiên</label>
          <input 
            type="number" 
            name="priorityScore" 
            value={inputs.priorityScore ?? ''} 
            onChange={handleChange} 
            step="0.1" 
          />
        </div>
        
        <div className="criteria-list">
          <strong>Thông tin các tiêu chí khuyến khích (Nếu đáp ứng):</strong>
          <ul>
            <li>Tiêu chí 1: Giải Tỉnh/TP không quá 3 năm.</li>
            <li>Tiêu chí 2: IELTS 6.0+, TOEFL iBT 60+, TOEIC 600+, Bậc 4+.</li>
            <li>Tiêu chí 3: Học sinh trường chuyên/năng khiếu, trọng điểm.</li>
            <li>Tiêu chí 4: Kết quả học tập Tốt 3/6 học kỳ.</li>
            <li>Tiêu chí 5: ĐK chuyên ngành ưu tiên (Đường sắt cao tốc, CNTT, AI) hoặc có thư giới thiệu địa phương/doanh nghiệp.</li>
            <li>Tiêu chí 6: Có thành tích đặc biệt từ trường THPT hợp tác UTH.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

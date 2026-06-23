export interface ScoreInputs {
  // ĐGNL
  dgnl: number | string;
  k1: number | string;
  
  // Điểm học bạ
  hb_m1: number | string;
  hb_m2: number | string;
  hb_m3: number | string;
  k2: number | string;
  
  // Điểm thi tốt nghiệp
  tn_m1: number | string;
  tn_m2: number | string;
  tn_m3: number | string;
  k3: number | string;
  
  // Điểm ưu tiên & khuyến khích
  priorityScore: number | string;
}

export const calculateScores = (rawInputs: ScoreInputs) => {
  // Chuyển đổi an toàn sang số
  const dgnl = Number(rawInputs.dgnl) || 0;
  const k1 = Number(rawInputs.k1) || 0;
  
  const hb_m1 = Number(rawInputs.hb_m1) || 0;
  const hb_m2 = Number(rawInputs.hb_m2) || 0;
  const hb_m3 = Number(rawInputs.hb_m3) || 0;
  const k2 = Number(rawInputs.k2) || 0;
  
  const tn_m1 = Number(rawInputs.tn_m1) || 0;
  const tn_m2 = Number(rawInputs.tn_m2) || 0;
  const tn_m3 = Number(rawInputs.tn_m3) || 0;
  const k3 = Number(rawInputs.k3) || 0;
  
  const priorityScore = rawInputs.priorityScore === '0' ? 0 : Number(rawInputs.priorityScore) || 0;

  // Tính điểm học bạ năm lớp 12
  const maxHb = Math.max(hb_m1, hb_m2, hb_m3);
  const diemHocBa = (hb_m1 + hb_m2 + hb_m3 + maxHb) * 30;

  // Tính điểm thi tốt nghiệp
  const maxTn = Math.max(tn_m1, tn_m2, tn_m3);
  const diemThiTotNghiep = (tn_m1 + tn_m2 + tn_m3 + maxTn) * 30;

  // Tính các thành phần trong hàm Max
  const val1 = k1 * dgnl;
  const val2 = k2 * diemHocBa;
  const val3 = k3 * diemThiTotNghiep;

  const maxComponent = Math.max(val1, val2, val3);

  // Điểm tổng UTH120 (Tối đa 1200 điểm)
  const rawUth120 = 0.4 * maxComponent + 0.3 * diemHocBa + 0.3 * diemThiTotNghiep + priorityScore;
  const uth120 = Math.min(rawUth120, 1200);

  return {
    diemHocBa,
    diemThiTotNghiep,
    maxComponent,
    uth120
  };
};

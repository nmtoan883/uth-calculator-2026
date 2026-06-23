export interface ScoreInputs {
  // ĐGNL
  dgnl: number;
  k1: number;
  
  // Điểm học bạ
  hb_m1: number;
  hb_m2: number;
  hb_m3: number;
  k2: number;
  
  // Điểm thi tốt nghiệp
  tn_m1: number;
  tn_m2: number;
  tn_m3: number;
  k3: number;
  
  // Điểm ưu tiên & khuyến khích
  priorityScore: number;
}

export const calculateScores = (inputs: ScoreInputs) => {
  const { dgnl, k1, hb_m1, hb_m2, hb_m3, k2, tn_m1, tn_m2, tn_m3, k3, priorityScore } = inputs;

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

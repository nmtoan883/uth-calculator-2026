import React, { useState } from 'react';
import { ScoreForm } from './components/ScoreForm';
import { ResultPanel } from './components/ResultPanel';
import { calculateScores } from './utils/calculator';
import type { ScoreInputs } from './utils/calculator';
import './index.css';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<ScoreInputs>({
    dgnl: '',
    k1: 1.0,
    hb_m1: '',
    hb_m2: '',
    hb_m3: '',
    k2: 1.0,
    tn_m1: '',
    tn_m2: '',
    tn_m3: '',
    k3: 1.0,
    priorityScore: '',
  });

  const results = calculateScores(inputs);

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">UTH 2026 Calculator</h1>
        <p className="subtitle">Công cụ tính điểm xét tuyển Phương thức 2 - Xét tuyển kết hợp</p>
      </header>
      
      <main className="main-content">
        <ScoreForm inputs={inputs} onChange={setInputs} />
        <ResultPanel results={results} />
      </main>
    </div>
  );
};

export default App;

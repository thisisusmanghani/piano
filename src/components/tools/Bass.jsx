import React, { useRef, useState } from 'react';
import { useAudioEngine, NOTE_FREQUENCIES } from '../../hooks/useAudioEngine';

const Bass = () => {
  const { initAudio, masterGainRef, audioCtxRef } = useAudioEngine();
  const [oscType, setOscType] = useState('sawtooth');
  const [cutoff, setCutoff] = useState(300);
  const [resonance, setResonance] = useState(5);

  const bassOscRef = useRef(null);
  const bassGainRef = useRef(null);

  const playNote = (note) => {
    const ctx = initAudio();
    if (!ctx) return;
    if (bassOscRef.current) stopNote();

    const freq = NOTE_FREQUENCIES[note];
    if (!freq) return;

    bassOscRef.current = ctx.createOscillator();
    bassGainRef.current = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    bassOscRef.current.type = oscType;
    bassOscRef.current.frequency.value = freq;

    filter.type = 'lowpass';
    filter.frequency.value = cutoff;
    filter.Q.value = resonance;

    bassOscRef.current.connect(filter);
    filter.connect(bassGainRef.current);

    if (masterGainRef.current) bassGainRef.current.connect(masterGainRef.current);
    else bassGainRef.current.connect(ctx.destination);

    bassGainRef.current.gain.setValueAtTime(0.4, ctx.currentTime);
    bassOscRef.current.start();

    const key = document.querySelector(`[data-bass-note="${note}"]`);
    if (key) key.classList.add('active'); // Use generic active or specific if legacy css exists
    if (key) key.style.background = '#10b981'; // Inline override to match legacy
  };

  const stopNote = (note) => {
    if (bassOscRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      bassGainRef.current.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      bassOscRef.current.stop(now + 0.1);
      bassOscRef.current = null;
    }

    document.querySelectorAll('.bass-key').forEach(k => {
      k.style.background = ''; // Clear inline
      k.classList.remove('active');
    });
  };

  return (
    <section class="tool-section" id="bass-tool" style={{ background: 'transparent', paddingTop: '3rem', border: 'none' }}>
      <div class="section-container">
        <div class="section-header">
          <div class="section-label" style={{ color: '#10b981' }}>Step 4: Low Frequency</div>
          <h2 class="section-title">Bass Monosynth</h2>
          <p class="section-description">Analog-modeled monosynth for deep foundations.</p>
        </div>

        <div class="bass-wrapper" style={{ maxWidth: '1000px', margin: '0 auto', background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '2rem' }}>
          <div class="synth-controls" style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', justifyContent: 'center' }}>
            <div class="knob-group" style={{ textAlign: 'center' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Cutoff</label>
              <input type="range" min="50" max="1000" value={cutoff} onChange={(e) => setCutoff(Number(e.target.value))} style={{ accentColor: '#10b981' }} />
            </div>
            <div class="knob-group" style={{ textAlign: 'center' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Resonance</label>
              <input type="range" min="0" max="20" value={resonance} onChange={(e) => setResonance(Number(e.target.value))} style={{ accentColor: '#10b981' }} />
            </div>
            <div class="knob-group" style={{ textAlign: 'center' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Waveform</label>
              <select value={oscType} onChange={(e) => setOscType(e.target.value)} style={{ background: '#27272a', color: '#fff', border: '1px solid #3f3f46', padding: '0.25rem', borderRadius: '4px' }}>
                <option value="sawtooth">Sawtooth</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
              </select>
            </div>
          </div>

          {/* Keys - matching legacy structure with data attributes */}
          <div class="bass-keys" id="bassKeys" style={{ display: 'flex', justifyContent: 'center', height: '200px', position: 'relative', overflow: 'hidden', borderRadius: '0 0 8px 8px' }}>
            {/* C1-B1 */}
            {['C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1'].map(n => (
              <div key={n} className="bass-key" data-bass-note={n} onMouseDown={() => playNote(n)} onMouseUp={() => stopNote(n)} onMouseLeave={() => stopNote(n)} style={{ flex: 1, background: '#fff', border: '1px solid #ccc', borderTop: 'none', cursor: 'pointer' }}></div>
            ))}
            {/* Black keys handled via absolute positioning in legacy CSS/HTML. 
                             I'll replicate the structure exactly as in index.static.html for key positions.
                         */}
            <div className="bass-key black" data-bass-note="C#1" onMouseDown={() => playNote('C#1')} onMouseUp={() => stopNote('C#1')} onMouseLeave={() => stopNote('C#1')} style={{ width: '3%', height: '120px', background: '#000', position: 'absolute', left: '6%', zIndex: 10, borderRadius: '0 0 3px 3px', cursor: 'pointer' }}></div>
            <div className="bass-key black" data-bass-note="D#1" onMouseDown={() => playNote('D#1')} onMouseUp={() => stopNote('D#1')} onMouseLeave={() => stopNote('D#1')} style={{ width: '3%', height: '120px', background: '#000', position: 'absolute', left: '13%', zIndex: 10, borderRadius: '0 0 3px 3px', cursor: 'pointer' }}></div>
            <div className="bass-key black" data-bass-note="F#1" onMouseDown={() => playNote('F#1')} onMouseUp={() => stopNote('F#1')} onMouseLeave={() => stopNote('F#1')} style={{ width: '3%', height: '120px', background: '#000', position: 'absolute', left: '27%', zIndex: 10, borderRadius: '0 0 3px 3px', cursor: 'pointer' }}></div>
            <div className="bass-key black" data-bass-note="G#1" onMouseDown={() => playNote('G#1')} onMouseUp={() => stopNote('G#1')} onMouseLeave={() => stopNote('G#1')} style={{ width: '3%', height: '120px', background: '#000', position: 'absolute', left: '34%', zIndex: 10, borderRadius: '0 0 3px 3px', cursor: 'pointer' }}></div>
            <div className="bass-key black" data-bass-note="A#1" onMouseDown={() => playNote('A#1')} onMouseUp={() => stopNote('A#1')} onMouseLeave={() => stopNote('A#1')} style={{ width: '3%', height: '120px', background: '#000', position: 'absolute', left: '41%', zIndex: 10, borderRadius: '0 0 3px 3px', cursor: 'pointer' }}></div>

            {/* C2-B2 */}
            {['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2'].map(n => (
              <div key={n} className="bass-key" data-bass-note={n} onMouseDown={() => playNote(n)} onMouseUp={() => stopNote(n)} onMouseLeave={() => stopNote(n)} style={{ flex: 1, background: '#fff', border: '1px solid #ccc', borderTop: 'none', cursor: 'pointer' }}></div>
            ))}
            <div className="bass-key black" data-bass-note="C#2" onMouseDown={() => playNote('C#2')} onMouseUp={() => stopNote('C#2')} onMouseLeave={() => stopNote('C#2')} style={{ width: '3%', height: '120px', background: '#000', position: 'absolute', left: '56%', zIndex: 10, borderRadius: '0 0 3px 3px', cursor: 'pointer' }}></div>
            <div className="bass-key black" data-bass-note="D#2" onMouseDown={() => playNote('D#2')} onMouseUp={() => stopNote('D#2')} onMouseLeave={() => stopNote('D#2')} style={{ width: '3%', height: '120px', background: '#000', position: 'absolute', left: '63%', zIndex: 10, borderRadius: '0 0 3px 3px', cursor: 'pointer' }}></div>
            <div className="bass-key black" data-bass-note="F#2" onMouseDown={() => playNote('F#2')} onMouseUp={() => stopNote('F#2')} onMouseLeave={() => stopNote('F#2')} style={{ width: '3%', height: '120px', background: '#000', position: 'absolute', left: '77%', zIndex: 10, borderRadius: '0 0 3px 3px', cursor: 'pointer' }}></div>
            <div className="bass-key black" data-bass-note="G#2" onMouseDown={() => playNote('G#2')} onMouseUp={() => stopNote('G#2')} onMouseLeave={() => stopNote('G#2')} style={{ width: '3%', height: '120px', background: '#000', position: 'absolute', left: '84%', zIndex: 10, borderRadius: '0 0 3px 3px', cursor: 'pointer' }}></div>
            <div className="bass-key black" data-bass-note="A#2" onMouseDown={() => playNote('A#2')} onMouseUp={() => stopNote('A#2')} onMouseLeave={() => stopNote('A#2')} style={{ width: '3%', height: '120px', background: '#000', position: 'absolute', left: '91%', zIndex: 10, borderRadius: '0 0 3px 3px', cursor: 'pointer' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bass;

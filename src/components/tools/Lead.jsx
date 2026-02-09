import React, { useRef, useState } from 'react';
import { useAudioEngine, NOTE_FREQUENCIES } from '../../hooks/useAudioEngine';

const Lead = () => {
    const { initAudio, masterGainRef, audioCtxRef } = useAudioEngine();
    const [glideTime, setGlideTime] = useState(0.1);

    const leadOscRef = useRef(null);
    const leadGainRef = useRef(null);

    const playNote = (note) => {
        const ctx = initAudio();
        if (!ctx) return;

        const targetFreq = NOTE_FREQUENCIES[note];
        if (!targetFreq) return;

        const now = ctx.currentTime;

        if (leadOscRef.current && leadGainRef.current) {
            // Glide to new note
            leadOscRef.current.frequency.cancelScheduledValues(now);
            leadOscRef.current.frequency.linearRampToValueAtTime(targetFreq, now + glideTime);

            // Retrigger envelope slightly
            leadGainRef.current.gain.cancelScheduledValues(now);
            leadGainRef.current.gain.setValueAtTime(leadGainRef.current.gain.value, now);
            leadGainRef.current.gain.linearRampToValueAtTime(0.3, now + 0.05);
        } else {
            // New Note
            leadOscRef.current = ctx.createOscillator();
            leadGainRef.current = ctx.createGain();

            leadOscRef.current.type = 'square';
            leadOscRef.current.frequency.value = targetFreq;

            leadOscRef.current.connect(leadGainRef.current);
            if (masterGainRef.current) leadGainRef.current.connect(masterGainRef.current);
            else leadGainRef.current.connect(ctx.destination);

            leadGainRef.current.gain.setValueAtTime(0, now);
            leadGainRef.current.gain.linearRampToValueAtTime(0.3, now + 0.05);

            leadOscRef.current.start(now);
        }
    };

    const stopNote = () => {
        if (leadOscRef.current && leadGainRef.current && audioCtxRef.current) {
            const now = audioCtxRef.current.currentTime;
            leadGainRef.current.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            leadOscRef.current.stop(now + 0.2);
            leadOscRef.current = null;
            leadGainRef.current = null;
        }
    };

    return (
        <section class="tool-section" id="lead-tool" style={{ background: 'transparent', paddingTop: '3rem', border: 'none' }}>
            <div class="section-container">
                <div class="section-header">
                    <div class="section-label" style={{ color: '#10b981' }}>Step 6: Melody & Solo</div>
                    <h2 class="section-title">Lead Synth</h2>
                    <p class="section-description">High-pitched GLIDE synth for cutting through the mix.</p>
                </div>
                <div class="lead-wrapper" style={{ maxWidth: '1000px', margin: '0 auto', background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '1.5rem' }}>
                    <div class="controls" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <label style={{ color: '#a1a1aa', fontSize: '0.8rem', marginRight: '10px' }}>Glide Time</label>
                        <input type="range" min="0" max="0.5" step="0.01" value={glideTime} onChange={(e) => setGlideTime(parseFloat(e.target.value))} style={{ accentColor: '#10b981', verticalAlign: 'middle' }} />
                    </div>

                    <div class="lead-keys" style={{ display: 'flex', gap: '2px', height: '100px' }}>
                        {['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'].map(n => (
                            <button
                                key={n}
                                className="lead-key"
                                data-note={n}
                                onMouseDown={() => playNote(n)}
                                onMouseUp={stopNote}
                                onMouseLeave={stopNote}
                                onTouchStart={(e) => { e.preventDefault(); playNote(n); }}
                                onTouchEnd={(e) => { e.preventDefault(); stopNote(); }}
                                style={{ flex: 1, background: '#3f3f46', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', transition: 'background 0.1s' }}
                            >
                                {/* Note name visible? Legacy didn't show text, just color change */}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Lead;

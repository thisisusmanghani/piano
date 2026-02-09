import React, { useRef, useState } from 'react';
import { useAudioEngine } from '../../hooks/useAudioEngine';

const Atmosphere = () => {
    const { initAudio, masterGainRef, audioCtxRef } = useAudioEngine();
    const [activeChord, setActiveChord] = useState(null);
    const activeDronesRef = useRef([]);

    const chords = {
        'Cm9': [130.81, 155.56, 196.00, 233.08],
        'Fm9': [174.61, 207.65, 261.63, 311.13],
        'Ebmaj7': [155.56, 196.00, 233.08, 261.63],
        'Gsus4': [196.00, 261.63, 293.66]
    };

    const playDrone = (chordName) => {
        const ctx = initAudio();
        if (!ctx) return;

        stopDrone(); // Stop previous
        setActiveChord(chordName);

        const freqs = chords[chordName];
        if (!freqs) return;

        freqs.forEach(f => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = f;

            const osc2 = ctx.createOscillator();
            osc2.type = 'sine';
            osc2.frequency.value = f * 1.01;

            osc.connect(gain);
            osc2.connect(gain);

            if (masterGainRef.current) gain.connect(masterGainRef.current);
            else gain.connect(ctx.destination);

            const now = ctx.currentTime;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.05, now + 2); // Slow attack

            osc.start();
            osc2.start();

            activeDronesRef.current.push({ osc, osc2, gain });
        });
    };

    const stopDrone = () => {
        if (audioCtxRef.current) {
            const now = audioCtxRef.current.currentTime;
            activeDronesRef.current.forEach(d => {
                d.gain.gain.linearRampToValueAtTime(0, now + 2); // Slow release
                d.osc.stop(now + 2);
                d.osc2.stop(now + 2);
            });
        }
        activeDronesRef.current = [];
        setActiveChord(null);
    };

    const toggleDrone = (chord) => {
        if (activeChord === chord) {
            stopDrone();
        } else {
            playDrone(chord);
        }
    };

    return (
        <section class="tool-section" id="atmosphere-tool" style={{ background: 'transparent', paddingTop: '3rem', border: 'none' }}>
            <div class="section-container">
                <div class="section-header">
                    <div class="section-label" style={{ color: '#10b981' }}>Step 5: Texture</div>
                    <h2 class="section-title">Atmosphere</h2>
                    <p class="section-description">Cinematic drone generator for spatial depth.</p>
                </div>

                <div class="atmosphere-wrapper" style={{ maxWidth: '800px', margin: '0 auto', height: '100px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                    {Object.keys(chords).map((chord) => (
                        <button
                            key={chord}
                            onClick={() => toggleDrone(chord)}
                            className="drone-pad"
                            style={{
                                background: '#27272a',
                                border: activeChord === chord ? '1px solid #10b981' : '1px solid #3f3f46',
                                borderRadius: '8px',
                                color: activeChord === chord ? '#10b981' : '#a1a1aa',
                                fontSize: '1.25rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                boxShadow: activeChord === chord ? '0 0 15px rgba(16,185,129,0.3)' : '0 4px 6px -1px rgba(0,0,0,0.5)'
                            }}
                        >
                            {chord}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Atmosphere;

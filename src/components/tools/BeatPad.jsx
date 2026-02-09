import React, { useState } from 'react';
import { useAudioEngine } from '../../hooks/useAudioEngine';

const BeatPad = () => {
    const { initAudio, masterGainRef, audioCtxRef } = useAudioEngine();
    const [activePad, setActivePad] = useState(null);

    const playSound = (type) => {
        const ctx = initAudio();
        if (!ctx) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);

        if (masterGainRef.current) gain.connect(masterGainRef.current);
        else gain.connect(ctx.destination);

        if (type.includes('kick') || type === 'sub') {
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.5);
            gain.gain.setValueAtTime(1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        } else if (type.includes('snare') || type === 'clap') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(200, now);
            gain.gain.setValueAtTime(0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

            // White noise burst
            const noiseSize = ctx.sampleRate * 0.2;
            const buffer = ctx.createBuffer(1, noiseSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < noiseSize; i++) data[i] = Math.random() * 2 - 1;

            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(0.5, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

            noise.connect(noiseGain);
            if (masterGainRef.current) noiseGain.connect(masterGainRef.current);
            else noiseGain.connect(ctx.destination);

            noise.start(now);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type.includes('hihat')) {
            osc.type = 'square';
            osc.frequency.value = 800;
            const dur = type.includes('open') ? 0.3 : 0.05;
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + dur);
            osc.start(now); osc.stop(now + dur);
        } else {
            // Toms, Cowbell, etc.
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(type === 'cowbell' ? 800 : 200, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now); osc.stop(now + 0.2);
        }
    };

    // Grid layout matching legacy: 4 rows of 4
    // Row 1: crash, ride, tom1, tom2
    // Row 2: hihat-open, hihat-closed, clap, cowbell
    // Row 3: snare, snare-rim, shaker, snap
    // Row 4: kick, kick-deep, sub, impact
    const padLayout = [
        ['crash', 'ride', 'tom1', 'tom2'],
        ['hihat-open', 'hihat-closed', 'clap', 'cowbell'],
        ['snare', 'snare-rim', 'shaker', 'snap'],
        ['kick', 'kick-deep', 'sub', 'impact']
    ];

    const handlePadClick = (type) => {
        playSound(type);
        setActivePad(type);
        setTimeout(() => setActivePad(null), 100);
    };

    return (
        <section class="tool-section" id="beat-pad-tool" style={{ background: '#18181b', padding: '4rem 0', borderTop: '1px solid #27272a', borderBottom: '1px solid #27272a' }}>
            <div class="section-container">
                <div class="section-header">
                    <div class="section-label" style={{ color: '#10b981' }}>Step 7: Manual Percussion</div>
                    <h2 class="section-title">MPC Beat Pad</h2>
                    <p class="section-description">16-pad grid for finger drumming.</p>
                </div>

                <div class="mpc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
                    {padLayout.map(row => row.map(sound => (
                        <button
                            key={sound}
                            className={`mpc-pad ${activePad === sound ? 'active' : ''}`}
                            data-sound={sound}
                            onMouseDown={() => handlePadClick(sound)}
                            // Add styles based on sound type (matching legacy color hints roughly)
                            style={{
                                aspectRatio: '1',
                                background: sound.startsWith('kick') || sound === 'sub' || sound === 'impact' ? '#10b981' :
                                    sound.startsWith('snare') || sound === 'snare-rim' ? '#3f3f46' : '#27272a',
                                border: sound.startsWith('kick') ? '1px solid #059669' : sound.startsWith('snare') ? '1px solid #52525b' : '1px solid #3f3f46',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.1s',
                                transform: activePad === sound ? 'scale(0.95)' : 'scale(1)',
                                boxShadow: activePad === sound ? `0 0 15px ${sound.startsWith('kick') ? '#10b981' : '#fff'}` : 'none'
                            }}
                        ></button>
                    )))}
                </div>
            </div>
        </section>
    );
};

export default BeatPad;

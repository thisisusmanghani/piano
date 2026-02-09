import React, { useState, useRef } from 'react';
import { useAudioEngine, NOTE_FREQUENCIES } from '../../hooks/useAudioEngine';

const Piano = () => {
    const { initAudio, masterGainRef, audioCtxRef } = useAudioEngine();
    const activeNotes = useRef({});
    const [volume, setVolume] = useState(0.5);
    const [sustain, setSustain] = useState(false);

    const playNote = (note) => {
        const ctx = initAudio();
        if (!ctx) return;

        if (activeNotes.current[note]) stopNote(note);

        const baseFreq = NOTE_FREQUENCIES[note];
        if (!baseFreq) return;

        const now = ctx.currentTime;

        // Synthesis: Triangle + Sine mix
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.value = baseFreq;
        osc2.frequency.value = baseFreq;

        // Filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(baseFreq * 4, now);
        filter.frequency.exponentialRampToValueAtTime(baseFreq * 1, now + 1);

        // Amp Envelope
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(volume, now + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(volume * 0.6, now + 0.5);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);

        if (masterGainRef.current) {
            gainNode.connect(masterGainRef.current);
        } else {
            gainNode.connect(ctx.destination);
        }

        osc1.start(now);
        osc2.start(now);

        activeNotes.current[note] = { osc1, osc2, gainNode };

        // Visual feedback
        const key = document.querySelector(`[data-note="${note}"]`);
        if (key) key.classList.add('active');
    };

    const stopNote = (note) => {
        const active = activeNotes.current[note];
        if (active && audioCtxRef.current) {
            const now = audioCtxRef.current.currentTime;
            const release = sustain ? 2.5 : 0.2;

            active.gainNode.gain.cancelScheduledValues(now);
            active.gainNode.gain.setValueAtTime(active.gainNode.gain.value, now);
            active.gainNode.gain.exponentialRampToValueAtTime(0.001, now + release);

            setTimeout(() => {
                active.osc1.stop();
                active.osc2.stop();
                delete activeNotes.current[note];
            }, release * 1000 + 100);
        }

        // Visual reset
        const key = document.querySelector(`[data-note="${note}"]`);
        if (key) key.classList.remove('active');
    };

    return (
        <section class="tool-section" id="piano-tool">
            <div class="section-container">
                <div class="section-header">
                    <div class="section-label">Virtual Instrument</div>
                    <h2 class="section-title">Grand Piano Engine</h2>
                    <p class="section-description">
                        Low-latency synthesis with touch response and MIDI support. Use your keyboard to play.
                    </p>
                </div>

                <div class="piano-wrapper" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div class="piano-controls">
                        <div class="control-group">
                            <label>Master Vol</label>
                            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} style={{ accentColor: '#10b981' }} />
                        </div>
                        <div class="control-group">
                            <div className={`toggle-switch ${sustain ? 'active' : ''}`} onClick={() => setSustain(!sustain)}></div>
                            <label>Sustain</label>
                        </div>
                        {/* Song Player placeholder - can be implemented if needed, logic is similar to Guitar */}
                    </div>

                    <div class="piano-keys" id="pianoKeys">
                        {/* Octave 3 */}
                        <div class="key white" data-note="C3" onMouseDown={() => playNote('C3')} onMouseUp={() => stopNote('C3')} onMouseLeave={() => stopNote('C3')}><span>A</span></div>
                        <div class="key black" data-note="C#3" onMouseDown={() => playNote('C#3')} onMouseUp={() => stopNote('C#3')} onMouseLeave={() => stopNote('C#3')}><span>W</span></div>
                        <div class="key white" data-note="D3" onMouseDown={() => playNote('D3')} onMouseUp={() => stopNote('D3')} onMouseLeave={() => stopNote('D3')}><span>S</span></div>
                        <div class="key black" data-note="D#3" onMouseDown={() => playNote('D#3')} onMouseUp={() => stopNote('D#3')} onMouseLeave={() => stopNote('D#3')}><span>E</span></div>
                        <div class="key white" data-note="E3" onMouseDown={() => playNote('E3')} onMouseUp={() => stopNote('E3')} onMouseLeave={() => stopNote('E3')}><span>D</span></div>
                        <div class="key white" data-note="F3" onMouseDown={() => playNote('F3')} onMouseUp={() => stopNote('F3')} onMouseLeave={() => stopNote('F3')}><span>F</span></div>
                        <div class="key black" data-note="F#3" onMouseDown={() => playNote('F#3')} onMouseUp={() => stopNote('F#3')} onMouseLeave={() => stopNote('F#3')}><span>T</span></div>
                        <div class="key white" data-note="G3" onMouseDown={() => playNote('G3')} onMouseUp={() => stopNote('G3')} onMouseLeave={() => stopNote('G3')}><span>G</span></div>
                        <div class="key black" data-note="G#3" onMouseDown={() => playNote('G#3')} onMouseUp={() => stopNote('G#3')} onMouseLeave={() => stopNote('G#3')}><span>Y</span></div>
                        <div class="key white" data-note="A3" onMouseDown={() => playNote('A3')} onMouseUp={() => stopNote('A3')} onMouseLeave={() => stopNote('A3')}><span>H</span></div>
                        <div class="key black" data-note="A#3" onMouseDown={() => playNote('A#3')} onMouseUp={() => stopNote('A#3')} onMouseLeave={() => stopNote('A#3')}><span>U</span></div>
                        <div class="key white" data-note="B3" onMouseDown={() => playNote('B3')} onMouseUp={() => stopNote('B3')} onMouseLeave={() => stopNote('B3')}><span>J</span></div>

                        {/* Octave 4 */}
                        <div class="key white" data-note="C4" onMouseDown={() => playNote('C4')} onMouseUp={() => stopNote('C4')} onMouseLeave={() => stopNote('C4')}><span>K</span></div>
                        <div class="key black" data-note="C#4" onMouseDown={() => playNote('C#4')} onMouseUp={() => stopNote('C#4')} onMouseLeave={() => stopNote('C#4')}><span>O</span></div>
                        <div class="key white" data-note="D4" onMouseDown={() => playNote('D4')} onMouseUp={() => stopNote('D4')} onMouseLeave={() => stopNote('D4')}><span>L</span></div>
                        <div class="key black" data-note="D#4" onMouseDown={() => playNote('D#4')} onMouseUp={() => stopNote('D#4')} onMouseLeave={() => stopNote('D#4')}><span>P</span></div>
                        <div class="key white" data-note="E4" onMouseDown={() => playNote('E4')} onMouseUp={() => stopNote('E4')} onMouseLeave={() => stopNote('E4')}><span>;</span></div>
                        <div class="key white" data-note="F4" onMouseDown={() => playNote('F4')} onMouseUp={() => stopNote('F4')} onMouseLeave={() => stopNote('F4')}><span>'</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Piano;

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Pricing from './components/sections/Pricing';
import Instructors from './components/sections/Instructors';
import Testimonials from './components/sections/Testimonials';
import Piano from './components/tools/Piano';
import Bass from './components/tools/Bass';
import Atmosphere from './components/tools/Atmosphere';
import Lead from './components/tools/Lead';
import BeatPad from './components/tools/BeatPad';
import Privacy from './components/legal/Privacy';
import Terms from './components/legal/Terms';
import { useAudioEngine } from './hooks/useAudioEngine';

const MainLayout = () => {
    // We need to implement the visualizer here or in a component
    // I'll keep the structure from index.static.html
    const { initAudio, analyserRef } = useAudioEngine();

    useEffect(() => {
        // Visualizer Logic
        const canvas = document.getElementById('audioVisualizer');
        if (!canvas || !analyserRef.current) return;

        const ctx = canvas.getContext('2d');
        const analyser = analyserRef.current;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        let animationId;

        const draw = () => {
            animationId = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = '#18181b';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Grid
            ctx.strokeStyle = '#27272a';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let y = 20; y < canvas.height; y += 40) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();

            // Bars
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * canvas.height;
                const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
                gradient.addColorStop(0, '#10b981');
                gradient.addColorStop(1, '#06b6d4');
                ctx.fillStyle = gradient;
                if (barHeight > 0) ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };
        draw();

        return () => cancelAnimationFrame(animationId);
    }, [analyserRef]); // Depend on analyser ref (stable)

    return (
        <>
            <Hero />

            {/* DIGITAL STUDIO WRAPPER */}
            <section id="digital-studio" style={{ background: '#09090b', borderBottom: '1px solid #27272a', paddingBottom: '4rem' }}>
                <div className="section-container" style={{ padding: '4rem 1rem 0' }}>
                    <div className="studio-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span className="section-label" style={{ color: '#10b981', letterSpacing: '0.1em', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>Interactive Studio</span>
                        <h2 className="section-title" style={{ fontSize: '2.5rem', margin: '0.5rem 0', background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Jam Session</h2>
                        <p className="section-description" style={{ maxWidth: '600px', margin: '0 auto 2rem', color: '#a1a1aa' }}>
                            Experience the power of our audio engine. Start a session to hear them play together.
                        </p>
                        <button onClick={initAudio} style={{ padding: '1rem 2.5rem', background: '#10b981', color: '#000', border: 'none', borderRadius: '99px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 0 30px rgba(16, 185, 129, 0.25)', transition: 'transform 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                            Start Jam Session
                        </button>
                    </div>
                </div>

                {/* Visualizer Section */}
                <section id="visualizer-tool" style={{ background: 'transparent', padding: '0 0 2rem 0', border: 'none', position: 'relative', overflow: 'hidden', display: 'block' }}>
                    <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="section-header">
                            <div className="section-label">Visual Engine</div>
                            <h2 className="section-title">Audio Spectrum</h2>
                            <p className="section-description">Real-time frequency analysis of your performance.</p>
                            <button id="testAudioBtn" onClick={initAudio} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#27272a', border: '1px solid #3f3f46', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                ▶ Test Audio
                            </button>
                        </div>
                        <canvas id="audioVisualizer" width="1000" height="200" style={{ width: '100%', height: '200px', background: '#18181b', borderRadius: '12px', border: '1px solid #27272a', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}></canvas>
                    </div>
                </section>

                {/* Mixer Panel */}
                <div className="mixer-panel" style={{ maxWidth: '1000px', margin: '2rem auto', background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-around', alignItems: 'center' }}>
                    {['Drums', 'Piano', 'Bass', 'Lead'].map(inst => (
                        <div className="fader-group" key={inst}>
                            <input type="range" id={`${inst.toLowerCase()}Vol`} min="0" max="1" step="0.01" defaultValue={inst === 'Drums' ? "1.0" : inst === 'Piano' ? "0.5" : inst === 'Bass' ? "0.4" : "0.3"} />
                            <label>{inst}</label>
                        </div>
                    ))}
                </div>

                {/* Tools */}
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
                    <Piano />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
                        <Bass />
                        <Atmosphere />
                        <Lead />
                    </div>
                    {/* BeatPad usually separate full width in original? Let's check. Original: <section id="rhythm-engine"> matches tool structure? 
                        In original HTML, BeatPad was separate section? No, wait. 
                        Legacy HTML: all in #digital-studio? 
                        Let's put BeatPad here.
                    */}
                    <BeatPad />
                </div>
            </section>

            <Features />
            <Pricing />
            <Instructors />
            <Testimonials />
        </>
    );
};


function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<MainLayout />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;

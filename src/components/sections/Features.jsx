import React from 'react';

const Features = () => {
    return (
        <section className="features" id="tools">
            <div className="section-container">
                <div className="section-header">
                    <div className="section-label">Tool Suite</div>
                    <h2 className="section-title">Everything you need to create</h2>
                    <p className="section-description">
                        From sketch to master, our suite covers every stage of production.
                    </p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11.5 2a8.5 8.5 0 0 1 0 17v3l-3-3-3 3v-3a8.5 8.5 0 0 1 6-16z" />
                                <circle cx="11.5" cy="10.5" r="3" />
                                <path d="M11.5 7.5v-2M14.5 10.5h2M11.5 13.5v2M8.5 10.5h-2" />
                            </svg>
                        </div>
                        <h3>Studio Guitar</h3>
                        <p>High-fidelity guitar modeling with customizable effects chain.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="14" rx="2" />
                                <circle cx="12" cy="11" r="3" />
                                <path d="M10.5 9.5l4 3-4 3z" fill="currentColor" />
                            </svg>
                        </div>
                        <h3>Grand Piano Engine</h3>
                        <p>Full-range virtual piano with MIDI support and velocity sensitivity.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path
                                    d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 8v4l2 2" />
                            </svg>
                        </div>
                        <h3>Precision Tuner</h3>
                        <p>Chromatic tuner with +/- 0.1 cent accuracy using browser audio API.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18V5l12-2v13" />
                                <circle cx="6" cy="18" r="3" />
                                <circle cx="18" cy="16" r="3" />
                                <path d="M9 9l12-2" />
                            </svg>
                        </div>
                        <h3>Metronome Pro</h3>
                        <p>Polyrhythm capable metronome with visual beat indicators and tap tempo.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" y1="19" x2="12" y2="22" />
                                <path d="M8 22h8" />
                                <path d="M3 10l1.5 1.5M21 10l-1.5 1.5M3 14l1.5-1.5M21 14l-1.5-1.5" />
                            </svg>
                        </div>
                        <h3>Audio Analyzer</h3>
                        <p>Real-time spectrogram and frequency analysis for sound engineering.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h3>Scale Dictionary</h3>
                        <p>Comprehensive library of 500+ scales and modes mapped for any instrument.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 6v6l4 2"></path>
                            </svg>
                        </div>
                        <h3>Circle of Fifths</h3>
                        <p>Interactive harmonic wheel for songwriting and modulation visualization.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 12a11 11 0 0 1-22 0 11 11 0 0 1 22 0Z"></path>
                                <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0"></path>
                            </svg>
                        </div>
                        <h3>Drum Sequencer</h3>
                        <p>Browser-based 808 drum machine with programmable patterns and export.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12h20"></path>
                                <path d="M6 12v-3a6 6 0 0 1 12 0v3"></path>
                            </svg>
                        </div>
                        <h3>Interval Trainer</h3>
                        <p>Professional ear training tools for refining pitch recognition.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="m16 6-4 4-4-4"></path>
                                <path d="M12 21V10"></path>
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            </svg>
                        </div>
                        <h3>Reverse Chord Finder</h3>
                        <p>Identify unknown chords by simply selecting notes on the fretboard.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20"></path>
                                <path d="M2 12h20"></path>
                                <path d="m2 12 5 5"></path>
                                <path d="m22 12-5 5"></path>
                            </svg>
                        </div>
                        <h3>Stem Splitter</h3>
                        <p>AI-powered track separation to isolate vocals, drums, or instruments.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                        <h3>MIDI Recorder</h3>
                        <p>Capture your ideas with a lightweight, browser-based DAW environment.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;

import React, { useState, useEffect, useRef } from 'react';
import { useAudioEngine } from '../../hooks/useAudioEngine';

const STRINGS = 6;
const FRETS = 8;
const STRING_NOTES = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const CHORDS = {
    'C': { frets: [-1, 1, 0, 2, 3, -1], fingers: [null, 1, null, 2, 3, null] },
    'G': { frets: [3, 0, 0, 0, 2, 3], fingers: [2, null, null, null, 1, 3] },
    'Am': { frets: [0, 1, 2, 2, 0, -1], fingers: [null, 1, 2, 3, null, null] },
    'F': { frets: [1, 1, 2, 3, 3, 1], fingers: [1, 1, 2, 3, 4, 1] },
    'D': { frets: [2, 3, 2, 0, -1, -1], fingers: [1, 3, 2, null, null, null] },
    'Em': { frets: [0, 0, 0, 2, 2, 0], fingers: [null, null, null, 1, 2, null] }
};

const SONGS = {
    greensleeves: {
        name: 'Greensleeves',
        tempo: 400,
        notes: [
            [2, 0, 1], [1, 1, 1], [0, 3, 2], [0, 5, 1], [0, 3, 1], [0, 1, 2],
            [1, 0, 1], [2, 0, 1], [1, 1, 2], [2, 0, 1], [1, 1, 1], [0, 0, 2],
            [0, 0, 1], [1, 0, 1], [0, 1, 2], [0, 3, 1], [0, 5, 1], [0, 3, 2],
            [0, 1, 1], [1, 0, 1], [2, 0, 2], [1, 1, 1], [2, 0, 1], [1, 1, 2]
        ]
    },
    houseoftherisingsun: {
        name: 'House of the Rising Sun',
        tempo: 350,
        notes: [
            [4, 0, 1], [3, 2, 1], [2, 2, 1], [1, 1, 1], [2, 2, 1], [3, 2, 1], [4, 2, 1], [3, 2, 1],
            [2, 0, 1], [1, 1, 1], [2, 0, 1], [3, 2, 1], [4, 0, 1], [3, 2, 1], [2, 1, 1], [1, 0, 1],
            [2, 1, 1], [3, 2, 1], [4, 2, 1], [3, 2, 1], [2, 2, 1], [1, 1, 1], [2, 2, 1], [3, 2, 1]
        ]
    },
    amazinggrace: {
        name: 'Amazing Grace',
        tempo: 500,
        notes: [
            [3, 0, 1], [2, 0, 2], [1, 1, 1], [2, 0, 1], [1, 1, 2], [1, 0, 1], [2, 0, 3],
            [3, 2, 1], [3, 0, 2], [2, 0, 1], [1, 1, 1], [2, 0, 1], [1, 1, 2], [0, 0, 1],
            [0, 3, 3], [0, 3, 1], [0, 0, 2], [1, 1, 1], [2, 0, 1], [1, 1, 2], [1, 0, 1], [2, 0, 3]
        ]
    }
};

const Guitar = () => {
    const { initAudio, masterGainRef, audioCtxRef } = useAudioEngine();
    const [activeNotes, setActiveNotes] = useState([]);
    const [currentChord, setCurrentChord] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState('greensleeves');
    const [songProgress, setSongProgress] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const compressorRef = useRef(null);
    const songTimeoutRef = useRef(null);
    const noteIndexRef = useRef(0);

    // Initialize Compressor
    useEffect(() => {
        if (audioCtxRef.current && !compressorRef.current) {
            const ctx = audioCtxRef.current;
            const comp = ctx.createDynamicsCompressor();
            comp.threshold.value = -24;
            comp.knee.value = 30;
            comp.ratio.value = 12;
            comp.attack.value = 0.003;
            comp.release.value = 0.25;
            comp.connect(ctx.destination);
            compressorRef.current = comp;
        }
    }, [audioCtxRef.current]);

    const getNoteAtPosition = (string, fret) => {
        const baseNote = STRING_NOTES[string];
        const baseNoteIndex = NOTE_NAMES.indexOf(baseNote.slice(0, -1).replace('b', '#'));
        const noteIndex = (baseNoteIndex + fret + 1) % 12;
        return NOTE_NAMES[noteIndex];
    };

    const getFrequency = (string, fret) => {
        const baseFreqs = [329.63, 246.94, 196.00, 146.83, 110.00, 82.41];
        return baseFreqs[string] * Math.pow(2, fret / 12);
    };

    const playNote = (string, fret, showMarker = true) => {
        if (!soundEnabled) return;

        const ctx = initAudio();
        if (!ctx) return;

        if (showMarker) {
            const id = `${string}-${fret}`;
            setActiveNotes(prev => [...prev.filter(n => n !== id), id]);
            setTimeout(() => setActiveNotes(prev => prev.filter(n => n !== id)), 300);
        }

        try {
            const freq = getFrequency(string, fret);
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gainNode = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc1.type = 'triangle';
            osc2.type = 'sine';
            osc1.frequency.value = freq;
            osc2.frequency.value = freq * 2;

            filter.type = 'lowpass';
            filter.frequency.value = 1800;
            filter.Q.value = 0.7;

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gainNode);

            if (compressorRef.current) {
                gainNode.connect(compressorRef.current);
                if (masterGainRef.current) gainNode.connect(masterGainRef.current);
            } else if (masterGainRef.current) {
                gainNode.connect(masterGainRef.current);
            } else {
                gainNode.connect(ctx.destination);
            }

            const now = ctx.currentTime;
            gainNode.gain.setValueAtTime(0.001, now);
            gainNode.gain.exponentialRampToValueAtTime(0.15, now + 0.015);
            gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

            osc1.start(now);
            osc2.start(now);
            osc1.stop(now + 1.2);
            osc2.stop(now + 1.2);

        } catch (e) {
            console.error("Audio Error", e);
        }
    };

    const showChord = (chordName) => {
        if (currentChord === chordName) {
            setCurrentChord(null);
            return;
        }

        setCurrentChord(chordName);
        stopSong();

        const chord = CHORDS[chordName];
        const notesToPlay = [];

        chord.frets.forEach((fret, string) => {
            if (fret >= 0) {
                const domFret = fret === 0 ? 0 : fret - 1;
                notesToPlay.push({ string, fret: domFret });
            }
        });

        notesToPlay.reverse().forEach((note, i) => {
            setTimeout(() => playNote(note.string, note.fret), i * 40);
        });
    };

    const playSong = () => {
        if (isPlaying) {
            stopSong();
            return;
        }
        initAudio();
        setIsPlaying(true);
        noteIndexRef.current = 0;
        playNextNote();
    };

    const stopSong = () => {
        setIsPlaying(false);
        clearTimeout(songTimeoutRef.current);
        setSongProgress(0);
    };

    const playNextNote = () => { };

    useEffect(() => {
        if (isPlaying) {
            const song = SONGS[currentSong];
            const schedule = () => {
                if (noteIndexRef.current >= song.notes.length) {
                    stopSong();
                    return;
                }
                const [string, fret, duration] = song.notes[noteIndexRef.current];
                playNote(string, fret, true);

                setSongProgress(((noteIndexRef.current + 1) / song.notes.length) * 100);

                noteIndexRef.current++;
                songTimeoutRef.current = setTimeout(schedule, song.tempo * duration);
            };
            schedule();
        }
        return () => clearTimeout(songTimeoutRef.current);
    }, [isPlaying, currentSong]);

    // Render Markers Helper
    const isMarkerActive = (string, fret) => {
        return activeNotes.includes(`${string}-${fret}`);
    };

    // Check if chord marker should show
    const isChordMarker = (string, fret) => {
        if (!currentChord) return false;
        const chord = CHORDS[currentChord];
        const chordFret = chord.frets[string];
        const domFret = chordFret === 0 ? 0 : chordFret - 1;
        return chordFret >= 0 && domFret === fret;
    };

    return (
        <div className="guitar-wrapper">
            <div className="guitar-card">
                <div className="guitar-header">
                    <span className="guitar-title">Try it — Click a chord</span>
                    <div className="guitar-controls">
                        {Object.keys(CHORDS).map(chord => (
                            <button
                                key={chord}
                                className={`chord-btn ${currentChord === chord ? 'active' : ''}`}
                                data-chord={chord}
                                onClick={() => showChord(chord)}
                            >
                                {chord}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="guitar-neck">
                    <div className="fretboard">
                        <div className="nut"></div>
                        <div className="fretboard-grid" id="fretboard">
                            <div className="string-labels">
                                {['E', 'B', 'G', 'D', 'A', 'E'].map((s, i) => (
                                    <div key={i} className="string-label">{s}</div>
                                ))}
                            </div>

                            {/* Generated Frets */}
                            {[...Array(STRINGS)].map((_, stringIndex) => (
                                [...Array(FRETS)].map((_, fretIndex) => (
                                    <div
                                        key={`${stringIndex}-${fretIndex}`}
                                        className="fret"
                                        data-string={stringIndex}
                                        data-fret={fretIndex}
                                        onClick={() => playNote(stringIndex, fretIndex)}
                                    >
                                        {/* Fret Markers */}
                                        {stringIndex === 2 && [2, 4, 6].includes(fretIndex) && (
                                            <div className="fret-marker"></div>
                                        )}

                                        {/* Note Marker */}
                                        <div className={`note-marker ${isMarkerActive(stringIndex, fretIndex) || isChordMarker(stringIndex, fretIndex) ? 'show' : ''} ${isMarkerActive(stringIndex, fretIndex) ? 'playing' : ''}`}>
                                            {getNoteAtPosition(stringIndex, fretIndex)}
                                        </div>
                                    </div>
                                ))
                            ))}

                        </div>
                    </div>
                </div>
                <div className="guitar-footer">
                    <div className="guitar-footer-row">
                        <span className="guitar-hint">Click frets to play notes</span>
                        <div className="footer-controls">
                            <button className="clear-btn" onClick={() => { setCurrentChord(null); stopSong(); }}>Clear</button>
                            <div className="sound-toggle">
                                <span>Sound</span>
                                <div
                                    className={`toggle-switch ${soundEnabled ? 'active' : ''}`}
                                    onClick={() => setSoundEnabled(!soundEnabled)}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="song-player">
                        <button className={`play-btn ${isPlaying ? 'playing' : ''}`} onClick={playSong}>
                            {isPlaying ? '■' : '▶'}
                        </button>
                        <div className="song-info">
                            <div className="song-title">{SONGS[currentSong].name}</div>
                            <div className="song-progress">
                                <div className="song-progress-bar" style={{ width: `${songProgress}%` }}></div>
                            </div>
                        </div>
                        <select
                            className="song-select"
                            value={currentSong}
                            onChange={(e) => { stopSong(); setCurrentSong(e.target.value); }}
                        >
                            {Object.entries(SONGS).map(([key, data]) => (
                                <option key={key} value={key}>{data.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guitar;

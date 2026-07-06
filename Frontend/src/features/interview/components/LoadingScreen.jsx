import React, { useState, useEffect } from 'react';
import '../style/loading.scss';

const STEPS = [
    { label: "Analyzing job requirements & description", duration: 15 },
    { label: "Extracting key qualifications & tech stack details", duration: 35 },
    { label: "Aligning candidate experience & profile strengths", duration: 55 },
    { label: "Generating personalized technical questions", duration: 75 },
    { label: "Synthesizing behavioral question scenarios", duration: 92 },
    { label: "Drafting custom preparation roadmap & strategy", duration: 100 }
];

const TIPS = [
    "Tip: Use the STAR method (Situation, Task, Action, Result) to structure behavioral answers.",
    "Tip: Talk through your logical steps out loud during technical and system design rounds.",
    "Tip: Analyze both time and space complexity (Big O notation) before writing code.",
    "Tip: Align your resume highlights with the core keywords found in the job description.",
    "Tip: Always prepare 2-3 custom questions to ask the interviewer at the end of the session.",
    "Tip: For system design questions, establish scale and requirements before designing architectures.",
    "Tip: If you don't know the exact solution, detail your logical debugging process clearly."
];

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [tipIndex, setTipIndex] = useState(0);
    const [activeStep, setActiveStep] = useState(0);

    // Progress Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 98) {
                    return 98; // Hold at 98% until backend resolves
                }
                
                // Slow down growth as it approaches 100%
                let increment = 0;
                if (prev < 25) {
                    increment = Math.random() * 4 + 2; // Fast start
                } else if (prev < 55) {
                    increment = Math.random() * 3 + 1.5;
                } else if (prev < 85) {
                    increment = Math.random() * 2 + 0.8;
                } else {
                    increment = Math.random() * 0.8 + 0.2; // Slow finish
                }
                
                const nextProgress = Math.min(prev + increment, 98);
                
                // Update active step based on progress threshold
                let nextStep = 0;
                for (let i = 0; i < STEPS.length; i++) {
                    if (nextProgress >= (i > 0 ? STEPS[i - 1].duration : 0) && nextProgress <= STEPS[i].duration) {
                        nextStep = i;
                        break;
                    }
                }
                setActiveStep(nextStep);
                
                return nextProgress;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    // Cycling Tips
    useEffect(() => {
        const interval = setInterval(() => {
            setTipIndex((prev) => (prev + 1) % TIPS.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="loading-container">
            <div className="loading-glow" />
            
            <div className="loading-card">
                {/* AI Visualizer Icon */}
                <div className="ai-visualizer">
                    <div className="pulse-ring ring-1"></div>
                    <div className="pulse-ring ring-2"></div>
                    <div className="pulse-ring ring-3"></div>
                    <div className="center-node">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai-icon">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="M12 6v12M6 12h12M7.75 7.75l8.5 8.5M7.75 16.25l8.5-8.5" />
                        </svg>
                    </div>
                </div>

                <h1 className="loading-title">Forging Your Interview Strategy</h1>
                <p className="loading-subtitle">Our AI is designing a bespoke game plan just for you.</p>

                {/* Progress bar container */}
                <div className="progress-section">
                    <div className="progress-meta">
                        <span className="progress-status">Analyzing Profile</span>
                        <span className="progress-percentage">{Math.round(progress)}%</span>
                    </div>
                    <div className="progress-bar-wrapper">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
                            <div className="progress-bar-glow" />
                        </div>
                    </div>
                </div>

                {/* Execution Steps */}
                <div className="steps-list">
                    {STEPS.map((step, index) => {
                        const isCompleted = progress > step.duration || (index < activeStep);
                        const isActive = index === activeStep;
                        
                        let stepClass = "step-item";
                        if (isCompleted) stepClass += " step-item--completed";
                        else if (isActive) stepClass += " step-item--active";
                        else stepClass += " step-item--pending";

                        return (
                            <div key={index} className={stepClass}>
                                <div className="step-indicator">
                                    {isCompleted ? (
                                        <svg className="icon-success" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : isActive ? (
                                        <div className="spinner-mini" />
                                    ) : (
                                        <div className="dot-pending" />
                                    )}
                                </div>
                                <span className="step-label">{step.label}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Interactive Tips */}
                <div className="tips-carousel">
                    <div className="tip-card">
                        <div className="tip-header">
                            <svg className="tip-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                                <line x1="9" y1="18" x2="15" y2="18" />
                                <line x1="10" y1="22" x2="14" y2="22" />
                            </svg>
                            <span>PREPARATION TIP</span>
                        </div>
                        <p className="tip-content">{TIPS[tipIndex]}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoadingScreen;

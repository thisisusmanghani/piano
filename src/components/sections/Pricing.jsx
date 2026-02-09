import React, { useState } from 'react';

const Pricing = () => {
    const [billing, setBilling] = useState('monthly');

    // Helper to calculate pricing display
    // Monthly: Free, 30/mo, 440 (Lifetime)
    // Quarterly: Free, 25.50/mo (billed 76.50), 440
    // Yearly: Free, 21/mo (billed 252), 440

    const PRICING = {
        monthly: { price: 30, period: '/mo', billed: '', savings: '' },
        quarterly: { price: 25.50, period: '/mo', billed: 'Billed $76.50 every 3 months', savings: 'Save 15%' },
        yearly: { price: 21, period: '/mo', billed: 'Billed $252 per year', savings: 'Save 30%' }
    };

    const currentPlan = PRICING[billing];

    return (
        <section className="pricing" id="pricing">
            <div className="section-container">
                <div className="section-header">
                    <div className="section-label">Pricing</div>
                    <h2 className="section-title">Simple, transparent but dummy pricing</h2>
                    <p className="section-description">
                        Start with a free trial. No credit card required.
                    </p>
                </div>
                <div className="billing-toggle">
                    <button
                        className={`billing-option ${billing === 'monthly' ? 'active' : ''}`}
                        onClick={() => setBilling('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`billing-option ${billing === 'quarterly' ? 'active' : ''}`}
                        onClick={() => setBilling('quarterly')}
                    >
                        Quarterly
                        <span className="discount-badge">-15%</span>
                    </button>
                    <button
                        className={`billing-option ${billing === 'yearly' ? 'active' : ''}`}
                        onClick={() => setBilling('yearly')}
                    >
                        Yearly
                        <span className="discount-badge">-30%</span>
                    </button>
                </div>
                <div className="pricing-grid">
                    <div className="pricing-card">
                        <div className="pricing-name">Starter</div>
                        <div className="pricing-price">
                            <span className="currency"></span>Free
                        </div>
                        <div className="pricing-billed"></div>
                        <div className="pricing-savings"></div>
                        <p className="pricing-description">Perfect for trying out the basics</p>
                        <ul className="pricing-features">
                            <li>10 beginner lessons</li>
                            <li>Interactive fretboard</li>
                            <li>5 songs with tabs</li>
                            <li>Community access</li>
                        </ul>
                        <a href="#" className="pricing-btn">Get Started</a>
                    </div>
                    <div className="pricing-card featured">
                        <div className="pricing-name">Pro</div>
                        <div className="pricing-price">
                            <span className="currency">$</span>
                            <span>{currentPlan.price}</span>
                            <span className="period">{currentPlan.period}</span>
                        </div>
                        <div className="pricing-billed">{currentPlan.billed}</div>
                        <div className="pricing-savings">{currentPlan.savings}</div>
                        <p className="pricing-description">For serious learners</p>
                        <ul className="pricing-features">
                            <li>All 200+ video lessons</li>
                            <li>Full song library (500+)</li>
                            <li>AI feedback on playing</li>
                            <li>Progress tracking</li>
                            <li>Download lessons offline</li>
                        </ul>
                        <a href="#" className="pricing-btn">Start Free Trial</a>
                    </div>
                    <div className="pricing-card">
                        <div className="pricing-name">Lifetime</div>
                        <div className="pricing-price">
                            <span className="currency">$</span>440
                        </div>
                        <div className="pricing-billed">One-time payment</div>
                        <div className="pricing-savings">Best value</div>
                        <p className="pricing-description">Forever access, no recurring fees</p>
                        <ul className="pricing-features">
                            <li>Everything in Pro</li>
                            <li>1-on-1 coaching session</li>
                            <li>Exclusive masterclasses</li>
                            <li>Priority support</li>
                            <li>All future updates</li>
                        </ul>
                        <a href="#" className="pricing-btn">Get Lifetime Access</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;

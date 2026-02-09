import React from 'react';

const Testimonials = () => {
    return (
        <section class="testimonials" id="testimonials">
            <div class="section-container">
                <div class="section-header">
                    <div class="section-label">Testimonials</div>
                    <h2 class="section-title">What the artists are saying</h2>
                </div>
                <div class="testimonials-grid">
                    <div class="testimonial-card">
                        <div class="testimonial-stars">★★★★★</div>
                        <p class="testimonial-text">"I've tried several DAWs, but StringMaster's immediate workflow finally made track production click for me. Went from zero to finishing songs in 3 months!"</p>
                        <div class="testimonial-author">
                            <div class="testimonial-avatar">
                                <img src="/images/alex-student.jpg" alt="Alex Thompson" />
                            </div>
                            <div>
                                <div class="testimonial-name">Alex Thompson</div>
                                <div class="testimonial-title">Beatmaker, 4 months</div>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <div class="testimonial-stars">★★★★★</div>
                        <p class="testimonial-text">"The AI visualization feature is incredible. It's like having a personal mix engineer available 24/7. My sound design has improved dramatically."</p>
                        <div class="testimonial-author">
                            <div class="testimonial-avatar">
                                <img src="/images/maria-student.jpg" alt="Maria Garcia" />
                            </div>
                            <div>
                                <div class="testimonial-name">Maria Garcia</div>
                                <div class="testimonial-title">Artist, 1 year</div>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <div class="testimonial-stars">★★★★★</div>
                        <p class="testimonial-text">"Worth every penny. The sound library keeps me inspired, and the project tools show exactly how far I've come. Highly recommend!"</p>
                        <div class="testimonial-author">
                            <div class="testimonial-avatar">
                                <img src="/images/david-student.jpg" alt="David Kim" />
                            </div>
                            <div>
                                <div class="testimonial-name">David Kim</div>
                                <div class="testimonial-title">Composer, 2 years</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

import React from 'react';

const Instructors = () => {
    return (
        <section class="instructors" id="instructors">
            <div class="section-container">
                <div class="section-header">
                    <div class="section-label">Community</div>
                    <h2 class="section-title">Collaborate with the best artists</h2>
                    <p class="section-description">
                        Connect with top producers and sound designers from around the world.
                    </p>
                </div>
                <div class="instructors-grid">
                    <div class="instructor-card">
                        <div class="instructor-image">
                            <img src="/images/acoustic-specialist.jpg" alt="Marcus Chen" />
                        </div>
                        <div class="instructor-name">Marcus Chen</div>
                        <div class="instructor-role">Sound Designer</div>
                        <p class="instructor-bio">15 years producing, Berklee graduate</p>
                    </div>
                    <div class="instructor-card">
                        <div class="instructor-image">
                            <img src="/images/fingerstyle-expert.jpg" alt="Sarah Williams" />
                        </div>
                        <div class="instructor-name">Sarah Williams</div>
                        <div class="instructor-role">Beatmaker</div>
                        <p class="instructor-bio">YouTube producer, 2M subscribers</p>
                    </div>
                    <div class="instructor-card">
                        <div class="instructor-image">
                            <img src="/images/blues-rock-guitar.jpg" alt="James Rodriguez" />
                        </div>
                        <div class="instructor-name">James Rodriguez</div>
                        <div class="instructor-role">Session Guitarist</div>
                        <p class="instructor-bio">Studio musician, 20+ albums</p>
                    </div>
                    <div class="instructor-card">
                        <div class="instructor-image">
                            <img src="/images/music-theory-instructor.jpg" alt="Emily Park" />
                        </div>
                        <div class="instructor-name">Emily Park</div>
                        <div class="instructor-role">Composer</div>
                        <p class="instructor-bio">Film scorer, award-winning artist</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Instructors;

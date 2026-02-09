import React from 'react';

const Privacy = () => {
    return (
        <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            <div className="prose prose-invert prose-emerald max-w-none">
                <p className="text-zinc-400 mb-4">Last Updated: February 2026</p>
                <p>Your privacy is important to us. This policy explains how we handle your data.</p>
                {/* Expanded content would go here, matching the HTML file */}
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
                <p className="text-zinc-400">We collect minimal information necessary to provide our services.</p>
            </div>
        </div>
    );
};

export default Privacy;

import React from 'react';

const Terms = () => {
    return (
        <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            <div className="prose prose-invert prose-emerald max-w-none">
                <p className="text-zinc-400 mb-4">Last Updated: February 2026</p>
                <p>By using StringMaster, you agree to these terms.</p>
                {/* Expanded content would go here */}
                <h2 className="text-2xl font-bold mt-8 mb-4">1. Usage License</h2>
                <p className="text-zinc-400">Permission is granted to use our tools for personal and commercial music production.</p>
            </div>
        </div>
    );
};

export default Terms;

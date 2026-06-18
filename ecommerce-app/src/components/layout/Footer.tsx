import React from 'react';

export default function Footer() {
    return (
        <footer aria-labelledby="footer-heading" className="bg-white border-t border-gray-200">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="py-6 text-center">
                    <p className="text-base text-gray-400">
                        &copy; 2026 Bhanu Sharma. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

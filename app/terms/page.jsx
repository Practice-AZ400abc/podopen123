import React from 'react';

const Terms = () => {
    return (
        <div className="max-w-3xl mt-20 mb-20 border  mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                LookVisa – Terms of Service
            </h1>
            <p className="text-sm text-gray-500 text-center mb-8">Last Updated: December 2024</p>

            {/* Introduction */}
            <p className="text-gray-700 leading-6">
                Welcome to <strong>LookVisa.com</strong> ("we," "us," "our"). By accessing or using our website and services (collectively, the "Services"), you agree to comply with and be bound by these Terms of Service ("Terms"). Please read them carefully.
            </p>

            {/* Terms Sections */}
            <div className="mt-6 space-y-6">
                <section>
                    <h2 className="text-xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
                    <p className="text-gray-700 mt-2">
                        By accessing or using the Services, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900">2. Subscription Services</h2>
                    <p className="text-gray-700 mt-2">
                        Our Services include a subscription model that allows users to access listings and opportunities for investment visa projects.
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 mt-2">
                        <li><strong>Subscription & Renewal:</strong> Subscriptions are month-to-month and automatically renew unless canceled before the renewal date.</li>
                        <li><strong>Non-refundable Fees:</strong> All subscription fees are non-refundable, including partial months.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900">3. Use of Service</h2>
                    <p className="text-gray-700 mt-2">You agree to use our Services only for legitimate investment visa opportunities.</p>
                    <ul className="list-disc ml-6 text-gray-700 mt-2">
                        <li>No redistributing, reposting, or sharing of platform data.</li>
                        <li>No fraudulent, deceptive, or criminal activities.</li>
                        <li>No misrepresentation of identity or affiliation.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900">4. Ownership & License</h2>
                    <p className="text-gray-700 mt-2">
                        All content on LookVisa.com, including text, graphics, logos, and software, is owned by us or our licensors. You receive a limited, non-exclusive, and non-transferable license to use our Services.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900">5. Termination</h2>
                    <p className="text-gray-700 mt-2">
                        We reserve the right to suspend or terminate your access if you violate these Terms or engage in harmful activities.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900">6. Limitation of Liability</h2>
                    <p className="text-gray-700 mt-2">
                        To the fullest extent permitted by law, LookVisa.com is not liable for any indirect, incidental, special, consequential, or punitive damages.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900">7. Indemnification</h2>
                    <p className="text-gray-700 mt-2">
                        You agree to indemnify LookVisa.com from any claims, damages, or liabilities related to:
                    </p>
                    <ul className="list-disc ml-6 text-gray-700 mt-2">
                        <li>Content you post or share on our platform.</li>
                        <li>Transactions with other users.</li>
                        <li>Intellectual property infringement.</li>
                        <li>Third-party claims against LookVisa.com.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900">8. Changes to Terms</h2>
                    <p className="text-gray-700 mt-2">
                        We may update these Terms from time to time. Continued use of our Services implies acceptance of the changes.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900">9. Governing Law</h2>
                    <p className="text-gray-700 mt-2">
                        These Terms shall be governed by and construed in accordance with the laws of Florida, USA.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-900">10. Contact Information</h2>
                    <p className="text-gray-700 mt-2">
                        If you have any questions, contact us at <a href="mailto:info@lookvisa.com" className="text-blue-600 underline">Info@LookVisa.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;

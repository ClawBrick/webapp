"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[var(--clay-bg-primary)] py-20">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl font-bold mb-4 text-[var(--clay-text-primary)]">
                        Privacy Policy
                    </h1>
                    <p className="text-[var(--clay-text-muted)] mb-12">
                        Last Updated: {new Date().toLocaleDateString()}
                    </p>

                    <div className="prose prose-invert max-w-none space-y-8">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                1. Introduction
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed">
                                NetSepio ("ClawBrick," "we," "us," or "our") is committed to
                                protecting your privacy. This Privacy Policy explains how we
                                collect, use, disclose, and safeguard your information when you
                                use our Services. By using ClawBrick, you consent to the data
                                practices described in this policy. If you do not agree with
                                this policy, please do not use our Services.
                            </p>
                        </section>

                        {/* Information We Collect */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                2. Information We Collect
                            </h2>

                            <h3 className="text-xl font-bold text-[var(--clay-text-primary)] mb-3">
                                2.1 Information You Provide
                            </h3>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                We collect information that you voluntarily provide to us,
                                including:
                            </p>
                            <ul className="list-disc pl-6 text-[var(--clay-text-secondary)] space-y-2">
                                <li>
                                    Account information (email address, username, password)
                                </li>
                                <li>Profile information (name, organization, preferences)</li>
                                <li>Payment information (processed through third-party payment processors)</li>
                                <li>
                                    Communications with us (support requests, feedback, survey
                                    responses)
                                </li>
                                <li>
                                    Content and data you upload or create using our Services
                                </li>
                            </ul>

                            <h3 className="text-xl font-bold text-[var(--clay-text-primary)] mb-3 mt-6">
                                2.2 Automatically Collected Information
                            </h3>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                When you access our Services, we automatically collect certain
                                information, including:
                            </p>
                            <ul className="list-disc pl-6 text-[var(--clay-text-secondary)] space-y-2">
                                <li>
                                    Device information (IP address, browser type, operating
                                    system, device identifiers)
                                </li>
                                <li>
                                    Usage data (pages visited, features used, time spent, click
                                    patterns)
                                </li>
                                <li>
                                    Performance data (API calls, compute usage, error logs)
                                </li>
                                <li>Location data (approximate location based on IP address)</li>
                                <li>
                                    Cookies and similar tracking technologies (session cookies,
                                    authentication tokens)
                                </li>
                            </ul>

                            <h3 className="text-xl font-bold text-[var(--clay-text-primary)] mb-3 mt-6">
                                2.3 Information from Third Parties
                            </h3>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed">
                                We may receive information about you from third-party services
                                you connect to our platform, such as authentication providers
                                (Solana wallets), payment processors, and analytics services.
                            </p>
                        </section>

                        {/* How We Use Your Information */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                3. How We Use Your Information
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                We use the information we collect for the following purposes:
                            </p>
                            <ul className="list-disc pl-6 text-[var(--clay-text-secondary)] space-y-2">
                                <li>
                                    <strong>Provide Services:</strong> To operate, maintain, and
                                    deliver the features and functionality of ClawBrick
                                </li>
                                <li>
                                    <strong>Account Management:</strong> To create and manage
                                    your account, authenticate users, and process payments
                                </li>
                                <li>
                                    <strong>Communication:</strong> To send you technical
                                    notices, updates, security alerts, and support messages
                                </li>
                                <li>
                                    <strong>Improvement:</strong> To analyze usage patterns,
                                    improve our Services, and develop new features
                                </li>
                                <li>
                                    <strong>Security:</strong> To detect, prevent, and address
                                    fraud, security issues, and technical problems
                                </li>
                                <li>
                                    <strong>Compliance:</strong> To comply with legal obligations
                                    and enforce our Terms of Service
                                </li>
                                <li>
                                    <strong>Marketing:</strong> To send promotional
                                    communications (you may opt out at any time)
                                </li>
                                <li>
                                    <strong>Research:</strong> To conduct research and analysis
                                    to improve AI agent performance and infrastructure
                                </li>
                            </ul>
                        </section>

                        {/* AI Model Training */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                4. AI Model Training Prohibition
                            </h2>
                            <div className="bg-[var(--clay-accent-primary)]/10 p-6 rounded-lg border-2 border-[var(--clay-accent-primary)]/30 mb-4">
                                <p className="text-lg font-bold text-[var(--clay-accent-primary)] mb-4 uppercase">
                                    NO TRAINING ON USER CONTENT
                                </p>
                                <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                    <strong>We explicitly commit that we DO NOT use your personal information, User Content, or any data you provide to train, fine-tune, or improve any artificial intelligence or machine learning models, whether owned by us or third parties.</strong>
                                </p>
                                <p className="text-[var(--clay-text-secondary)] leading-relaxed">
                                    Your data and content are processed by AI models in real-time solely to provide our Services. This processing is limited to generating responses and delivering functionality. Your information is not retained, stored, or used for model training or improvement purposes.  We contractually require our AI service providers (including third-party LLM providers) to honor this same prohibition.
                                </p>
                            </div>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed">
                                When we reference "improving our Services" in Section 3, this refers to platform infrastructure, user experience, security enhancements, and operational improvements only—<strong>never</strong> AI model training. For complete details on how we handle User Content, please see Section 5 of our <a href="/terms" className="text-[var(--clay-accent-primary)] hover:underline">Terms of Service</a>.
                            </p>
                        </section>

                        {/* Data Sharing and Disclosure */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                5. How We Share Your Information
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                We may share your information in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 text-[var(--clay-text-secondary)] space-y-2">
                                <li>
                                    <strong>Service Providers:</strong> With third-party vendors
                                    who perform services on our behalf (cloud hosting, payment
                                    processing, analytics, customer support)
                                </li>
                                <li>
                                    <strong>Business Transfers:</strong> In connection with a
                                    merger, acquisition, reorganization, or sale of assets
                                </li>
                                <li>
                                    <strong>Legal Requirements:</strong> When required by law,
                                    subpoena, or court order, or to protect our rights and safety
                                </li>
                                <li>
                                    <strong>With Your Consent:</strong> When you explicitly
                                    authorize us to share your information
                                </li>
                                <li>
                                    <strong>Aggregated Data:</strong> We may share anonymized,
                                    aggregated data that cannot identify you personally
                                </li>
                            </ul>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mt-4">
                                We do not sell your personal information to third parties.
                            </p>
                        </section>

                        {/* Data Retention */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                6. Data Retention
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed">
                                We retain your personal information for as long as necessary to
                                fulfill the purposes outlined in this Privacy Policy, unless a
                                longer retention period is required or permitted by law. When
                                you delete your account, we will delete or anonymize your
                                personal information within 90 days, except where we are
                                required to retain it for legal, accounting, or security
                                purposes.
                            </p>
                        </section>

                        {/* Data Security */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                7. Data Security
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                We implement industry-standard security measures to protect
                                your information, including:
                            </p>
                            <ul className="list-disc pl-6 text-[var(--clay-text-secondary)] space-y-2">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Regular security audits and vulnerability assessments</li>
                                <li>Access controls and authentication mechanisms</li>
                                <li>Monitoring and logging of system activities</li>
                                <li>Employee training on data protection practices</li>
                            </ul>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mt-4">
                                However, no method of transmission over the Internet or
                                electronic storage is 100% secure. While we strive to protect
                                your information, we cannot guarantee absolute security.
                            </p>
                        </section>

                        {/* Your Rights and Choices */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                8. Your Rights and Choices
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                Depending on your jurisdiction, you may have the following
                                rights:
                            </p>
                            <ul className="list-disc pl-6 text-[var(--clay-text-secondary)] space-y-2">
                                <li>
                                    <strong>Access:</strong> Request a copy of the personal
                                    information we hold about you
                                </li>
                                <li>
                                    <strong>Correction:</strong> Request correction of inaccurate
                                    or incomplete information
                                </li>
                                <li>
                                    <strong>Deletion:</strong> Request deletion of your personal
                                    information
                                </li>
                                <li>
                                    <strong>Portability:</strong> Request transfer of your data
                                    to another service
                                </li>
                                <li>
                                    <strong>Opt-Out:</strong> Opt out of marketing communications
                                    or certain data collection practices
                                </li>
                                <li>
                                    <strong>Restrict Processing:</strong> Request limitation of
                                    how we process your data
                                </li>
                                <li>
                                    <strong>Object:</strong> Object to processing of your
                                    personal information
                                </li>
                            </ul>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mt-4">
                                To exercise these rights, please contact us at{" "}
                                <a
                                    href="mailto:support@netsepio.com"
                                    className="text-[var(--clay-accent-primary)] hover:underline"
                                >
                                    support@netsepio.com
                                </a>
                                . We will respond to your request within 30 days.
                            </p>
                        </section>

                        {/* Cookies and Tracking */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                9. Cookies and Tracking Technologies
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                We use cookies and similar tracking technologies to collect and
                                track information about your use of our Services. You can
                                control cookie settings through your browser preferences.
                                However, disabling cookies may limit your ability to use
                                certain features of our Services.
                            </p>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed">
                                We use the following types of cookies:
                            </p>
                            <ul className="list-disc pl-6 text-[var(--clay-text-secondary)] space-y-2 mt-4">
                                <li>
                                    <strong>Essential Cookies:</strong> Required for basic
                                    functionality and security
                                </li>
                                <li>
                                    <strong>Analytics Cookies:</strong> Help us understand how
                                    users interact with our Services
                                </li>
                                <li>
                                    <strong>Preference Cookies:</strong> Remember your settings
                                    and preferences
                                </li>
                            </ul>
                        </section>

                        {/* Third-Party Services */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                10. Third-Party Services
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed">
                                Our Services may contain links to third-party websites or
                                services that are not operated by us. We are not responsible
                                for the privacy practices of these third parties. We encourage
                                you to review the privacy policies of any third-party services
                                you access through our platform.
                            </p>
                        </section>

                        {/* International Data Transfers */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                11. International Data Transfers
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed">
                                Your information may be transferred to and maintained on
                                servers located outside of your country, where data protection
                                laws may differ. By using our Services, you consent to the
                                transfer of your information to the United States and other
                                countries where we operate. We take appropriate safeguards to
                                ensure your data is protected in accordance with this Privacy
                                Policy.
                            </p>
                        </section>

                        {/* Children's Privacy */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                12. Children's Privacy
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed">
                                Our Services are not intended for children under the age of 18.
                                We do not knowingly collect personal information from children.
                                If we become aware that we have collected personal information
                                from a child without parental consent, we will take steps to
                                delete that information.
                            </p>
                        </section>

                        {/* California Privacy Rights */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                13. California Privacy Rights (CCPA)
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                If you are a California resident, you have additional rights
                                under the California Consumer Privacy Act (CCPA):
                            </p>
                            <ul className="list-disc pl-6 text-[var(--clay-text-secondary)] space-y-2">
                                <li>
                                    Right to know what personal information we collect, use, and
                                    disclose
                                </li>
                                <li>Right to request deletion of personal information</li>
                                <li>
                                    Right to opt out of the sale of personal information (we do
                                    not sell personal information)
                                </li>
                                <li>Right to non-discrimination for exercising your rights</li>
                            </ul>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mt-4">
                                To exercise these rights, contact us at{" "}
                                <a
                                    href="mailto:support@netsepio.com"
                                    className="text-[var(--clay-accent-primary)] hover:underline"
                                >
                                    support@netsepio.com
                                </a>
                                .
                            </p>
                        </section>

                        {/* GDPR Rights */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                14. European Privacy Rights (GDPR)
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                If you are in the European Economic Area (EEA), you have rights
                                under the General Data Protection Regulation (GDPR), including:
                            </p>
                            <ul className="list-disc pl-6 text-[var(--clay-text-secondary)] space-y-2">
                                <li>Right to access your personal data</li>
                                <li>Right to rectification of inaccurate data</li>
                                <li>Right to erasure (right to be forgotten)</li>
                                <li>Right to restrict processing</li>
                                <li>Right to data portability</li>
                                <li>Right to object to processing</li>
                                <li>
                                    Right to withdraw consent at any time (where processing is
                                    based on consent)
                                </li>
                                <li>Right to lodge a complaint with a supervisory authority</li>
                            </ul>
                        </section>

                        {/* Binding Arbitration */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                15. BINDING ARBITRATION AND CLASS ACTION WAIVER
                            </h2>
                            <div className="bg-[var(--clay-surface)] p-8 rounded-lg border-2 border-[var(--clay-accent-primary)]">
                                <p className="text-lg font-bold text-[var(--clay-accent-primary)] mb-6 uppercase">
                                    PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL
                                    RIGHTS.
                                </p>

                                <h3 className="text-xl font-bold text-[var(--clay-text-primary)] mb-3">
                                    15.1 Agreement to Arbitrate
                                </h3>
                                <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                    Any dispute, claim, or controversy arising out of or relating
                                    to this Privacy Policy or our privacy practices
                                    (collectively, "Privacy Disputes") will be settled by binding
                                    arbitration in accordance with the arbitration provisions set
                                    forth in our Terms of Service. This includes disputes
                                    regarding the collection, use, or disclosure of your personal
                                    information.
                                </p>

                                <h3 className="text-xl font-bold text-[var(--clay-text-primary)] mb-3">
                                    15.2 CLASS ACTION WAIVER
                                </h3>
                                <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4 font-semibold">
                                    YOU AND NETSEPIO AGREE THAT EACH MAY BRING CLAIMS AGAINST THE
                                    OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A
                                    PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR
                                    REPRESENTATIVE PROCEEDING RELATED TO PRIVACY MATTERS.
                                </p>

                                <h3 className="text-xl font-bold text-[var(--clay-text-primary)] mb-3">
                                    15.3 Incorporation of Terms
                                </h3>
                                <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                    The arbitration and class action waiver provisions in our
                                    Terms of Service are incorporated into this Privacy Policy by
                                    reference. This includes the 30-day opt-out period, waiver of
                                    jury trial, and all other arbitration-related terms.
                                </p>

                                <h3 className="text-xl font-bold text-[var(--clay-text-primary)] mb-3">
                                    15.4 Exceptions
                                </h3>
                                <p className="text-[var(--clay-text-secondary)] leading-relaxed">
                                    Either party may seek injunctive or other equitable relief in
                                    a court of competent jurisdiction to prevent unauthorized
                                    access to or use of personal information, or to address data
                                    breaches that pose immediate risk of harm.
                                </p>
                            </div>
                        </section>

                        {/* Changes to Privacy Policy */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                16. Changes to This Privacy Policy
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed">
                                We may update this Privacy Policy from time to time. We will
                                notify you of any material changes by posting the new Privacy
                                Policy on our website and updating the "Last Updated" date. We
                                encourage you to review this Privacy Policy periodically. Your
                                continued use of the Services after changes are posted
                                constitutes your acceptance of the updated policy.
                            </p>
                        </section>

                        {/* Contact Information */}
                        <section>
                            <h2 className="text-3xl font-bold text-[var(--clay-text-primary)] mb-4">
                                17. Contact Us
                            </h2>
                            <p className="text-[var(--clay-text-secondary)] leading-relaxed mb-4">
                                If you have questions or concerns about this Privacy Policy or
                                our privacy practices, please contact us at:
                            </p>
                            <div className="mt-4 text-[var(--clay-text-secondary)]">
                                <p>NetSepio LLC</p>
                                <p>
                                    Email:{" "}
                                    <a
                                        href="mailto:support@netsepio.com"
                                        className="text-[var(--clay-accent-primary)] hover:underline"
                                    >
                                        support@netsepio.com
                                    </a>
                                </p>
                                <p>
                                    Website:{" "}
                                    <a
                                        href="https://netsepio.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--clay-accent-primary)] hover:underline"
                                    >
                                        https://netsepio.com
                                    </a>
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

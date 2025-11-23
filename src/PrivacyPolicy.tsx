import React from 'react';

const PrivacyPolicy = () => {
  const websiteUrl = window.location.origin;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-primary-500/30 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-slate-400 mb-4">Last updated: November 23, 2025</p>
        <div className="prose prose-invert">
          <p>Your privacy is important to us. It is AlgoMap AI's policy to respect your privacy regarding any information we may collect from you across our website, <a href={websiteUrl} className="text-primary-400">{websiteUrl}</a>.</p>
          <p>We do not collect any personally identifiable information from our users. We only ask for personal information when we truly need it to provide a service to you, and we collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Services</h2>
          <p>Our website uses third-party AI providers, including Gemini and Ollama, to generate content. These third parties may have access to certain data, such as your IP address, to provide their services. We do not control the data collection or privacy practices of these third-party services. We strongly advise you to review the privacy policies of these services to understand how they collect, use, and share your information.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Security</h2>
          <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Links to Other Sites</h2>
          <p>Our website may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, you can contact us at <a href="mailto:maddalajashwanth69@gmail.com" className="text-primary-400">maddalajashwanth69@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

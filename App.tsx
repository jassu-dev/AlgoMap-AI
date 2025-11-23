import React, { useEffect, useRef, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivacyPolicy from './src/PrivacyPolicy';
import TermsOfService from './src/TermsOfService';
import mermaid from 'mermaid';

// --- Types ---
// Explicitly declare mermaid to avoid TS errors in this environment if types aren't loaded
declare global {
  interface Window {
    mermaid: any;
  }
}

// --- Icons ---
const Icons = {
  Download: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
  ),
  Cpu: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg>
  ),
  GitBranch: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>
  ),
  Zap: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Check: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"/></svg>
  ),
  ArrowRight: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  Code: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  ),
  User: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )
};

// --- Components ---

const Navbar = () => (
  <nav className="fixed w-full z-50 glass-card border-b-0 border-b-slate-800">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
          <img src="/logo.png" alt="AlgoMap AI Logo" className="w-10 h-10" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">AlgoMap <span className="text-primary-400">AI</span></span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="/Algomap Setup.exe" download className="bg-white text-slate-950 px-5 py-2.5 rounded-full font-semibold hover:bg-slate-200 transition-colors flex items-center gap-2">
          <Icons.Download className="w-4 h-4" />
          Download
        </a>
      </div>
    </div>
  </nav>
);

const MermaidChart = ({ chartCode }: { chartCode: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderChart = async () => {
      try {
        mermaid.initialize({ 
            startOnLoad: false, 
            theme: 'base',
            fontFamily: 'Inter, sans-serif',
            themeVariables: {
                background: 'transparent',
                primaryColor: '#1e293b',
                primaryTextColor: '#f8fafc',
                primaryBorderColor: '#6366f1',
                lineColor: '#94a3b8',
                textColor: '#f8fafc',
                fontSize: '16px'
            },
            flowchart: {
                curve: 'basis'
            }
        });
        
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
            const { svg } = await mermaid.render(id, chartCode);
            console.log("Mermaid SVG output:", svg); // Log SVG output for inspection
            
            if (containerRef.current) {
                containerRef.current.innerHTML = svg;
                // Post-process SVG to fit container nicely
                const svgElement = containerRef.current.querySelector('svg');
                if (svgElement) {
                    svgElement.style.maxWidth = '100%';
                    svgElement.style.maxHeight = '100%';
                    svgElement.style.width = 'auto';
                    svgElement.style.height = 'auto';
                    
                    svgElement.removeAttribute('height');
                    svgElement.removeAttribute('width');

                    const textElements = svgElement.querySelectorAll('text');
                    textElements.forEach(text => {
                        text.style.fill = '#FFFFFF';
                    });
                }
            }
        }
      } catch (error) {
        console.error("Mermaid rendering failed:", error);
        if (containerRef.current) {
            containerRef.current.innerHTML = `<div class="text-red-400 text-xs p-4">Error loading chart</div>`;
        }
      }
    };

    renderChart();
  }, [chartCode]);

  return <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden p-4" />;
};

const App = () => {
  const binarySearchChart = `
    flowchart TD
      Start("Start") --> CalcMid("Mid")
      CalcMid --> Check{"Is Target?"}
      Check -- Yes --> Found("Return Mid")
      Check -- No --> Less{"Target Less?"}
      Less -- Yes --> AdjustRight("R = Mid - 1")
      Less -- No --> AdjustLeft("L = Mid + 1")
      AdjustRight --> CalcMid
      AdjustLeft --> CalcMid
  `;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-primary-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sm text-primary-300 mb-8 animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            v1.0 Now Available for Windows & Mac
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 pb-2">
            Master DSA with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 text-glow">Visual Clarity</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            AlgoMap AI generates optimal solutions, deep complexity analysis, and interactive flowcharts for any coding problem.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/Algomap Setup.exe" download className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all transform hover:scale-105 shadow-xl shadow-white/10 flex items-center justify-center gap-2">
              <Icons.Download className="w-5 h-5" />
              Download Free
            </a>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 text-white border border-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              <Icons.Zap className="w-5 h-5 text-yellow-400" />
              See Features
            </button>
          </div>
          <p className="mt-8 text-sm text-slate-500">Built by Jashwanth Maddala</p>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">See Logic, Not Just Code</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Don't just memorize solutions. Understand the underlying flow with our auto-generated Mermaid diagrams.
              Here is how AlgoMap visualizes a Binary Search.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Code Block */}
            <div className="glass-panel rounded-xl overflow-hidden border border-slate-700 shadow-2xl h-[500px] flex flex-col">
              <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-2 text-xs font-mono text-slate-400">binary_search.py</span>
              </div>
              <div className="p-6 overflow-auto font-mono text-sm leading-relaxed text-slate-300">
                <p><span className="text-purple-400">def</span> <span className="text-blue-400">binary_search</span>(arr, target):</p>
                <p className="pl-4 text-slate-500"># Start pointers at ends</p>
                <p className="pl-4">left, right = <span className="text-orange-400">0</span>, <span className="text-purple-400">len</span>(arr) - <span className="text-orange-400">1</span></p>
                <br/>
                <p className="pl-4"><span className="text-purple-400">while</span> left &lt;= right:</p>
                <p className="pl-8">mid = (left + right) // <span className="text-orange-400">2</span></p>
                <br/>
                <p className="pl-8"><span className="text-purple-400">if</span> arr[mid] == target:</p>
                <p className="pl-12"><span className="text-purple-400">return</span> mid</p>
                <br/>
                <p className="pl-8"><span className="text-purple-400">elif</span> arr[mid] &lt; target:</p>
                <p className="pl-12">left = mid + <span className="text-orange-400">1</span></p>
                <br/>
                <p className="pl-8"><span className="text-purple-400">else</span>:</p>
                <p className="pl-12">right = mid - <span className="text-orange-400">1</span></p>
                <br/>
                <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-orange-400">-1</span></p>
              </div>
            </div>

            {/* Mermaid Flowchart */}
            <div className="h-[500px] glass-panel rounded-xl border border-slate-700 shadow-2xl flex flex-col items-center justify-center bg-slate-900/50 relative">
              <div className="absolute top-4 left-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Generated by Mermaid.js</div>
              <MermaidChart chartCode={binarySearchChart} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
             <span className="text-primary-400 font-semibold tracking-wider text-sm uppercase">Power Features</span>
             <h2 className="text-4xl font-bold mt-2">Everything you need to master DSA</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Icons.Code className="w-8 h-8 text-secondary-400" />}
              title="Brute Force & Optimal"
              desc="Get both approaches instantly. Understand the trade-offs between naive solutions and optimized algorithms."
            />
             <FeatureCard 
              icon={<Icons.GitBranch className="w-8 h-8 text-primary-400" />}
              title="Interactive Flowcharts"
              desc="Visual learners rejoice. Our AI maps out the logic step-by-step using standard flowchart symbols."
            />
             <FeatureCard 
              icon={<Icons.Cpu className="w-8 h-8 text-pink-400" />}
              title="Complexity Analysis"
              desc="Deep dive into Time and Space complexity. We explain 'Why' it is O(n log n) so you can explain it in interviews."
            />
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="py-20 px-6">
         <div className="max-w-5xl mx-auto glass-card rounded-3xl p-8 md:p-12 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-6">Powered by Gemini 2.5 Flash</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-green-500/20 p-1 rounded-full"><Icons.Check className="w-4 h-4 text-green-400" /></div>
                      <span className="text-slate-300">Analysis speed under 200ms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-green-500/20 p-1 rounded-full"><Icons.Check className="w-4 h-4 text-green-400" /></div>
                      <span className="text-slate-300">Supports Python, Java, C++, JavaScript</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 bg-green-500/20 p-1 rounded-full"><Icons.Check className="w-4 h-4 text-green-400" /></div>
                      <span className="text-slate-300">1M+ Token Context Window for complex problem statements</span>
                    </li>
                  </ul>
               </div>
               <div className="flex-1 relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center">
                    <div className="text-center">
                       <span className="text-6xl font-black text-slate-700 block mb-2">AI</span>
                       <span className="text-sm text-slate-500">Engine Core</span>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-24 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to ace your next interview?</h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg">
          Join thousands of developers using AlgoMap AI to visualize success.
        </p>
        <div className="max-w-sm mx-auto">
          <a href="/Algomap Setup.exe" download className="w-full px-10 py-5 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold text-xl transition-all transform hover:-translate-y-1 shadow-2xl shadow-primary-600/20 text-glow animate-pulse-slow flex items-center gap-3 justify-center">
            <Icons.Download className="w-6 h-6" />
            Download AlgoMap AI v1.0
          </a>
        </div>
        <p className="mt-6 text-sm text-slate-500">Requires Windows 10/11 or macOS 12+</p>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-6 text-slate-500 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <a href="https://github.com" className="hover:text-white transition-colors">GitHub</a>
            </div>
            
            <div className="flex items-center gap-2 px-6 py-2 bg-slate-900/80 rounded-full border border-primary-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
               <span className="text-slate-300 text-sm font-medium">Made by</span>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 font-bold tracking-wide">
                 Jashwanth Maddala
               </span>
            </div>
          </div>
          <p className="text-center text-slate-600 text-xs mt-8">© 2025 AlgoMap AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const MainApp = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
    </Routes>
  </Router>
);

// Helper Component for Feature Cards
const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="glass-card p-8 rounded-2xl border border-slate-800 hover:border-slate-600 transition-colors group">
    <div className="mb-6 p-3 bg-slate-900 w-fit rounded-lg group-hover:scale-110 transition-transform duration-300 border border-slate-800">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-100">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

export default MainApp;
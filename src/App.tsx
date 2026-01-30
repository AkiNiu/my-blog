import Navbar from './components/Navbar';
import SectionTitle from './components/SectionTitle';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Awards from './components/Awards';
import HRChatWidget from './components/HRChatWidget';
import About from './components/About';

function App() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/10 selection:text-primary">
            <Navbar />
            <main className="container max-w-4xl mx-auto px-6 pb-24">
                <Hero />
                
                <div className="space-y-32">
                    <section id="about" className="scroll-mt-24">
                        <SectionTitle id="about" title="个人简介" subtitle="About Me" />
                        <About />
                    </section>
                    
                    <section id="projects" className="scroll-mt-24">
                        <SectionTitle id="projects" title="代表项目" subtitle="Projects" />
                        <Projects />
                    </section>
                    
                    <section id="experience" className="scroll-mt-24">
                        <SectionTitle id="experience" title="工作经历" subtitle="Experience" />
                        <Experience />
                    </section>
                    
                    <section id="skills" className="scroll-mt-24">
                        <SectionTitle id="skills" title="技能与工具" subtitle="Skills" />
                        <Skills />
                    </section>
                    
                    <section id="achievements" className="scroll-mt-24">
                        <SectionTitle id="achievements" title="量化成果" subtitle="Achievements" />
                        <Achievements />
                    </section>
                    
                    <section id="education" className="scroll-mt-24">
                        <SectionTitle id="education" title="教育与科研" subtitle="Education" />
                        <Education />
                    </section>
                    
                    <section id="awards" className="scroll-mt-24">
                        <SectionTitle id="awards" title="获奖情况" subtitle="Awards" />
                        <Awards />
                    </section>
                    
                    <section id="contact" className="scroll-mt-24">
                        <SectionTitle id="contact" title="联系与简历" subtitle="Contact" />
                        <Contact />
                    </section>
                </div>

                <footer className="mt-32 pt-10 border-t border-border/40 text-center text-muted-foreground text-sm">
                    <p>© 2026 刘生杰 · Designed with simplicity</p>
                </footer>
            </main>
            <HRChatWidget />
        </div>
    );
}

export default App;

import SkillsSection from '../components/SkillsSection';

const SkillsPage = () => (
  <div className="pt-16">
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16" data-reveal>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The toolkit behind the research and the builds - AI and machine learning, research tools, and
            programming.
          </p>
          <p className="text-sm text-muted-foreground/80 mt-4">
            Levels are self-assessed from hands-on project and research work, not certificates. (Chai may have
            influenced the scores.)
          </p>
        </div>
        <SkillsSection />
      </div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 hidden md:block pointer-events-none" data-parallax data-speed="8" />
    </section>
  </div>
);

export default SkillsPage;

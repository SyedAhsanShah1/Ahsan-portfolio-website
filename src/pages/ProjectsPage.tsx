import { Link } from 'react-router-dom';
import { ArrowRight } from 'phosphor-react';
import Projects from '../components/Projects';

const ProjectsPage = () => (
  <div className="pt-16">
    <div className="container mx-auto max-w-7xl px-6 pt-10">
      <p className="text-center text-muted-foreground">
        Looking for the research behind some of these?{' '}
        <Link to="/research" className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
          See the Research page <ArrowRight size={16} />
        </Link>
      </p>
    </div>
    <Projects />
  </div>
);

export default ProjectsPage;

import { Coffee } from 'lucide-react';
import { Github } from '@/components/ui/BrandIcons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <Github size={18} style={{ color: 'var(--text-tertiary)' }} />
            <span>Built with Next.js, Framer Motion and lots of <Coffee size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px', color: 'var(--accent)' }} /></span>
          </div>
          <div className="footer-right">
            © {new Date().getFullYear()} Radhika. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Desenvolvido por{' '}
            <a
              href="https://github.com/joaomaxdev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline inline-flex items-center space-x-1"
            >
              <span>@joaomaxdev</span>
              <Github className="h-4 w-4" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
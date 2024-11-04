import { BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Navbar() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Monitown</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/report">
              <Button variant="outline">Reportar Problema</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
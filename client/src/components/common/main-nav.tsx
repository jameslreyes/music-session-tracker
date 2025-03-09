import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  PlayCircle,
  History,
  Settings as SettingsIcon,
  Users,
} from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Session',
    href: '/session',
    icon: PlayCircle,
  },
  {
    title: 'History',
    href: '/history',
    icon: History,
  },
  {
    title: 'Artists',
    href: '/artists',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: SettingsIcon,
  },
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto max-w-7xl">
        <div className="mr-8 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold">Music Session Tracker</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors',
                location.pathname === item.href && 'text-primary'
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
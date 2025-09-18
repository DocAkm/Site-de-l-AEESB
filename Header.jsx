import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, LogOut, LayoutDashboard, Menu, X, Home, Info, Users, Newspaper, Calendar, Edit2, Phone, ShieldCheck, KeyRound } from 'lucide-react';

const Header = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const aeesbLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/91ea98d32157f4895708d6cb7333f80b.jpg";

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMobileMenuOpen(false); 
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
      isActive ? 'bg-aeesb-gold text-aeesb-green-dark shadow-md' : 'text-aeesb-green-dark hover:bg-aeesb-green-light hover:text-aeesb-green-dark'
    }`;
  
  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? 'bg-aeesb-gold text-aeesb-green-dark' : 'text-aeesb-green-dark hover:bg-aeesb-green-light hover:text-aeesb-green-dark'
    }`;

  const menuItems = [
    { name: 'Accueil', path: '/', icon: <Home size={18} className="mr-2"/> },
    { name: 'À Propos', path: '/a-propos', icon: <Info size={18} className="mr-2"/> },
    { name: 'Annonces', path: '/annonces', icon: <Newspaper size={18} className="mr-2"/> },
    { name: 'Activités Réalisées', path: '/activites-realisees', icon: <ShieldCheck size={18} className="mr-2"/> },
    { name: 'Événements', path: '/evenements', icon: <Calendar size={18} className="mr-2"/> },
    { name: 'Blog', path: '/blog', icon: <Edit2 size={18} className="mr-2"/> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} className="mr-2"/> },
  ];
  
  const adminAccessMenuItem = { name: 'Accès Admin', path: '/acces-admin', icon: <KeyRound size={18} className="mr-2"/> };


  if (authLoading) {
    return (
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img  src={aeesbLogoUrl} alt="AEESB Logo" className="h-12 w-auto rounded-full object-cover" />
            <span className="ml-3 text-xl font-bold text-aeesb-green-dark font-heading">AEESB</span>
          </Link>
          <div className="animate-pulse h-8 w-36 bg-gray-300 rounded-md"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img  src={aeesbLogoUrl} alt="AEESB Logo" className="h-12 w-auto rounded-full object-cover" />
            <span className="ml-3 text-xl font-bold text-aeesb-green-dark font-heading">AEESB</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {menuItems.map(item => (
              <NavLink key={item.name} to={item.path} className={navLinkClass}>
                {item.name}
              </NavLink>
            ))}
            {user && user.role === 'admin' && (
              <NavLink to="/admin" className={navLinkClass}>Tableau de Bord</NavLink>
            )}
            {user && user.role === 'member' && (
              <NavLink to="/forum" className={navLinkClass}>Forum</NavLink>
            )}
            {/* Show Admin Access link if user is not logged in, or if logged in user is not admin */}
            {(!user || user.role !== 'admin') && (
                 <NavLink key={adminAccessMenuItem.name} to={adminAccessMenuItem.path} className={navLinkClass}>
                    {adminAccessMenuItem.name}
                 </NavLink>
            )}
          </nav>

          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-aeesb-gold">
                      <AvatarImage src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.first_name || ''}+${user.last_name || ''}&background=aeesb-green-dark&color=fff`} alt={user.first_name || user.email} />
                      <AvatarFallback className="bg-aeesb-green-light text-aeesb-gold">
                        {user.first_name?.[0]?.toUpperCase() || ''}{user.last_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.first_name} {user.last_name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { navigate('/espace-membre/profil'); setIsMobileMenuOpen(false); }}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Mon Profil</span>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem onClick={() => { navigate('/admin'); setIsMobileMenuOpen(false); }}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Tableau de Bord Admin</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button asChild variant="ghost" className="text-aeesb-green-dark hover:bg-aeesb-green-light hover:text-aeesb-green-dark">
                  <Link to="/connexion">Connexion</Link>
                </Button>
                <Button asChild className="bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark shadow-md">
                  <Link to="/inscription">Inscription</Link>
                </Button>
              </div>
            )}
            <div className="md:hidden ml-2">
              <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-aeesb-green-dark">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl pb-4 absolute top-20 left-0 right-0 z-40">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map(item => (
              <NavLink key={item.name} to={item.path} className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                 <span className="flex items-center">{item.icon} {item.name}</span>
              </NavLink>
            ))}
            {user && user.role === 'admin' && (
              <NavLink to="/admin" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="flex items-center"><LayoutDashboard size={18} className="mr-2"/> Tableau de Bord</span>
              </NavLink>
            )}
             {user && user.role === 'member' && (
              <NavLink to="/forum" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="flex items-center"><Users size={18} className="mr-2"/> Forum</span>
              </NavLink>
            )}
             {(!user || user.role !== 'admin') && (
                 <NavLink key={adminAccessMenuItem.name} to={adminAccessMenuItem.path} className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="flex items-center">{adminAccessMenuItem.icon} {adminAccessMenuItem.name}</span>
                 </NavLink>
            )}
          </nav>
          {!user && (
            <div className="px-4 py-2 space-y-2">
              <Button asChild className="w-full bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark shadow-md" onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/inscription">Inscription</Link>
              </Button>
              <Button asChild variant="outline" className="w-full text-aeesb-green-dark border-aeesb-green-dark hover:bg-aeesb-green-light" onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/connexion">Connexion</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
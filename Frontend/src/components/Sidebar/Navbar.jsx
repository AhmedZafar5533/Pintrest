import { useState, useEffect, useRef } from 'react';
import { Bell, MessageCircle, Search, Home, Plus, Settings, Heart, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../../store/app-store';
import { useAuthStore } from '../../../store/auth-store';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const profileRef = useRef(null);

  const { setIsModalOpen } = useAppStore()
  const { sendLogoutRequest } = useAuthStore()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };

    }

  }, [lastScrollY]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  const handleLogout = () => {
    sendLogoutRequest();
  };

  const ProfileDropdown = () => (
    <div className="absolute right-0 mt-4 w-48 bg-black border border-gray-800 rounded-lg shadow-lg py-1 z-50">

      <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 flex items-center space-x-2 cursor-pointer">
        <User className="w-5 h-5" />
        <Link to="/profile">View Profile</Link>
      </button>

      {/* Desktop Options */}
      <div className="hidden md:block">
        <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 flex items-center space-x-2 cursor-pointer">
          <Heart className="w-5 h-5" />
          <span>Saved</span>
        </button>
        <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 flex items-center space-x-2 cursor-pointer">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>

      {/* Mobile Options */}
      <div className="md:hidden">
        <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 flex items-center space-x-2 cursor-pointer">
          <MessageCircle className="w-5 h-5" />
          <span>Messages</span>
        </button>
        <button className="w-full px-4 py-2 text-left text-white hover:bg-gray-800 flex items-center space-x-2 cursor-pointer">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </button>
      </div>

      <div className="border-t border-gray-800 my-1"></div>
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-800 flex items-center space-x-2 cursor-pointer"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>

    </div>
  );

  return (
    <>
      <div className="sticky  top-0 z-50  ">
        <nav className={` w-full p-3 bg-black/100 text-white transition-transform duration-300 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'} `}>
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={"/"}>
                <svg className="w-10 h-10 text-red-600 hover:scale-110 transition-transform cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.58.03-2.27.14-.62.92-3.97.92-3.97s-.24-.47-.24-1.17c0-1.1.64-1.92 1.44-1.92.68 0 1 .5 1 1.12 0 .68-.43 1.7-.66 2.64-.19.8.4 1.44 1.18 1.44 1.42 0 2.51-1.5 2.51-3.67 0-1.92-1.37-3.25-3.33-3.25-2.27 0-3.6 1.7-3.6 3.46 0 .68.26 1.41.59 1.81.06.07.07.14.05.22l-.22.9c-.03.13-.12.16-.27.1-1-.47-1.63-1.95-1.63-3.14 0-2.53 1.84-4.85 5.29-4.85 2.77 0 4.93 1.98 4.93 4.62 0 2.76-1.74 4.98-4.16 4.98-.81 0-1.57-.42-1.84-.92l-.5 1.9c-.18.7-.67 1.57-.99 2.1A12 12 0 1 0 12 0z" />
                </svg>
              </Link>
              <button
                className="md:hidden p-2 hover:bg-gray-800 rounded-full cursor-pointer"
                onClick={setIsModalOpen}
              >
                <Plus className="h-7 w-7" />
              </button>
              <div className="hidden md:flex items-center space-x-2">
                <button className="px-4 py-2 rounded-full bg-black hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer">
                  <Home className="w-6 h-6" />
                  <Link to={"/"}>Home</Link>
                </button>
                <button className="px-4 py-2 rounded-full bg-black hover:bg-gray-800 flex items-center space-x-2 font-medium cursor-pointer" onClick={setIsModalOpen}>
                  <Plus className="w-6 h-6" />
                  <span>Create</span>
                </button>
              </div>
            </div>

            <div className="flex-1 max-w-3xl px-4 hidden md:block cursor-pointer">
              <div className="relative group">
                <Search className="absolute left-3 top-2.5 h-6 w-6 text-gray-400 group-focus-within:text-white" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-gray-700 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className='hidden md:flex items-center space-x-2'>
                <button className="p-2 hover:bg-gray-800 rounded-full relative group cursor-pointer">
                  <Bell className="h-7 w-7" />
                  <span style={{ 'backgroundColor': 'red' }} className="absolute top-0 right-0 h-5 w-5 rounded-full text-xs flex items-center justify-center">3</span>
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-full cursor-pointer">
                  <MessageCircle className="h-7 w-7" />
                </button>
              </div>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="p-2 hover:bg-gray-800 rounded-full flex items-center space-x-2 cursor-pointer"
                >
                  <img
                    src="https://i.pinimg.com/280x280_RS/c9/b9/f6/c9b9f64900ce82ac597e1093e18e22c9.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                {profileOpen && <ProfileDropdown />}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 hover:bg-gray-800 rounded-full cursor-pointer"
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <div className={`fixed inset-0 z-50 transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="absolute inset-0 bg-black/100">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.63-.13-1.58.03-2.27.14-.62.92-3.97.92-3.97s-.24-.47-.24-1.17c0-1.1.64-1.92 1.44-1.92.68 0 1 .5 1 1.12 0 .68-.43 1.7-.66 2.64-.19.8.4 1.44 1.18 1.44 1.42 0 2.51-1.5 2.51-3.67 0-1.92-1.37-3.25-3.33-3.25-2.27 0-3.6 1.7-3.6 3.46 0 .68.26 1.41.59 1.81.06.07.07.14.05.22l-.22.9c-.03.13-.12.16-.27.1-1-.47-1.63-1.95-1.63-3.14 0-2.53 1.84-4.85 5.29-4.85 2.77 0 4.93 1.98 4.93 4.62 0 2.76-1.74 4.98-4.16 4.98-.81 0-1.57-.42-1.84-.92l-.5 1.9c-.18.7-.67 1.57-.99 2.1A12 12 0 1 0 12 0z" />
              </svg>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-full"
              >
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 bottom-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-12 pl-10 pr-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>

            <div className="flex-1 px-2 py-4 space-y-1">
              <button className="w-full p-4 text-left text-white hover:bg-gray-800 rounded-lg flex items-center space-x-3">
                <Home className="w-6 h-6" />
                <span className="text-lg">Home</span>
              </button>
              <button className="w-full p-4 text-left text-white hover:bg-gray-800 rounded-lg flex items-center space-x-3">
                <Heart className="w-6 h-6" />
                <span className="text-lg">Saved</span>
              </button>
              <button className="w-full p-4 text-left text-white hover:bg-gray-800 rounded-lg flex items-center space-x-3">
                <Settings className="w-6 h-6" />
                <span className="text-lg">Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full p-4 text-left text-red-500 hover:bg-gray-800 rounded-lg flex items-center space-x-3"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-lg">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-1"></div>
    </>
  );
};

export default Navbar;
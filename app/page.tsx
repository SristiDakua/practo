"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, MessageCircle, ShoppingCart, FileText, Calendar, BookOpen, Building2, ChevronDown, Stethoscope, Heart, Activity, Video, Users, HelpCircle, Menu, X, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HomePage() {
  const [location, setLocation] = useState('Bangalore');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{name: string; email: string} | null>(null);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    name: ''
  });
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/doctors?specialization=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`);
    }
  };

  const handleSpecialtyClick = (specialty: string) => {
    router.push(`/doctors?specialization=${encodeURIComponent(specialty)}&location=${encodeURIComponent(location)}`);
  };

  // Authentication handlers
  const handleLogin = (e: React.FormEvent, isSignup: boolean = false) => {
    e.preventDefault();
    
    // Basic validation
    if (!loginForm.email || !loginForm.password) {
      alert('Please fill in all fields');
      return;
    }
    
    if (isSignup && !loginForm.name) {
      alert('Please enter your name');
      return;
    }
    
    // Simulate authentication (in real app, this would be an API call)
    const userData = {
      name: isSignup ? loginForm.name : loginForm.email.split('@')[0],
      email: loginForm.email
    };
    
    setUser(userData);
    setIsLoggedIn(true);
    setLoginDialogOpen(false);
    setLoginForm({ email: '', password: '', name: '' });
    
    // Show success message
    alert(`${isSignup ? 'Account created' : 'Login'} successful! Welcome ${userData.name}`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    alert('Logged out successfully');
  };

  const openLoginDialog = () => {
    setLoginDialogOpen(true);
    setMobileMenuOpen(false);
  };

  const popularSearches = [
    'Dermatologist',
    'Pediatrician', 
    'Gynecologist',
    'Cardiologist',
    'Orthopedic',
    'Neurologist'
  ];

  const bottomMenuItems = [
    { icon: Stethoscope, label: 'Consult with a doctor', href: '/consult', color: 'bg-blue-500' },
    { icon: Heart, label: 'Order Medicines', href: '/medicines', color: 'bg-green-500' },
    { icon: Activity, label: 'Book Lab Tests', href: '/lab-tests', color: 'bg-purple-500' },
    { icon: FileText, label: 'View Medical Records', href: '/medical-records', color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* 🔹 1. Left Section: Brand Identity + Main Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex-shrink-0 pl-6">
                <a href="/" className="text-2xl font-bold flex items-center">
                  <div className="w-2 h-2 bg-sky-400 rounded-full mr-2"></div>
                  <span style={{color: '#1e3a8a'}}>practo</span>
                  <div className="w-2 h-2 bg-sky-400 rounded-full ml-2"></div>
                </a>
              </div>

              {/* Main Navigation Items */}
              <div className="hidden lg:flex items-center space-x-6">
                
                {/* Find Doctors */}
                <div className="relative group">
                  <a 
                    href="/doctors" 
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors relative"
                  >
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Find Doctors
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>

                {/* Video Consult */}
                <div className="relative group">
                  <a 
                    href="/video-consult" 
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors relative"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Video Consult
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>

                {/* Surgeries with NEW badge */}
                <div className="relative group">
                  <a 
                    href="/surgeries" 
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors relative"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Surgeries
                    <Badge className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">NEW</Badge>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>

              </div>
            </div>

            {/* 🔹 2. Right Section: Dropdown Menus + Auth */}
            <div className="flex items-center space-x-6">
              
              {/* Dropdown Navigation Items */}
              <div className="hidden lg:flex items-center space-x-6 ml-16">

                {/* For Corporates - Dropdown with NEW badge */}
                <div className="relative group">
                  <button 
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors relative"
                    onMouseEnter={() => setActiveDropdown('corporates')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    For Corporates
                    <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                    <Badge className="ml-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">NEW</Badge>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  
                  {/* Corporates Dropdown */}
                  {activeDropdown === 'corporates' && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                      onMouseEnter={() => setActiveDropdown('corporates')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <a href="/corporate-wellness" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Corporate Wellness Programs
                      </a>
                      <a href="/employee-health" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Employee Health Checkups
                      </a>
                      <a href="/corporate-insurance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Corporate Insurance Plans
                      </a>
                      <a href="/workplace-safety" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Workplace Safety Solutions
                      </a>
                    </div>
                  )}
                </div>

                {/* For Providers - Dropdown */}
                <div className="relative group">
                  <button 
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors relative"
                    onMouseEnter={() => setActiveDropdown('providers')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    For Providers
                    <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  
                  {/* Providers Dropdown */}
                  {activeDropdown === 'providers' && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                      onMouseEnter={() => setActiveDropdown('providers')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <a href="/join-as-doctor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Join as Doctor
                      </a>
                      <a href="/hospital-listing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        List Your Hospital
                      </a>
                      <a href="/clinic-software" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Clinic Management Software
                      </a>
                      <a href="/provider-resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Provider Resources
                      </a>
                    </div>
                  )}
                </div>

                {/* Security & Help - Dropdown */}
                <div className="relative group">
                  <button 
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors relative"
                    onMouseEnter={() => setActiveDropdown('help')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Security & Help
                    <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  
                  {/* Help Dropdown */}
                  {activeDropdown === 'help' && (
                    <div 
                      className="absolute top-full right-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                      onMouseEnter={() => setActiveDropdown('help')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <a href="/help-center" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Help Center & FAQs
                      </a>
                      <a href="/data-security" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Data Security & Privacy
                      </a>
                      <a href="/account-settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Account Security
                      </a>
                      <a href="/contact-support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                        Contact Support
                      </a>
                    </div>
                  )}
                </div>

              </div>

              {/* 🔹 3. User Auth */}
              <div className="flex items-center space-x-4">
                {/* Desktop Auth */}
                <div className="hidden lg:block ml-2">
                  {isLoggedIn ? (
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-700">Hi, {user?.name}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={handleLogout}
                        className="border-2 border-gray-300 text-gray-700 hover:border-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-medium px-6 py-2 rounded-full"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={openLoginDialog}
                      className="border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg transition-all duration-200 font-medium px-8 py-2 rounded-full"
                    >
                      Login / Signup
                    </Button>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2"
                  >
                    {mobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📱 Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              
              {/* Mobile Nav Links */}
              <a href="/doctors" className="flex items-center px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
                <Stethoscope className="h-5 w-5 mr-3" />
                Find Doctors
              </a>
              
              <a href="/video-consult" className="flex items-center px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
                <Video className="h-5 w-5 mr-3" />
                Video Consult
              </a>
              
              <a href="/surgeries" className="flex items-center px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
                <Activity className="h-5 w-5 mr-3" />
                Surgeries
              </a>

              {/* Mobile Dropdowns */}
              <div className="border-t border-gray-100 pt-2 mt-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">Services</div>
                
                <a href="/corporate-wellness" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Building2 className="h-4 w-4 mr-3" />
                  Corporate Wellness
                  <Badge className="ml-auto bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">NEW</Badge>
                </a>
                
                <a href="/join-as-doctor" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Users className="h-4 w-4 mr-3" />
                  For Healthcare Providers
                </a>
                
                <a href="/help-center" className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <HelpCircle className="h-4 w-4 mr-3" />
                  Help & Support
                </a>
              </div>

              {/* Mobile Auth */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-gray-700">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">Hi, {user?.name}</span>
                    </div>
                    <Button 
                      onClick={handleLogout}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={openLoginDialog}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                  >
                    Login / Signup
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Healthcare Background Illustrations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left side medical illustrations */}
        <div className="absolute left-4 top-1/4 w-40 h-40 opacity-20">
          <div className="relative">
            <Stethoscope className="absolute top-0 left-0 w-12 h-12 text-blue-300 transform rotate-12" />
            <Heart className="absolute top-8 left-12 w-8 h-8 text-red-300 animate-pulse" />
            <Activity className="absolute top-16 left-4 w-10 h-10 text-green-300" />
            <div className="absolute top-4 left-20 w-6 h-6 bg-yellow-400/30 rounded-full"></div>
            <div className="absolute top-20 left-24 w-4 h-4 bg-purple-400/40 rounded-full"></div>
          </div>
        </div>
        
        {/* Right side cityscape elements */}
        <div className="absolute right-4 top-1/3 w-48 h-32 opacity-15">
          <div className="relative">
            {/* Building silhouettes */}
            <div className="absolute bottom-0 left-0 w-8 h-16 bg-blue-300/40 rounded-t-sm"></div>
            <div className="absolute bottom-0 left-10 w-6 h-20 bg-indigo-300/40 rounded-t-sm"></div>
            <div className="absolute bottom-0 left-18 w-10 h-12 bg-purple-300/40 rounded-t-sm"></div>
            <div className="absolute bottom-0 left-30 w-7 h-18 bg-blue-400/40 rounded-t-sm"></div>
            <div className="absolute bottom-0 left-38 w-9 h-14 bg-indigo-400/40 rounded-t-sm"></div>
            
            {/* Medical cross symbols */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-red-400/50 rounded-full"></div>
            <div className="absolute top-1 left-2 w-1 h-3 bg-white/60"></div>
            <div className="absolute top-2 left-1 w-3 h-1 bg-white/60"></div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-teal-400/15 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-pink-400/10 rounded-full"></div>
        
        {/* Floating medical icons */}
        <div className="absolute top-20 left-1/3 opacity-10">
          <Building2 className="w-8 h-8 text-blue-300 transform rotate-12" />
        </div>
        <div className="absolute top-60 right-1/4 opacity-10">
          <Calendar className="w-6 h-6 text-purple-300 transform -rotate-12" />
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-8 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border-r border-white/20"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Your home for health
            </h1>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Find experienced doctors across all specialties
            </p>
            
            {/* Search Section */}
            <div className="max-w-4xl mx-auto mb-8">
              <h2 className="text-xl sm:text-2xl text-white/90 mb-6 font-medium">Find and Book</h2>
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-center px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200 md:w-64">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="border-0 shadow-none p-0 h-auto font-medium text-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="Pune">Pune</SelectItem>
                        <SelectItem value="Kolkata">Kolkata</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center flex-1">
                    <div className="flex items-center flex-1 px-4">
                      <Search className="h-5 w-5 text-gray-400 mr-3" />
                      <Input
                        placeholder="Search doctors, clinics, hospitals, etc."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-0 shadow-none flex-1 text-base placeholder:text-gray-400"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      />
                    </div>
                    <Button 
                      onClick={handleSearch} 
                      className="m-2 px-8 bg-blue-600 hover:bg-blue-700 font-medium text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="max-w-4xl mx-auto">
              <p className="text-white/80 mb-6 text-sm font-medium">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {popularSearches.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => handleSpecialtyClick(specialty)}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 hover:scale-105 transform"
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Menu - Mobile First */}
      <div className="bg-blue-800/40 backdrop-blur-md border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {bottomMenuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-white/10 transition-all duration-200 group"
              >
                <div className="relative mb-3">
                  <div className={`p-4 ${item.color} rounded-2xl group-hover:scale-110 transition-all duration-200 shadow-lg`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="text-white text-sm font-medium group-hover:text-blue-200 transition-colors leading-tight">
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/articles"
              className="flex items-center space-x-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 group border border-white/20"
            >
              <div className="bg-green-500 p-3 rounded-xl group-hover:scale-110 transition-all duration-200">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Read Health Articles</h3>
                <p className="text-white/70 text-sm">Expert medical advice & wellness tips</p>
              </div>
            </a>

            <a
              href="/healthcare-providers"
              className="flex items-center space-x-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 group border border-white/20"
            >
              <div className="bg-indigo-500 p-3 rounded-xl group-hover:scale-110 transition-all duration-200">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">For Healthcare Providers</h3>
                <p className="text-white/70 text-sm">Join our network & grow your practice</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">2M+</div>
              <div className="text-white/80 text-sm">Happy Patients</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">25K+</div>
              <div className="text-white/80 text-sm">Verified Doctors</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">600+</div>
              <div className="text-white/80 text-sm">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Login/Signup Dialog */}
      <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-gray-900">
              Welcome to Practo
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={(e) => handleLogin(e, false)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2">
                  Login
                </Button>
                
                <div className="text-center text-sm text-gray-600">
                  <a href="#" className="text-blue-600 hover:text-blue-700">Forgot password?</a>
                </div>
              </form>
            </TabsContent>
            
            {/* Sign Up Tab */}
            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={(e) => handleLogin(e, true)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={loginForm.name}
                      onChange={(e) => setLoginForm({...loginForm, name: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2">
                  Create Account
                </Button>
                
                <div className="text-center text-xs text-gray-500">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
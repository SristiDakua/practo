"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, MapPin, Star, ChevronDown, Filter, Clock, CheckCircle, Phone, Award, MapPinIcon, Calendar, User, Mail, MessageSquare, X, Stethoscope, Video, Activity, Building2, Users, HelpCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Doctor {
  id: number;
  name: string;
  type: 'doctor' | 'clinic';
  specialization: string;
  experience: string;
  location: string;
  fee: number;
  rating: number;
  stories: number;
  image?: string;
  logo?: string;
  isAd?: boolean;
  availability: string;
  badges?: string[];
  gender: 'male' | 'female';
  experienceYears: number;
}

export default function DoctorsPage() {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(searchParams.get('location') || 'JP Nagar');
  const [specialization, setSpecialization] = useState(searchParams.get('specialization') || 'Dermatologist');
  const [sortBy, setSortBy] = useState('relevance');
  const [genderFilter, setGenderFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [patientStoriesFilter, setPatientStoriesFilter] = useState('all');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dialog states
  const [bookingDialog, setBookingDialog] = useState(false);
  const [contactDialog, setContactDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  // Booking form states
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    phoneNumber: '',
    email: '',
    appointmentDate: '',
    appointmentTime: '',
    symptoms: ''
  });
  
  // Contact form states
  const [contactForm, setContactForm] = useState({
    name: '',
    phoneNumber: '',
    message: ''
  });

  // Fetch doctors from API
  useEffect(() => {
    const filterDoctors = () => {
      setLoading(true);
      
      // Filter doctors based on search criteria
      let filteredDoctors = mockDoctors.filter(doctor => {
        // Specialization filter
        if (specialization && !doctor.specialization.toLowerCase().includes(specialization.toLowerCase())) {
          return false;
        }
        
        // Location filter
        if (location && !doctor.location.toLowerCase().includes(location.toLowerCase())) {
          return false;
        }
        
        // Gender filter
        if (genderFilter !== 'all' && doctor.gender !== genderFilter) {
          return false;
        }
        
        // Experience filter
        if (experienceFilter !== 'all') {
          if (experienceFilter === '0-5' && doctor.experienceYears > 5) return false;
          if (experienceFilter === '5-10' && (doctor.experienceYears < 5 || doctor.experienceYears > 10)) return false;
          if (experienceFilter === '10+' && doctor.experienceYears < 10) return false;
        }
        
        // Patient stories filter
        if (patientStoriesFilter !== 'all') {
          if (patientStoriesFilter === '100+' && doctor.stories < 100) return false;
          if (patientStoriesFilter === '500+' && doctor.stories < 500) return false;
          if (patientStoriesFilter === '1000+' && doctor.stories < 1000) return false;
        }
        
        return true;
      });

      // Sort doctors based on sort parameter
      switch (sortBy) {
        case 'experience':
          filteredDoctors.sort((a, b) => b.experienceYears - a.experienceYears);
          break;
        case 'fee':
          filteredDoctors.sort((a, b) => a.fee - b.fee);
          break;
        case 'rating':
          filteredDoctors.sort((a, b) => b.rating - a.rating);
          break;
        case 'availability':
          filteredDoctors.sort((a, b) => {
            if (a.availability.includes('Today') && !b.availability.includes('Today')) return -1;
            if (!a.availability.includes('Today') && b.availability.includes('Today')) return 1;
            return 0;
          });
          break;
        default: // relevance
          // Keep original order for relevance
          break;
      }
      
      setDoctors(filteredDoctors);
      setTotalCount(filteredDoctors.length);
      setLoading(false);
    };

    // Simulate API delay
    setTimeout(filterDoctors, 300);
  }, [specialization, location, sortBy, genderFilter, experienceFilter, patientStoriesFilter]);

  // Mock data for client-side filtering
  const mockDoctors: Doctor[] = [
    {
      id: 1,
      name: "Aesthetic Heart Dermatology & Cardiology Clinic",
      type: "clinic",
      specialization: "dermatologist",
      experience: "11 - 13 years experience",
      location: "Jayanagar",
      fee: 800,
      rating: 97,
      stories: 159,
      logo: "AH",
      isAd: true,
      availability: "Available Today",
      gender: 'male',
      experienceYears: 12
    },
    {
      id: 2,
      name: "Dr. Sheelavathi Natraj",
      type: "doctor",
      specialization: "dermatologist",
      experience: "21 years experience overall",
      location: "JP Nagar, Bangalore • Sapphire Skin And Aesthetics Clinic + 1 more",
      fee: 800,
      rating: 94,
      stories: 1506,
      image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      isAd: false,
      availability: "Available Today",
      badges: ["practo", "Skin & Hair"],
      gender: 'female',
      experienceYears: 21
    },
    {
      id: 3,
      name: "Dr. Rajesh Kumar",
      type: "doctor",
      specialization: "dermatologist",
      experience: "15 years experience overall",
      location: "JP Nagar, Bangalore • Skin Care Clinic",
      fee: 600,
      rating: 92,
      stories: 823,
      image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      isAd: false,
      availability: "Available Tomorrow",
      gender: 'male',
      experienceYears: 15
    },
    {
      id: 4,
      name: "Dr. Priya Sharma",
      type: "doctor",
      specialization: "dermatologist",
      experience: "18 years experience overall",
      location: "JP Nagar, Bangalore • Advanced Dermatology Center",
      fee: 900,
      rating: 96,
      stories: 1245,
      image: "https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      isAd: false,
      availability: "Available Today",
      gender: 'female',
      experienceYears: 18
    },
    {
      id: 5,
      name: "Dr. Amit Patel",
      type: "doctor",
      specialization: "dermatologist",
      experience: "12 years experience overall",
      location: "JP Nagar, Bangalore • City Skin Clinic",
      fee: 700,
      rating: 89,
      stories: 654,
      image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      isAd: false,
      availability: "Available Today",
      gender: 'male',
      experienceYears: 12
    },
    {
      id: 6,
      name: "Dr. Kavitha Reddy",
      type: "doctor",
      specialization: "pediatrician",
      experience: "16 years experience overall",
      location: "JP Nagar, Bangalore • Children's Care Clinic",
      fee: 650,
      rating: 93,
      stories: 987,
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      isAd: false,
      availability: "Available Today",
      gender: 'female',
      experienceYears: 16
    },
    {
      id: 7,
      name: "Dr. Suresh Menon",
      type: "doctor",
      specialization: "cardiologist",
      experience: "25 years experience overall",
      location: "JP Nagar, Bangalore • Heart Care Center",
      fee: 1200,
      rating: 98,
      stories: 2134,
      image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      isAd: false,
      availability: "Available Tomorrow",
      gender: 'male',
      experienceYears: 25
    },
    {
      id: 8,
      name: "Dr. Meera Joshi",
      type: "doctor",
      specialization: "gynecologist",
      experience: "19 years experience overall",
      location: "JP Nagar, Bangalore • Women's Health Clinic",
      fee: 850,
      rating: 95,
      stories: 1432,
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      isAd: false,
      availability: "Available Today",
      gender: 'female',
      experienceYears: 19
    }
  ];

  const handleSearch = () => {
    // Trigger new search with updated parameters
    const params = new URLSearchParams({
      specialization,
      location,
      sort: sortBy,
      ...(genderFilter !== 'all' && { gender: genderFilter }),
      ...(experienceFilter !== 'all' && { experience: experienceFilter }),
      ...(patientStoriesFilter !== 'all' && { patientStories: patientStoriesFilter })
    });
    
    window.history.pushState({}, '', `/doctors?${params}`);
  };

  // Booking handlers
  const handleBookingClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setBookingDialog(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking API call
    console.log('Booking submitted:', {
      doctor: selectedDoctor,
      booking: bookingForm
    });
    alert(`Booking confirmed for ${selectedDoctor?.name}!\nAppointment: ${bookingForm.appointmentDate} at ${bookingForm.appointmentTime}\nYou will receive a confirmation SMS shortly.`);
    setBookingDialog(false);
    setBookingForm({
      patientName: '',
      phoneNumber: '',
      email: '',
      appointmentDate: '',
      appointmentTime: '',
      symptoms: ''
    });
  };

  // Contact handlers
  const handleContactClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setContactDialog(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate contact API call
    console.log('Contact form submitted:', {
      doctor: selectedDoctor,
      contact: contactForm
    });
    alert(`Your message has been sent to ${selectedDoctor?.name}'s clinic!\nThey will contact you within 24 hours.`);
    setContactDialog(false);
    setContactForm({
      name: '',
      phoneNumber: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                
                {/* Find Doctors - Active */}
                <div className="relative group">
                  <a 
                    href="/doctors" 
                    className="flex items-center px-4 py-2 text-gray-900 font-bold hover:text-blue-600 transition-colors relative"
                  >
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Find Doctors
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-800 rounded-t-sm"></span>
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
                    </div>
                  )}
                </div>

              </div>

              {/* 🔹 3. User Auth */}
              <div className="flex items-center space-x-4">
                {/* Desktop Auth */}
                <div className="hidden lg:block ml-2">
                  <Button 
                    variant="outline" 
                    className="border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg transition-all duration-200 font-medium px-8 py-2 rounded-full"
                  >
                    Login / Signup
                  </Button>
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
              <a href="/doctors" className="flex items-center px-3 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium border-l-4 border-blue-600">
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
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login / Signup
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Search Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex rounded-lg border border-gray-300 overflow-hidden">
              <div className="flex items-center px-4 py-3 border-r border-gray-300 bg-gray-50 min-w-48">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-0 shadow-none p-0 text-sm bg-transparent"
                  placeholder="Location"
                />
              </div>
              <div className="flex items-center px-4 py-3 bg-white flex-1">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <Input
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="border-0 shadow-none p-0 text-sm"
                  placeholder="Search doctors, clinics, hospitals, etc."
                />
              </div>
            </div>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 px-8 font-medium">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-32 bg-transparent border-white/30 text-white hover:bg-white/10">
                <SelectValue placeholder="Gender" />
                <ChevronDown className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gender</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>

            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger className="w-36 bg-transparent border-white/30 text-white hover:bg-white/10">
                <SelectValue placeholder="Experience" />
                <ChevronDown className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Experience</SelectItem>
                <SelectItem value="5+">5+ years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
                <SelectItem value="15+">15+ years</SelectItem>
                <SelectItem value="20+">20+ years</SelectItem>
              </SelectContent>
            </Select>

            <Select value={patientStoriesFilter} onValueChange={setPatientStoriesFilter}>
              <SelectTrigger className="w-40 bg-transparent border-white/30 text-white hover:bg-white/10">
                <SelectValue placeholder="Patient Stories" />
                <ChevronDown className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Stories</SelectItem>
                <SelectItem value="50+">50+ Stories</SelectItem>
                <SelectItem value="100+">100+ Stories</SelectItem>
                <SelectItem value="500+">500+ Stories</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              <Filter className="h-4 w-4 mr-2" />
              All Filters
            </Button>

            <div className="flex items-center ml-auto">
              <span className="text-sm mr-2 font-medium">Sort By</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-transparent border-white/30 text-white hover:bg-white/10">
                  <SelectValue />
                  <ChevronDown className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="fee">Fee: Low to High</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="availability">Availability</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {loading ? 'Loading...' : `${totalCount || doctors.length} ${specialization}s available in ${location}, Bangalore`}
          </h1>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Book appointments with minimum wait-time & verified doctor details
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="shadow-sm">
                <CardContent className="p-6">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-lg bg-gray-200 h-20 w-20"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Doctor Image/Logo */}
                    <div className="flex-shrink-0">
                      {doctor.image ? (
                        <div className="relative">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-20 h-20 rounded-xl object-cover shadow-md"
                          />
                          {doctor.badges && (
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                              <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                                <span>practo</span>
                                {doctor.badges.includes('Skin & Hair') && (
                                  <span className="text-yellow-300">Skin & Hair</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-2xl font-bold text-yellow-600">{doctor.logo}</span>
                        </div>
                      )}
                      {doctor.isAd && (
                        <Badge variant="secondary" className="mt-2 text-xs bg-orange-100 text-orange-600">
                          AD
                        </Badge>
                      )}
                    </div>

                    {/* Doctor Details */}
                    <div className="flex-1">
                      <div className="mb-3">
                        <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-700 cursor-pointer mb-1">
                          {doctor.name}
                        </h3>
                        <p className="text-gray-600 text-sm font-medium">{doctor.specialization}</p>
                      </div>

                      <div className="mb-4 space-y-2">
                        <div className="flex items-center text-gray-700 text-sm">
                          <Award className="h-4 w-4 mr-2 text-blue-500" />
                          {doctor.experience}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                          {doctor.location}
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-gray-900">₹{doctor.fee}</span>
                          <span className="text-gray-600 text-sm ml-1">Consultation Fees</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 mb-4">
                        <div className="flex items-center">
                          <div className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center">
                            👍 {doctor.rating}%
                          </div>
                          <span className="text-gray-600 text-sm ml-3 underline cursor-pointer hover:text-blue-600">
                            {doctor.stories} Patient Stories
                          </span>
                        </div>
                        {doctor.availability && (
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <Clock className="h-4 w-4 mr-1" />
                            {doctor.availability}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-3 lg:w-48">
                      <div className="relative">
                        <Button 
                          onClick={() => handleBookingClick(doctor)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Clinic Visit
                        </Button>
                      </div>
                      <Button 
                        onClick={() => handleContactClick(doctor)}
                        variant="outline" 
                        className="text-blue-600 border-blue-600 hover:bg-blue-50 font-medium py-3 rounded-lg transition-all duration-200"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Clinic
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && doctors.length > 0 && (
          <div className="mt-8 text-center">
            <Button variant="outline" className="px-8 py-3 font-medium hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
              Load More Doctors
            </Button>
          </div>
        )}

        {/* No Results */}
        {!loading && doctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or location</p>
          </div>
        )}
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingDialog} onOpenChange={setBookingDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold text-blue-600">
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment with {selectedDoctor?.name}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name *</Label>
                <Input
                  id="patientName"
                  placeholder="Enter patient name"
                  value={bookingForm.patientName}
                  onChange={(e) => setBookingForm({...bookingForm, patientName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  type="tel"
                  value={bookingForm.phoneNumber}
                  onChange={(e) => setBookingForm({...bookingForm, phoneNumber: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="Enter email address"
                type="email"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointmentDate">Preferred Date *</Label>
                <Input
                  id="appointmentDate"
                  type="date"
                  value={bookingForm.appointmentDate}
                  onChange={(e) => setBookingForm({...bookingForm, appointmentDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointmentTime">Preferred Time *</Label>
                <Select value={bookingForm.appointmentTime} onValueChange={(value) => setBookingForm({...bookingForm, appointmentTime: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                    <SelectItem value="17:00">05:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Brief description of symptoms/concerns</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe your symptoms or reason for visit..."
                value={bookingForm.symptoms}
                onChange={(e) => setBookingForm({...bookingForm, symptoms: e.target.value})}
                rows={3}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Appointment Details:</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
                <p><strong>Consultation Fee:</strong> ₹{selectedDoctor?.fee}</p>
                <p><strong>Location:</strong> {selectedDoctor?.location}</p>
                {selectedDoctor?.id === 2 && (
                  <p className="text-green-600 font-medium">✓ No Booking Fee</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setBookingDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Confirm Booking
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contactDialog} onOpenChange={setContactDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold text-blue-600">
              <MessageSquare className="h-5 w-5 mr-2" />
              Contact {selectedDoctor?.name}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Your Name *</Label>
              <Input
                id="contactName"
                placeholder="Enter your name"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone Number *</Label>
              <Input
                id="contactPhone"
                placeholder="Enter phone number"
                type="tel"
                value={contactForm.phoneNumber}
                onChange={(e) => setContactForm({...contactForm, phoneNumber: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Write your message or questions here..."
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                rows={4}
                required
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Contact Information:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
                <p><strong>Specialization:</strong> {selectedDoctor?.specialization}</p>
                <p><strong>Location:</strong> {selectedDoctor?.location}</p>
                <p className="text-green-600 font-medium">✓ Clinic will respond within 24 hours</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setContactDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
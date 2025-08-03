"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Video, Clock, Star, CheckCircle, Phone, Calendar, MessageSquare, Shield, Zap, Heart, Award, ChevronDown, Filter, Stethoscope, Activity, Building2, Users, HelpCircle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  videoFee: number;
  rating: number;
  consultations: number;
  image: string;
  availability: string;
  languages: string[];
  nextSlot: string;
  badges?: string[];
  gender: 'male' | 'female';
}

export default function VideoConsultPage() {
  const router = useRouter();
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultDialog, setConsultDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    phoneNumber: '',
    email: '',
    timeSlot: '',
    symptoms: ''
  });

  const videoConsultDoctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "Dermatologist",
      experience: "18 years experience",
      videoFee: 500,
      rating: 96,
      consultations: 2143,
      image: "https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      availability: "Available Now",
      languages: ["English", "Hindi", "Kannada"],
      nextSlot: "Available in 15 mins",
      badges: ["Top Rated", "Quick Response"],
      gender: 'female'
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialization: "General Physician",
      experience: "15 years experience",
      videoFee: 400,
      rating: 94,
      consultations: 3456,
      image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      availability: "Available Now",
      languages: ["English", "Hindi", "Tamil"],
      nextSlot: "Available in 5 mins",
      badges: ["Most Consulted", "Patient Favorite"],
      gender: 'male'
    },
    {
      id: 3,
      name: "Dr. Meera Joshi",
      specialization: "Gynecologist",
      experience: "19 years experience",
      videoFee: 600,
      rating: 98,
      consultations: 1876,
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      availability: "Available Now",
      languages: ["English", "Hindi", "Marathi"],
      nextSlot: "Available in 30 mins",
      badges: ["Women's Health Expert", "Top Rated"],
      gender: 'female'
    },
    {
      id: 4,
      name: "Dr. Amit Patel",
      specialization: "Pediatrician",
      experience: "12 years experience",
      videoFee: 450,
      rating: 92,
      consultations: 2987,
      image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      availability: "Available Today",
      languages: ["English", "Hindi", "Gujarati"],
      nextSlot: "Available at 2:30 PM",
      badges: ["Child Specialist", "Parent Recommended"],
      gender: 'male'
    },
    {
      id: 5,
      name: "Dr. Kavitha Reddy",
      specialization: "Psychiatrist",
      experience: "16 years experience",
      videoFee: 700,
      rating: 95,
      consultations: 1654,
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      availability: "Available Today",
      languages: ["English", "Telugu", "Hindi"],
      nextSlot: "Available at 4:00 PM",
      badges: ["Mental Health Expert", "Therapy Specialist"],
      gender: 'female'
    }
  ];

  const handleConsultClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setConsultDialog(true);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Video consultation booked:', {
      doctor: selectedDoctor,
      booking: bookingForm
    });
    alert(`Video consultation booked with ${selectedDoctor?.name}!\nTime: ${bookingForm.timeSlot}\nMeeting link will be sent to your phone/email 10 minutes before the consultation.`);
    setConsultDialog(false);
    setBookingForm({
      patientName: '',
      phoneNumber: '',
      email: '',
      timeSlot: '',
      symptoms: ''
    });
  };

  const filteredDoctors = specialization 
    ? videoConsultDoctors.filter(doctor => 
        doctor.specialization.toLowerCase().includes(specialization.toLowerCase())
      )
    : videoConsultDoctors;

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

                {/* Video Consult - Active */}
                <div className="relative group">
                  <a 
                    href="/video-consult" 
                    className="flex items-center px-4 py-2 text-gray-900 font-bold hover:text-blue-600 transition-colors relative"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Video Consult
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-800 rounded-t-sm"></span>
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
              <a href="/doctors" className="flex items-center px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
                <Stethoscope className="h-5 w-5 mr-3" />
                Find Doctors
              </a>
              
              <a href="/video-consult" className="flex items-center px-3 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium border-l-4 border-blue-600">
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Video className="h-12 w-12 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">Video Consultation</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Consult with experienced doctors from the comfort of your home
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex rounded-lg overflow-hidden shadow-lg">
                <div className="flex items-center px-4 py-3 bg-white text-gray-700 flex-1">
                  <Search className="h-5 w-5 text-gray-400 mr-3" />
                  <Input
                    placeholder="Search by specialization (e.g., Dermatologist, General Physician)"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="border-0 shadow-none flex-1 text-base"
                  />
                </div>
                <Button className="bg-blue-700 hover:bg-blue-800 px-8 font-medium">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Consultation</h3>
              <p className="text-gray-600 text-sm">Connect with doctors within minutes</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">End-to-end encrypted consultations</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Follow-up Care</h3>
              <p className="text-gray-600 text-sm">Get prescriptions and follow-up support</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verified Doctors</h3>
              <p className="text-gray-600 text-sm">Consult only with certified professionals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Doctors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Available for Video Consultation ({filteredDoctors.length} doctors)
          </h2>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            All doctors are online and ready for instant consultation
          </div>
        </div>

        <div className="space-y-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Doctor Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-24 h-24 rounded-xl object-cover shadow-md"
                      />
                      <div className="absolute -top-2 -right-2">
                        <div className="bg-green-500 text-white p-1 rounded-full">
                          <Video className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
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
                        <Clock className="h-4 w-4 mr-2 text-green-500" />
                        {doctor.nextSlot}
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900">₹{doctor.videoFee}</span>
                        <span className="text-gray-600 text-sm ml-1">Video Consultation</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center">
                          👍 {doctor.rating}%
                        </div>
                        <span className="text-gray-600 text-sm ml-3">
                          {doctor.consultations} consultations
                        </span>
                      </div>
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {doctor.availability}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {doctor.badges?.map((badge, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Languages: </span>
                      {doctor.languages.join(', ')}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col justify-center lg:w-48">
                    <Button 
                      onClick={() => handleConsultClick(doctor)}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-3"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Start Video Consult
                    </Button>
                    <div className="text-xs text-center text-gray-500">
                      Instant consultation available
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Consultation Dialog */}
      <Dialog open={consultDialog} onOpenChange={setConsultDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold text-green-600">
              <Video className="h-5 w-5 mr-2" />
              Book Video Consultation with {selectedDoctor?.name}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleConsultSubmit} className="space-y-4 mt-4">
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

            <div className="space-y-2">
              <Label htmlFor="timeSlot">Preferred Time Slot *</Label>
              <Select value={bookingForm.timeSlot} onValueChange={(value) => setBookingForm({...bookingForm, timeSlot: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Start Now</SelectItem>
                  <SelectItem value="15min">In 15 minutes</SelectItem>
                  <SelectItem value="30min">In 30 minutes</SelectItem>
                  <SelectItem value="1hour">In 1 hour</SelectItem>
                  <SelectItem value="2hour">In 2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Brief description of symptoms/concerns</Label>
              <Input
                id="symptoms"
                placeholder="Describe your symptoms briefly..."
                value={bookingForm.symptoms}
                onChange={(e) => setBookingForm({...bookingForm, symptoms: e.target.value})}
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Consultation Details:</h4>
              <div className="text-sm text-green-700 space-y-1">
                <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
                <p><strong>Specialization:</strong> {selectedDoctor?.specialization}</p>
                <p><strong>Video Consultation Fee:</strong> ₹{selectedDoctor?.videoFee}</p>
                <p><strong>Languages:</strong> {selectedDoctor?.languages.join(', ')}</p>
                <p className="text-green-600 font-medium">✓ Instant consultation • ✓ Prescription included • ✓ Follow-up support</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setConsultDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Video className="h-4 w-4 mr-2" />
                Book Video Consult
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

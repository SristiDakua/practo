"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Scissors, Star, CheckCircle, Phone, Calendar, Award, ChevronDown, Heart, Shield, Clock, Users, DollarSign, FileText, Stethoscope, Activity, Building2, Video, HelpCircle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Surgery {
  id: number;
  name: string;
  category: string;
  description: string;
  duration: string;
  startingPrice: number;
  rating: number;
  procedures: number;
  hospitals: number;
  image: string;
  features: string[];
  recovery: string;
  popularity: 'High' | 'Medium' | 'Low';
}

interface Hospital {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
  surgeries: number;
}

export default function SurgeriesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSurgery, setSelectedSurgery] = useState<Surgery | null>(null);
  const [consultDialog, setConsultDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    phoneNumber: '',
    email: '',
    surgery: '',
    medicalHistory: '',
    preferredDate: ''
  });

  const surgeries: Surgery[] = [
    {
      id: 1,
      name: "Cataract Surgery",
      category: "Ophthalmology",
      description: "Advanced phacoemulsification cataract surgery with premium IOL implants",
      duration: "30-45 minutes",
      startingPrice: 25000,
      rating: 98,
      procedures: 15420,
      hospitals: 45,
      image: "https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      features: ["Same day discharge", "No injections", "Quick recovery", "Premium IOLs available"],
      recovery: "1-2 weeks",
      popularity: 'High'
    },
    {
      id: 2,
      name: "Gallbladder Surgery (Laparoscopic)",
      category: "General Surgery",
      description: "Minimally invasive laparoscopic cholecystectomy with rapid recovery",
      duration: "45-60 minutes",
      startingPrice: 45000,
      rating: 96,
      procedures: 8760,
      hospitals: 32,
      image: "https://images.pexels.com/photos/8088495/pexels-photo-8088495.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      features: ["Laparoscopic technique", "Minimal scarring", "Same day or 1-day stay", "Expert surgeons"],
      recovery: "1-2 weeks",
      popularity: 'High'
    },
    {
      id: 3,
      name: "Hernia Surgery",
      category: "General Surgery",
      description: "Advanced mesh repair for inguinal, umbilical, and ventral hernias",
      duration: "60-90 minutes",
      startingPrice: 35000,
      rating: 94,
      procedures: 12350,
      hospitals: 38,
      image: "https://images.pexels.com/photos/8376271/pexels-photo-8376271.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      features: ["Mesh repair", "Low recurrence rate", "Quick recovery", "Day care surgery"],
      recovery: "2-3 weeks",
      popularity: 'High'
    },
    {
      id: 4,
      name: "Knee Replacement Surgery",
      category: "Orthopedics",
      description: "Total and partial knee replacement with advanced prosthetics",
      duration: "1.5-2 hours",
      startingPrice: 150000,
      procedures: 2840,
      hospitals: 28,
      rating: 97,
      image: "https://images.pexels.com/photos/8376182/pexels-photo-8376182.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      features: ["Advanced prosthetics", "Computer-assisted surgery", "Pain-free life", "Expert orthopedic surgeons"],
      recovery: "6-8 weeks",
      popularity: 'Medium'
    },
    {
      id: 5,
      name: "Appendix Surgery (Laparoscopic)",
      category: "General Surgery",
      description: "Emergency and elective laparoscopic appendectomy",
      duration: "30-45 minutes",
      startingPrice: 40000,
      rating: 95,
      procedures: 6780,
      hospitals: 35,
      image: "https://images.pexels.com/photos/8376226/pexels-photo-8376226.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      features: ["Emergency surgery", "Laparoscopic approach", "Quick recovery", "24/7 availability"],
      recovery: "1-2 weeks",
      popularity: 'Medium'
    },
    {
      id: 6,
      name: "Piles Surgery (Laser)",
      category: "Proctology",
      description: "Advanced laser treatment for hemorrhoids with painless recovery",
      duration: "20-30 minutes",
      startingPrice: 28000,
      rating: 93,
      procedures: 4920,
      hospitals: 25,
      image: "https://images.pexels.com/photos/8376280/pexels-photo-8376280.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      features: ["Painless laser treatment", "Same day discharge", "No cuts or wounds", "Quick recovery"],
      recovery: "3-5 days",
      popularity: 'Medium'
    }
  ];

  const topHospitals: Hospital[] = [
    {
      id: 1,
      name: "Apollo Hospitals",
      location: "Multiple locations",
      rating: 98,
      image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop",
      surgeries: 25000
    },
    {
      id: 2,
      name: "Fortis Healthcare",
      location: "Pan India",
      rating: 96,
      image: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop",
      surgeries: 18000
    },
    {
      id: 3,
      name: "Max Healthcare",
      location: "North India",
      rating: 97,
      image: "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop",
      surgeries: 22000
    }
  ];

  const categories = ['all', 'General Surgery', 'Orthopedics', 'Ophthalmology', 'Proctology', 'Urology', 'Gynecology'];

  const handleConsultClick = (surgery: Surgery) => {
    setSelectedSurgery(surgery);
    setBookingForm({...bookingForm, surgery: surgery.name});
    setConsultDialog(true);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Surgery consultation booked:', {
      surgery: selectedSurgery,
      booking: bookingForm
    });
    alert(`Consultation request submitted for ${selectedSurgery?.name}!\nOur surgery coordinator will contact you within 2 hours to discuss your case and schedule a consultation.`);
    setConsultDialog(false);
    setBookingForm({
      patientName: '',
      phoneNumber: '',
      email: '',
      surgery: '',
      medicalHistory: '',
      preferredDate: ''
    });
  };

  const filteredSurgeries = surgeries.filter(surgery => {
    const matchesCategory = selectedCategory === 'all' || surgery.category === selectedCategory;
    const matchesSearch = surgery.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         surgery.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

                {/* Surgeries - Active with NEW badge */}
                <div className="relative group">
                  <a 
                    href="/surgeries" 
                    className="flex items-center px-4 py-2 text-gray-900 font-bold hover:text-blue-600 transition-colors relative"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Surgeries
                    <Badge className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">NEW</Badge>
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-800 rounded-t-sm"></span>
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
              
              <a href="/video-consult" className="flex items-center px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
                <Video className="h-5 w-5 mr-3" />
                Video Consult
              </a>
              
              <a href="/surgeries" className="flex items-center px-3 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium border-l-4 border-blue-600">
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
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Scissors className="h-12 w-12 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">Surgery Packages</h1>
            </div>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Safe, affordable surgery packages with transparent pricing and expert care
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search surgeries (e.g., Cataract, Gallbladder, Hernia)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 text-gray-700"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="md:w-48 h-12 bg-white text-gray-700">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safe & Certified</h3>
              <p className="text-gray-600 text-sm">NABH accredited hospitals</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600 text-sm">No hidden costs or surprises</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Surgeons</h3>
              <p className="text-gray-600 text-sm">Experienced & qualified doctors</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Post-Surgery Care</h3>
              <p className="text-gray-600 text-sm">Complete follow-up support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Surgery Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Popular Surgery Packages ({filteredSurgeries.length} available)
          </h2>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            All packages include pre-surgery consultation, surgery, and post-operative care
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSurgeries.map((surgery) => (
            <Card key={surgery.id} className="shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Surgery Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={surgery.image}
                      alt={surgery.name}
                      className="w-24 h-20 rounded-lg object-cover shadow-md"
                    />
                  </div>

                  {/* Surgery Details */}
                  <div className="flex-1">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-purple-600">
                          {surgery.name}
                        </h3>
                        <Badge 
                          variant={surgery.popularity === 'High' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {surgery.popularity}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{surgery.category}</p>
                    </div>

                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {surgery.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1 text-blue-500" />
                        {surgery.duration}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Heart className="h-4 w-4 mr-1 text-red-500" />
                        Recovery: {surgery.recovery}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-gray-900">₹{surgery.startingPrice.toLocaleString()}</span>
                        <span className="text-gray-600 text-sm ml-1">onwards</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                          {surgery.rating}%
                        </div>
                        <span className="text-gray-600">{surgery.procedures} procedures</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {surgery.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      onClick={() => handleConsultClick(surgery)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-200"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Free Consultation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Hospitals */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Top Partner Hospitals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topHospitals.map((hospital) => (
              <Card key={hospital.id} className="text-center">
                <CardContent className="p-6">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h4 className="font-semibold text-gray-900 mb-2">{hospital.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{hospital.location}</p>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{hospital.rating}%</span>
                    </div>
                    <div className="text-gray-600">
                      {hospital.surgeries.toLocaleString()} surgeries
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Surgery Consultation Dialog */}
      <Dialog open={consultDialog} onOpenChange={setConsultDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold text-purple-600">
              <FileText className="h-5 w-5 mr-2" />
              Free Consultation for {selectedSurgery?.name}
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
              <Label htmlFor="preferredDate">Preferred Consultation Date</Label>
              <Input
                id="preferredDate"
                type="date"
                value={bookingForm.preferredDate}
                onChange={(e) => setBookingForm({...bookingForm, preferredDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History & Current Symptoms</Label>
              <Textarea
                id="medicalHistory"
                placeholder="Please describe your medical history, current symptoms, and any previous treatments..."
                value={bookingForm.medicalHistory}
                onChange={(e) => setBookingForm({...bookingForm, medicalHistory: e.target.value})}
                rows={4}
              />
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Surgery Package Details:</h4>
              <div className="text-sm text-purple-700 space-y-1">
                <p><strong>Surgery:</strong> {selectedSurgery?.name}</p>
                <p><strong>Category:</strong> {selectedSurgery?.category}</p>
                <p><strong>Duration:</strong> {selectedSurgery?.duration}</p>
                <p><strong>Starting Price:</strong> ₹{selectedSurgery?.startingPrice.toLocaleString()}</p>
                <p><strong>Recovery Time:</strong> {selectedSurgery?.recovery}</p>
                <p className="text-green-600 font-medium">✓ Free consultation • ✓ Transparent pricing • ✓ Post-surgery care</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setConsultDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                <Calendar className="h-4 w-4 mr-2" />
                Request Free Consultation
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

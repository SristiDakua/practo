"use client";

import { useState } from 'react';
import { FileText, Download, Eye, Calendar, User, Activity, Search, Filter, Upload, Share2, Trash2, Plus, FolderOpen, Clock, Shield, Heart, ChevronDown, Menu, X, HelpCircle, Users, Building2, Video, Stethoscope, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MedicalRecord {
  id: number;
  type: 'lab_report' | 'prescription' | 'consultation' | 'imaging' | 'vaccination' | 'discharge_summary';
  title: string;
  doctorName: string;
  hospitalName: string;
  date: string;
  category: string;
  fileSize: string;
  description: string;
  tags: string[];
  isCritical: boolean;
  isShared: boolean;
}

interface UploadFormData {
  title: string;
  type: string;
  doctorName: string;
  hospitalName: string;
  date: string;
  category: string;
  description: string;
  tags: string;
}

export default function MedicalRecordsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [uploadForm, setUploadForm] = useState<UploadFormData>({
    title: '',
    type: '',
    doctorName: '',
    hospitalName: '',
    date: '',
    category: '',
    description: '',
    tags: ''
  });
  const [shareEmail, setShareEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  const medicalRecords: MedicalRecord[] = [
    {
      id: 1,
      type: 'lab_report',
      title: 'Complete Blood Count (CBC)',
      doctorName: 'Dr. Rajesh Kumar',
      hospitalName: 'Apollo Hospital',
      date: '2024-01-15',
      category: 'Blood Tests',
      fileSize: '2.4 MB',
      description: 'Routine blood work showing all parameters within normal range',
      tags: ['blood', 'routine', 'normal'],
      isCritical: false,
      isShared: false
    },
    {
      id: 2,
      type: 'prescription',
      title: 'Hypertension Medication',
      doctorName: 'Dr. Priya Sharma',
      hospitalName: 'Max Healthcare',
      date: '2024-01-10',
      category: 'Cardiology',
      fileSize: '1.2 MB',
      description: 'Prescription for blood pressure management including Amlodipine 5mg',
      tags: ['hypertension', 'cardiology', 'medication'],
      isCritical: true,
      isShared: true
    },
    {
      id: 3,
      type: 'consultation',
      title: 'General Health Checkup',
      doctorName: 'Dr. Amit Patel',
      hospitalName: 'Fortis Hospital',
      date: '2024-01-08',
      category: 'General Medicine',
      fileSize: '3.1 MB',
      description: 'Annual health checkup with recommendations for lifestyle modifications',
      tags: ['checkup', 'general', 'annual'],
      isCritical: false,
      isShared: false
    },
    {
      id: 4,
      type: 'imaging',
      title: 'Chest X-Ray',
      doctorName: 'Dr. Sunita Reddy',
      hospitalName: 'AIIMS Delhi',
      date: '2024-01-05',
      category: 'Radiology',
      fileSize: '5.8 MB',
      description: 'Chest X-ray showing clear lung fields, no abnormalities detected',
      tags: ['xray', 'chest', 'radiology', 'normal'],
      isCritical: false,
      isShared: false
    },
    {
      id: 5,
      type: 'vaccination',
      title: 'COVID-19 Vaccination Certificate',
      doctorName: 'Dr. Medical Officer',
      hospitalName: 'Government Hospital',
      date: '2023-12-20',
      category: 'Immunization',
      fileSize: '800 KB',
      description: 'COVID-19 vaccination certificate for booster dose',
      tags: ['covid', 'vaccination', 'booster'],
      isCritical: false,
      isShared: true
    },
    {
      id: 6,
      type: 'discharge_summary',
      title: 'Appendectomy Discharge Summary',
      doctorName: 'Dr. Vikash Singh',
      hospitalName: 'Medanta Hospital',
      date: '2023-11-15',
      category: 'Surgery',
      fileSize: '4.2 MB',
      description: 'Post-surgical discharge summary with follow-up instructions',
      tags: ['surgery', 'appendectomy', 'discharge'],
      isCritical: true,
      isShared: false
    }
  ];

  const categories = ['all', 'Blood Tests', 'Cardiology', 'General Medicine', 'Radiology', 'Immunization', 'Surgery'];
  const types = ['all', 'lab_report', 'prescription', 'consultation', 'imaging', 'vaccination', 'discharge_summary'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab_report': return <Activity className="h-5 w-5 text-red-500" />;
      case 'prescription': return <FileText className="h-5 w-5 text-blue-500" />;
      case 'consultation': return <User className="h-5 w-5 text-green-500" />;
      case 'imaging': return <Eye className="h-5 w-5 text-purple-500" />;
      case 'vaccination': return <Shield className="h-5 w-5 text-orange-500" />;
      case 'discharge_summary': return <FolderOpen className="h-5 w-5 text-gray-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lab_report': return 'Lab Report';
      case 'prescription': return 'Prescription';
      case 'consultation': return 'Consultation';
      case 'imaging': return 'Medical Imaging';
      case 'vaccination': return 'Vaccination';
      case 'discharge_summary': return 'Discharge Summary';
      default: return 'Medical Record';
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Upload form:', uploadForm);
    alert('Medical record uploaded successfully! It will be processed and available in your records shortly.');
    setUploadDialog(false);
    setUploadForm({
      title: '',
      type: '',
      doctorName: '',
      hospitalName: '',
      date: '',
      category: '',
      description: '',
      tags: ''
    });
  };

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Share record:', selectedRecord, 'to:', shareEmail, 'message:', shareMessage);
    alert(`Medical record "${selectedRecord?.title}" has been shared with ${shareEmail} successfully!`);
    setShareDialog(false);
    setShareEmail('');
    setShareMessage('');
  };

  const filteredRecords = medicalRecords.filter(record => {
    const matchesCategory = selectedCategory === 'all' || record.category === selectedCategory;
    const matchesType = selectedType === 'all' || record.type === selectedType;
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesType && matchesSearch;
  });

  const criticalRecords = medicalRecords.filter(record => record.isCritical);
  const recentRecords = medicalRecords.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* 🔹 1. Left Section: Brand Identity */}
            <div className="flex-shrink-0 pl-6">
              <a href="/" className="text-2xl font-bold flex items-center">
                <div className="w-2 h-2 bg-sky-400 rounded-full mr-2"></div>
                <span style={{color: '#1e3a8a'}}>practo</span>
                <div className="w-2 h-2 bg-sky-400 rounded-full ml-2"></div>
              </a>
            </div>

            {/* 🔹 2. Center Section: Navigation Menu (Desktop) */}
            <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
              
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

            {/* 🔹 3. Right Section: User Auth */}
            <div className="flex items-center space-x-4">
              {/* Desktop Auth */}
              <div className="hidden lg:block ml-8">
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
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-1"></div>
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full opacity-5"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white rounded-full opacity-5"></div>
          <div className="absolute top-40 right-40 w-20 h-20 bg-white rounded-full opacity-5"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-6xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Your home for health
            </h1>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Find & book appointments with doctors, order medicines, store health records & much more.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-white rounded-full shadow-xl p-2 flex items-center">
                <div className="flex-1 flex items-center">
                  <div className="flex items-center px-4 py-3 border-r border-gray-200 bg-gray-50 rounded-l-full">
                    <MapPin className="h-5 w-5 text-gray-600 mr-2" />
                    <span className="text-gray-700 font-medium">Bangalore</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search doctors, hospitals, specialities"
                    className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-500 bg-transparent outline-none"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl shadow-lg font-semibold">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="text-center">
              <p className="text-blue-200 text-sm mb-4">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Dentist',
                  'Gynecologist',
                  'Dermatologist',
                  'Pediatrician',
                  'Cardiologist',
                  'Orthopedist'
                ].map((search, index) => (
                  <button
                    key={index}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:ring-2 hover:ring-white/40 text-white px-4 py-2 rounded-full text-sm transition-all duration-200 border border-white/20"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-white -mt-10 relative z-10 mx-4 sm:mx-6 lg:mx-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          
          {/* Top Grid - Main Services */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            
            {/* Instant Video Consultation */}
            <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg mb-6 mx-auto w-20 h-20 flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300 aspect-square">
                <Video className="h-10 w-10 text-white" />
              </div>
              <div className="text-base font-bold text-gray-800 mb-1">Instant Video</div>
              <div className="text-base font-bold text-gray-800 mb-3">Consultation</div>
              <div className="text-sm text-gray-600">Connect within 60 secs</div>
            </div>

            {/* Find Doctors Near You */}
            <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg mb-6 mx-auto w-20 h-20 flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300 aspect-square">
                <Stethoscope className="h-10 w-10 text-white" />
              </div>
              <div className="text-base font-bold text-gray-800 mb-1">Find Doctors</div>
              <div className="text-base font-bold text-gray-800 mb-3">Near You</div>
              <div className="text-sm text-gray-600">Confirmed appointments</div>
            </div>

            {/* Medicines */}
            <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-lg mb-6 mx-auto w-20 h-20 flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300 aspect-square">
                <Plus className="h-10 w-10 text-white" />
              </div>
              <div className="text-base font-bold text-gray-800 mb-1">Medicines</div>
              <div className="text-base font-bold text-gray-800 mb-3"></div>
              <div className="text-sm text-gray-600">Essential at your doorstep</div>
            </div>

            {/* Lab Tests */}
            <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-lg mb-6 mx-auto w-20 h-20 flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300 aspect-square">
                <Activity className="h-10 w-10 text-white" />
              </div>
              <div className="text-base font-bold text-gray-800 mb-1">Lab Tests</div>
              <div className="text-base font-bold text-gray-800 mb-3"></div>
              <div className="text-sm text-gray-600">Sample pickup at home</div>
            </div>

          </div>

          {/* Bottom Row - Additional Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-gray-100">
            
            {/* Read Health Articles */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-white/20 backdrop-blur-sm rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="flex items-center">
                <div className="bg-blue-100 p-4 rounded-xl mr-6">
                  <FileText className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Read health articles</h3>
                  <p className="text-base text-gray-600">Trusted medical information</p>
                </div>
              </div>
            </div>

            {/* For Providers */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-white/20 backdrop-blur-sm rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="flex items-center">
                <div className="bg-green-100 p-4 rounded-xl mr-6">
                  <Users className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">For providers</h3>
                  <p className="text-base text-gray-600">Grow your practice with Practo</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="all-records" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-records">All Records</TabsTrigger>
            <TabsTrigger value="critical">Critical Records</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="all-records" className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search medical records, doctors, hospitals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="lg:w-48">
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
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="lg:w-48">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : getTypeLabel(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Records Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(record.type)}
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                            {record.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{getTypeLabel(record.type)}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {record.isCritical && (
                          <Badge variant="destructive" className="text-xs">Critical</Badge>
                        )}
                        {record.isShared && (
                          <Badge variant="secondary" className="text-xs">Shared</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {record.doctorName}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Heart className="h-4 w-4 mr-2" />
                        {record.hospitalName}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FileText className="h-4 w-4 mr-2" />
                        {record.fileSize}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-2">{record.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {record.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {record.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{record.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRecord(record);
                          setViewDialog(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRecord(record);
                            setShareDialog(true);
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="critical" className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="font-semibold text-red-800">Critical Medical Records</h3>
              </div>
              <p className="text-red-700 text-sm mt-1">
                These records contain important medical information that may be critical for emergency care.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {criticalRecords.map((record) => (
                <Card key={record.id} className="border-red-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(record.type)}
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                            {record.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{getTypeLabel(record.type)}</p>
                        </div>
                      </div>
                      <Badge variant="destructive" className="text-xs">Critical</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {record.doctorName}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{record.description}</p>
                    <div className="flex justify-between items-center pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRecord(record);
                          setViewDialog(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => {
                          setSelectedRecord(record);
                          setShareDialog(true);
                        }}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share with Doctor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-800">Recent Activity</h3>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Your most recently added or updated medical records.
              </p>
            </div>

            <div className="space-y-4">
              {recentRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getTypeIcon(record.type)}
                        <div>
                          <h3 className="font-semibold text-gray-900">{record.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>{record.doctorName}</span>
                            <span>•</span>
                            <span>{new Date(record.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{getTypeLabel(record.type)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRecord(record);
                            setViewDialog(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Record Dialog */}
      <Dialog open={viewDialog} onOpenChange={setViewDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedRecord && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center text-xl font-semibold">
                  {getTypeIcon(selectedRecord.type)}
                  <span className="ml-2">{selectedRecord.title}</span>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="font-semibold text-gray-700">Doctor Name</Label>
                    <p className="text-gray-900">{selectedRecord.doctorName}</p>
                  </div>
                  <div>
                    <Label className="font-semibold text-gray-700">Hospital</Label>
                    <p className="text-gray-900">{selectedRecord.hospitalName}</p>
                  </div>
                  <div>
                    <Label className="font-semibold text-gray-700">Date</Label>
                    <p className="text-gray-900">{new Date(selectedRecord.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="font-semibold text-gray-700">Category</Label>
                    <p className="text-gray-900">{selectedRecord.category}</p>
                  </div>
                  <div>
                    <Label className="font-semibold text-gray-700">File Size</Label>
                    <p className="text-gray-900">{selectedRecord.fileSize}</p>
                  </div>
                  <div>
                    <Label className="font-semibold text-gray-700">Status</Label>
                    <div className="flex space-x-2">
                      {selectedRecord.isCritical && (
                        <Badge variant="destructive" className="text-xs">Critical</Badge>
                      )}
                      {selectedRecord.isShared && (
                        <Badge variant="secondary" className="text-xs">Shared</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="font-semibold text-gray-700">Description</Label>
                  <p className="text-gray-900 mt-1">{selectedRecord.description}</p>
                </div>

                <div>
                  <Label className="font-semibold text-gray-700">Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedRecord.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 text-center">
                    📄 Document preview would appear here in a real application
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setViewDialog(false)}>
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      setViewDialog(false);
                      setShareDialog(true);
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Record
                  </Button>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Record Dialog */}
      <Dialog open={uploadDialog} onOpenChange={setUploadDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold text-green-600">
              <Upload className="h-5 w-5 mr-2" />
              Upload Medical Record
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleUploadSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Record Title *</Label>
              <Input
                id="title"
                placeholder="Enter record title"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Record Type *</Label>
                <Select value={uploadForm.type} onValueChange={(value) => setUploadForm({...uploadForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lab_report">Lab Report</SelectItem>
                    <SelectItem value="prescription">Prescription</SelectItem>
                    <SelectItem value="consultation">Consultation Notes</SelectItem>
                    <SelectItem value="imaging">Medical Imaging</SelectItem>
                    <SelectItem value="vaccination">Vaccination Record</SelectItem>
                    <SelectItem value="discharge_summary">Discharge Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={uploadForm.category} onValueChange={(value) => setUploadForm({...uploadForm, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blood Tests">Blood Tests</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="General Medicine">General Medicine</SelectItem>
                    <SelectItem value="Radiology">Radiology</SelectItem>
                    <SelectItem value="Immunization">Immunization</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor Name</Label>
                <Input
                  id="doctorName"
                  placeholder="Enter doctor name"
                  value={uploadForm.doctorName}
                  onChange={(e) => setUploadForm({...uploadForm, doctorName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospitalName">Hospital/Clinic Name</Label>
                <Input
                  id="hospitalName"
                  placeholder="Enter hospital name"
                  value={uploadForm.hospitalName}
                  onChange={(e) => setUploadForm({...uploadForm, hospitalName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Record Date *</Label>
              <Input
                id="date"
                type="date"
                value={uploadForm.date}
                onChange={(e) => setUploadForm({...uploadForm, date: e.target.value})}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter description of the medical record..."
                value={uploadForm.description}
                onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="e.g., routine, blood work, normal"
                value={uploadForm.tags}
                onChange={(e) => setUploadForm({...uploadForm, tags: e.target.value})}
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PDF, JPG, PNG up to 10MB</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-700 space-y-1">
                <p className="font-medium">✓ Your records are encrypted and secure</p>
                <p className="font-medium">✓ Only you can access and share your records</p>
                <p className="font-medium">✓ HIPAA compliant storage</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setUploadDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Record
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Share Record Dialog */}
      <Dialog open={shareDialog} onOpenChange={setShareDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold text-blue-600">
              <Share2 className="h-5 w-5 mr-2" />
              Share Medical Record
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleShareSubmit} className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Sharing:</h4>
              <p className="text-sm text-gray-600">{selectedRecord?.title}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shareEmail">Recipient Email Address *</Label>
              <Input
                id="shareEmail"
                type="email"
                placeholder="Enter doctor or recipient email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shareMessage">Message (Optional)</Label>
              <Textarea
                id="shareMessage"
                placeholder="Add a message for the recipient..."
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                rows={3}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-700 space-y-1">
                <p className="font-medium">📧 Recipient will receive an email with secure access link</p>
                <p className="font-medium">🔒 Records are shared securely with time-limited access</p>
                <p className="font-medium">📱 You can revoke access anytime from your dashboard</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setShareDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Share2 className="h-4 w-4 mr-2" />
                Share Record
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

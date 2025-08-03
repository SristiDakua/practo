"use client";

import { useState } from 'react';
import { Building, Users, Award, TrendingUp, MapPin, Phone, Mail, Globe, Star, CheckCircle, Clock, Shield, Heart, Stethoscope, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HealthcareProvider {
  id: number;
  name: string;
  type: 'hospital' | 'clinic' | 'diagnostic' | 'pharmacy';
  description: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  totalReviews: number;
  specialties: string[];
  services: string[];
  facilities: string[];
  isVerified: boolean;
  isPractoPartner: boolean;
  established: string;
  doctorsCount?: number;
  bedsCount?: number;
}

interface JoinFormData {
  providerType: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  website: string;
  specialties: string;
  services: string;
  licenseNumber: string;
  experience: string;
  description: string;
}

export default function HealthcareProvidersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState<HealthcareProvider | null>(null);
  const [providerDialog, setProviderDialog] = useState(false);
  const [joinDialog, setJoinDialog] = useState(false);
  const [joinForm, setJoinForm] = useState<JoinFormData>({
    providerType: '',
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    website: '',
    specialties: '',
    services: '',
    licenseNumber: '',
    experience: '',
    description: ''
  });

  const healthcareProviders: HealthcareProvider[] = [
    {
      id: 1,
      name: "Apollo Hospitals",
      type: "hospital",
      description: "Leading multi-specialty hospital chain with state-of-the-art facilities and expert medical professionals across India.",
      address: "Apollo Health City, Jubilee Hills",
      city: "Hyderabad",
      phone: "+91-40-2355-1066",
      email: "info@apollohospitals.com",
      website: "www.apollohospitals.com",
      rating: 4.8,
      totalReviews: 15420,
      specialties: ["Cardiology", "Oncology", "Neurology", "Orthopedics", "Gastroenterology"],
      services: ["Emergency Care", "ICU", "Surgery", "Diagnostics", "Pharmacy"],
      facilities: ["24/7 Emergency", "ICU", "Operation Theaters", "Blood Bank", "Radiology"],
      isVerified: true,
      isPractoPartner: true,
      established: "1983",
      doctorsCount: 350,
      bedsCount: 600
    },
    {
      id: 2,
      name: "Max Healthcare",
      type: "hospital",
      description: "Premium healthcare provider offering comprehensive medical services with cutting-edge technology and compassionate care.",
      address: "Max Smart Super Specialty Hospital, Saket",
      city: "New Delhi",
      phone: "+91-11-2651-5050",
      email: "info@maxhealthcare.com",
      website: "www.maxhealthcare.in",
      rating: 4.7,
      totalReviews: 12850,
      specialties: ["Cardiac Sciences", "Neurosciences", "Oncology", "Orthopedics", "Women & Child Care"],
      services: ["Emergency Care", "Critical Care", "Diagnostics", "Rehabilitation", "Pharmacy"],
      facilities: ["24/7 Emergency", "Modular OTs", "NICU", "Cath Lab", "MRI & CT Scan"],
      isVerified: true,
      isPractoPartner: true,
      established: "2001",
      doctorsCount: 280,
      bedsCount: 450
    },
    {
      id: 3,
      name: "Fortis Healthcare",
      type: "hospital",
      description: "Integrated healthcare provider committed to providing quality healthcare services with clinical excellence and patient-centric approach.",
      address: "Fortis Hospital, Sector 62",
      city: "Noida",
      phone: "+91-120-247-2222",
      email: "info@fortishealthcare.com",
      website: "www.fortishealthcare.com",
      rating: 4.6,
      totalReviews: 10940,
      specialties: ["Cardiology", "Neurology", "Orthopedics", "Gastroenterology", "Urology"],
      services: ["Emergency Services", "Critical Care", "Diagnostics", "Rehabilitation", "Preventive Health"],
      facilities: ["Emergency Department", "ICU", "Modular OTs", "Blood Bank", "Pharmacy"],
      isVerified: true,
      isPractoPartner: true,
      established: "2001",
      doctorsCount: 220,
      bedsCount: 380
    },
    {
      id: 4,
      name: "Dr. Lal PathLabs",
      type: "diagnostic",
      description: "Leading diagnostic chain providing comprehensive pathology and diagnostic services with accurate and timely reports.",
      address: "Block E, Sector 18",
      city: "Noida",
      phone: "+91-120-393-9999",
      email: "info@lalpathlabs.com",
      website: "www.lalpathlabs.com",
      rating: 4.5,
      totalReviews: 25680,
      specialties: ["Pathology", "Radiology", "Cardiology", "Clinical Chemistry", "Molecular Diagnostics"],
      services: ["Lab Tests", "Health Checkups", "Home Collection", "Digital Reports", "Online Booking"],
      facilities: ["NABL Accredited", "Home Collection", "Online Reports", "Quality Assurance", "Expert Consultation"],
      isVerified: true,
      isPractoPartner: true,
      established: "1949"
    },
    {
      id: 5,
      name: "SRL Diagnostics",
      type: "diagnostic",
      description: "One of India's largest diagnostic chains offering comprehensive diagnostic services with advanced technology and expert pathologists.",
      address: "Sector 44",
      city: "Gurgaon",
      phone: "+91-124-491-7000",
      email: "info@srldiagnostics.com",
      website: "www.srldiagnostics.com",
      rating: 4.4,
      totalReviews: 18920,
      specialties: ["Clinical Pathology", "Radiology", "Cardiology", "Molecular Biology", "Genetics"],
      services: ["Laboratory Services", "Radiology", "Home Sample Collection", "Health Packages", "Corporate Health"],
      facilities: ["CAP Accredited", "24/7 Collection", "Digital Reports", "Quality Control", "Research Labs"],
      isVerified: true,
      isPractoPartner: true,
      established: "1995"
    },
    {
      id: 6,
      name: "Medanta - The Medicity",
      type: "hospital",
      description: "Multi-super specialty hospital providing world-class healthcare with advanced medical technology and renowned doctors.",
      address: "Sector 38",
      city: "Gurgaon",
      phone: "+91-124-414-1414",
      email: "info@medanta.org",
      website: "www.medanta.org",
      rating: 4.9,
      totalReviews: 8750,
      specialties: ["Cardiac Sciences", "Neurosciences", "Transplant", "Oncology", "Robotic Surgery"],
      services: ["Emergency Care", "Critical Care", "Transplant Services", "Robotic Surgery", "Rehabilitation"],
      facilities: ["Level 1 Trauma Center", "Heart Command Center", "Robotic Surgery", "Transplant ICU", "Research Center"],
      isVerified: true,
      isPractoPartner: true,
      established: "2009",
      doctorsCount: 400,
      bedsCount: 1250
    },
    {
      id: 7,
      name: "HealthKart Clinic",
      type: "clinic",
      description: "Modern multi-specialty clinic providing comprehensive healthcare services with experienced doctors and advanced equipment.",
      address: "Connaught Place",
      city: "New Delhi",
      phone: "+91-11-4321-5678",
      email: "info@healthkartclinic.com",
      website: "www.healthkartclinic.com",
      rating: 4.3,
      totalReviews: 3240,
      specialties: ["General Medicine", "Pediatrics", "Gynecology", "Dermatology", "ENT"],
      services: ["OPD Consultation", "Health Checkups", "Vaccination", "Minor Procedures", "Diagnostic Services"],
      facilities: ["Digital X-Ray", "ECG", "Ultrasound", "Laboratory", "Pharmacy"],
      isVerified: true,
      isPractoPartner: true,
      established: "2015",
      doctorsCount: 25
    },
    {
      id: 8,
      name: "Apollo Pharmacy",
      type: "pharmacy",
      description: "India's largest pharmacy chain providing genuine medicines, health products, and healthcare services at your doorstep.",
      address: "Multiple Locations",
      city: "Pan India",
      phone: "+91-40-3981-1111",
      email: "support@apollopharmacy.in",
      website: "www.apollopharmacy.in",
      rating: 4.2,
      totalReviews: 45620,
      specialties: ["Pharmacy", "Health Products", "Medical Equipment", "Wellness", "Healthcare Services"],
      services: ["Medicine Delivery", "Health Checkups", "Online Consultation", "Health Monitoring", "Subscription"],
      facilities: ["24/7 Delivery", "Online Ordering", "Mobile App", "Health Advisory", "Quality Assurance"],
      isVerified: true,
      isPractoPartner: true,
      established: "1983"
    }
  ];

  const providerTypes = ['all', 'hospital', 'clinic', 'diagnostic', 'pharmacy'];
  const cities = ['all', 'New Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Gurgaon', 'Noida'];

  const getProviderTypeIcon = (type: string) => {
    switch (type) {
      case 'hospital': return <Building className="h-6 w-6 text-blue-500" />;
      case 'clinic': return <Stethoscope className="h-6 w-6 text-green-500" />;
      case 'diagnostic': return <Award className="h-6 w-6 text-purple-500" />;
      case 'pharmacy': return <Heart className="h-6 w-6 text-red-500" />;
      default: return <Building className="h-6 w-6 text-gray-500" />;
    }
  };

  const getProviderTypeLabel = (type: string) => {
    switch (type) {
      case 'hospital': return 'Hospital';
      case 'clinic': return 'Clinic';
      case 'diagnostic': return 'Diagnostic Center';
      case 'pharmacy': return 'Pharmacy';
      default: return 'Healthcare Provider';
    }
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Join request:', joinForm);
    alert('Thank you for your interest in joining Practo! Our team will review your application and contact you within 2-3 business days.');
    setJoinDialog(false);
    setJoinForm({
      providerType: '',
      organizationName: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      website: '',
      specialties: '',
      services: '',
      licenseNumber: '',
      experience: '',
      description: ''
    });
  };

  const filteredProviders = healthcareProviders.filter(provider => {
    const matchesType = selectedType === 'all' || provider.type === selectedType;
    const matchesCity = selectedCity === 'all' || provider.city === selectedCity;
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         provider.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesCity && matchesSearch;
  });

  const practoPartners = healthcareProviders.filter(provider => provider.isPractoPartner);
  const hospitals = healthcareProviders.filter(provider => provider.type === 'hospital');
  const diagnosticCenters = healthcareProviders.filter(provider => provider.type === 'diagnostic');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <a href="/" className="text-2xl font-bold flex items-center">
                  <div className="w-2 h-2 bg-sky-400 rounded-full mr-2"></div>
                  <span style={{color: '#1e3a8a'}}>practo</span>
                  <div className="w-2 h-2 bg-sky-400 rounded-full ml-2"></div>
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="/doctors" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Find Doctors
                </a>
                <a href="/medicines" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Medicines
                </a>
                <a href="/lab-tests" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Lab Tests
                </a>
                <a href="/medical-records" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Medical Records
                </a>
                <a href="/articles" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Articles
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setJoinDialog(true)} className="bg-green-600 hover:bg-green-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Join as Provider
              </Button>
              <Button variant="outline" className="font-medium">
                Login / Signup
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Building className="h-12 w-12 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">Healthcare Providers</h1>
            </div>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Discover trusted healthcare providers, hospitals, clinics, and diagnostic centers in your area
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">{healthcareProviders.length}</div>
              <div className="text-gray-600">Total Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{hospitals.length}</div>
              <div className="text-gray-600">Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{diagnosticCenters.length}</div>
              <div className="text-gray-600">Diagnostic Centers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{practoPartners.length}</div>
              <div className="text-gray-600">Practo Partners</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="all-providers" className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <TabsList className="grid w-full lg:w-auto grid-cols-3">
              <TabsTrigger value="all-providers">All Providers</TabsTrigger>
              <TabsTrigger value="partners">Practo Partners</TabsTrigger>
              <TabsTrigger value="join">Join Network</TabsTrigger>
            </TabsList>

            <div className="flex gap-4">
              <Input
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {providerTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'All Types' : getProviderTypeLabel(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>
                      {city === 'all' ? 'All Cities' : city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all-providers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {getProviderTypeIcon(provider.type)}
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                            {provider.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{getProviderTypeLabel(provider.type)}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {provider.isVerified && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {provider.isPractoPartner && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">Partner</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-sm line-clamp-2">{provider.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-red-500" />
                        <span className="truncate">{provider.city}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-green-500" />
                        Est. {provider.established}
                      </div>
                      {provider.doctorsCount && (
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2 text-purple-500" />
                          {provider.doctorsCount} Doctors
                        </div>
                      )}
                      {provider.bedsCount && (
                        <div className="flex items-center text-gray-600">
                          <Building className="h-4 w-4 mr-2 text-blue-500" />
                          {provider.bedsCount} Beds
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700 ml-1">
                            {provider.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({provider.totalReviews.toLocaleString()} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {provider.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {provider.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{provider.specialties.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Button
                        onClick={() => {
                          setSelectedProvider(provider);
                          setProviderDialog(true);
                        }}
                        className="flex-1 mr-2"
                      >
                        View Details
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Globe className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-800">Practo Verified Partners</h3>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                These healthcare providers are verified partners offering seamless booking and quality care.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {practoPartners.map((provider) => (
                <Card key={provider.id} className="border-blue-200 hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {getProviderTypeIcon(provider.type)}
                        <div>
                          <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                            {provider.name}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{getProviderTypeLabel(provider.type)}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Partner</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-700 text-sm">{provider.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-red-500" />
                        {provider.city}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                        {provider.rating} ({provider.totalReviews.toLocaleString()})
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-sm text-blue-700 space-y-1">
                        <p className="font-medium">✓ Instant booking available</p>
                        <p className="font-medium">✓ Verified by Practo</p>
                        <p className="font-medium">✓ Quality assured care</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setSelectedProvider(provider);
                        setProviderDialog(true);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="join" className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <UserPlus className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 mb-4">Join the Practo Network</h2>
                <p className="text-green-700 mb-6 max-w-2xl mx-auto">
                  Become a part of India's leading healthcare platform and reach millions of patients. 
                  Expand your practice, increase visibility, and provide better patient care.
                </p>
                <Button onClick={() => setJoinDialog(true)} size="lg" className="bg-green-600 hover:bg-green-700">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Apply to Join Network
                </Button>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Increase Patient Volume</h3>
                  <p className="text-gray-600 text-sm">Reach millions of patients actively searching for healthcare services online.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Build Trust & Credibility</h3>
                  <p className="text-gray-600 text-sm">Get verified badge and build trust with patient reviews and ratings.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Streamline Operations</h3>
                  <p className="text-gray-600 text-sm">Manage appointments, patient records, and billing efficiently through our platform.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Better Patient Care</h3>
                  <p className="text-gray-600 text-sm">Provide better patient experience with digital tools and seamless communication.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Marketing Support</h3>
                  <p className="text-gray-600 text-sm">Get marketing support and promotional opportunities to grow your practice.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Network Benefits</h3>
                  <p className="text-gray-600 text-sm">Connect with other healthcare providers and access continuing education resources.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Provider Details Dialog */}
      <Dialog open={providerDialog} onOpenChange={setProviderDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedProvider && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center text-xl font-semibold">
                  {getProviderTypeIcon(selectedProvider.type)}
                  <span className="ml-2">{selectedProvider.name}</span>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold">{selectedProvider.rating}</span>
                    <span className="text-gray-600">({selectedProvider.totalReviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex space-x-2">
                    {selectedProvider.isVerified && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {selectedProvider.isPractoPartner && (
                      <Badge className="bg-blue-100 text-blue-800">Partner</Badge>
                    )}
                  </div>
                </div>

                <p className="text-gray-700">{selectedProvider.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {selectedProvider.address}, {selectedProvider.city}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {selectedProvider.phone}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {selectedProvider.email}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Globe className="h-4 w-4 mr-2" />
                        {selectedProvider.website}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Quick Facts</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Established:</span>
                        <span className="font-medium">{selectedProvider.established}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{getProviderTypeLabel(selectedProvider.type)}</span>
                      </div>
                      {selectedProvider.doctorsCount && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Doctors:</span>
                          <span className="font-medium">{selectedProvider.doctorsCount}</span>
                        </div>
                      )}
                      {selectedProvider.bedsCount && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Beds:</span>
                          <span className="font-medium">{selectedProvider.bedsCount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProvider.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProvider.services.map((service, index) => (
                      <Badge key={index} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Facilities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProvider.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setProviderDialog(false)}>
                    Close
                  </Button>
                  {selectedProvider.isPractoPartner && (
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Book Appointment
                    </Button>
                  )}
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Join Network Dialog */}
      <Dialog open={joinDialog} onOpenChange={setJoinDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold text-green-600">
              <UserPlus className="h-5 w-5 mr-2" />
              Join Practo Provider Network
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleJoinSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="providerType">Provider Type *</Label>
                <Select value={joinForm.providerType} onValueChange={(value) => setJoinForm({...joinForm, providerType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="clinic">Clinic</SelectItem>
                    <SelectItem value="diagnostic">Diagnostic Center</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name *</Label>
                <Input
                  id="organizationName"
                  placeholder="Enter organization name"
                  value={joinForm.organizationName}
                  onChange={(e) => setJoinForm({...joinForm, organizationName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  placeholder="Enter contact person name"
                  value={joinForm.contactPerson}
                  onChange={(e) => setJoinForm({...joinForm, contactPerson: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={joinForm.email}
                  onChange={(e) => setJoinForm({...joinForm, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={joinForm.phone}
                  onChange={(e) => setJoinForm({...joinForm, phone: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="Enter website URL"
                  value={joinForm.website}
                  onChange={(e) => setJoinForm({...joinForm, website: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter complete address"
                value={joinForm.address}
                onChange={(e) => setJoinForm({...joinForm, address: e.target.value})}
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Enter city"
                  value={joinForm.city}
                  onChange={(e) => setJoinForm({...joinForm, city: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="Enter state"
                  value={joinForm.state}
                  onChange={(e) => setJoinForm({...joinForm, state: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  placeholder="Enter pincode"
                  value={joinForm.pincode}
                  onChange={(e) => setJoinForm({...joinForm, pincode: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  placeholder="Enter license number"
                  value={joinForm.licenseNumber}
                  onChange={(e) => setJoinForm({...joinForm, licenseNumber: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  placeholder="Enter years of experience"
                  value={joinForm.experience}
                  onChange={(e) => setJoinForm({...joinForm, experience: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialties">Specialties (comma separated)</Label>
              <Input
                id="specialties"
                placeholder="e.g., Cardiology, Orthopedics, General Medicine"
                value={joinForm.specialties}
                onChange={(e) => setJoinForm({...joinForm, specialties: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="services">Services Offered (comma separated)</Label>
              <Input
                id="services"
                placeholder="e.g., Emergency Care, Surgery, Diagnostics"
                value={joinForm.services}
                onChange={(e) => setJoinForm({...joinForm, services: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Organization Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of your organization..."
                value={joinForm.description}
                onChange={(e) => setJoinForm({...joinForm, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-700 space-y-1">
                <p className="font-medium">✓ Free initial consultation and onboarding</p>
                <p className="font-medium">✓ Marketing support and visibility boost</p>
                <p className="font-medium">✓ Access to digital tools and patient management</p>
                <p className="font-medium">✓ 24/7 technical support</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setJoinDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

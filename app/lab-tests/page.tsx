"use client";

import { useState } from 'react';
import { Search, Calendar, TestTube, MapPin, Star, CheckCircle, Clock, Shield, Home, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface LabTest {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  mrp: number;
  discount: number;
  sampleType: string;
  reportTime: string;
  fasting: boolean;
  homeCollection: boolean;
  popular: boolean;
  parameters: number;
}

interface LabPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  mrp: number;
  discount: number;
  tests: number;
  category: string;
  popular: boolean;
  reportTime: string;
  homeCollection: boolean;
}

export default function LabTestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItems, setSelectedItems] = useState<{tests: number[], packages: number[]}>({tests: [], packages: []});
  const [bookingDialog, setBookingDialog] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    pincode: '',
    preferredDate: '',
    preferredTime: '',
    homeCollection: true,
    specialInstructions: ''
  });

  const labTests: LabTest[] = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      description: "Comprehensive blood analysis including RBC, WBC, platelets, and hemoglobin",
      category: "Blood Tests",
      price: 250,
      mrp: 350,
      discount: 29,
      sampleType: "Blood",
      reportTime: "Same day",
      fasting: false,
      homeCollection: true,
      popular: true,
      parameters: 26
    },
    {
      id: 2,
      name: "Lipid Profile",
      description: "Cholesterol, triglycerides, HDL, LDL levels for heart health assessment",
      category: "Heart Health",
      price: 400,
      mrp: 600,
      discount: 33,
      sampleType: "Blood",
      reportTime: "Same day",
      fasting: true,
      homeCollection: true,
      popular: true,
      parameters: 8
    },
    {
      id: 3,
      name: "Thyroid Function Test (TFT)",
      description: "T3, T4, TSH levels to assess thyroid gland function",
      category: "Hormones",
      price: 450,
      mrp: 650,
      discount: 31,
      sampleType: "Blood",
      reportTime: "Next day",
      fasting: false,
      homeCollection: true,
      popular: true,
      parameters: 3
    },
    {
      id: 4,
      name: "Blood Sugar (Glucose)",
      description: "Fasting and random glucose levels for diabetes screening",
      category: "Diabetes",
      price: 80,
      mrp: 120,
      discount: 33,
      sampleType: "Blood",
      reportTime: "Same day",
      fasting: true,
      homeCollection: true,
      popular: false,
      parameters: 2
    },
    {
      id: 5,
      name: "Vitamin D Test",
      description: "25-Hydroxy Vitamin D levels to assess vitamin D deficiency",
      category: "Vitamins",
      price: 900,
      mrp: 1200,
      discount: 25,
      sampleType: "Blood",
      reportTime: "2-3 days",
      fasting: false,
      homeCollection: true,
      popular: true,
      parameters: 1
    },
    {
      id: 6,
      name: "Liver Function Test (LFT)",
      description: "Comprehensive liver health assessment including enzymes and proteins",
      category: "Liver Health",
      price: 550,
      mrp: 750,
      discount: 27,
      sampleType: "Blood",
      reportTime: "Same day",
      fasting: false,
      homeCollection: true,
      popular: false,
      parameters: 12
    }
  ];

  const labPackages: LabPackage[] = [
    {
      id: 1,
      name: "Full Body Checkup",
      description: "Comprehensive health checkup covering all major organs and systems",
      price: 1999,
      mrp: 3500,
      discount: 43,
      tests: 72,
      category: "Health Packages",
      popular: true,
      reportTime: "Same day",
      homeCollection: true
    },
    {
      id: 2,
      name: "Diabetes Care Package",
      description: "Complete diabetes monitoring with HbA1c, glucose, and complications screening",
      price: 1200,
      mrp: 1800,
      discount: 33,
      tests: 15,
      category: "Diabetes",
      popular: true,
      reportTime: "Same day",
      homeCollection: true
    },
    {
      id: 3,
      name: "Heart Health Package",
      description: "Comprehensive cardiac risk assessment with ECG and cardiac markers",
      price: 2500,
      mrp: 4000,
      discount: 38,
      tests: 25,
      category: "Heart Health",
      popular: true,
      reportTime: "Next day",
      homeCollection: true
    },
    {
      id: 4,
      name: "Women's Health Package",
      description: "Specialized health screening for women including hormones and cancer markers",
      price: 2200,
      mrp: 3200,
      discount: 31,
      tests: 35,
      category: "Women's Health",
      popular: false,
      reportTime: "2-3 days",
      homeCollection: true
    }
  ];

  const categories = ['all', 'Blood Tests', 'Heart Health', 'Hormones', 'Diabetes', 'Vitamins', 'Liver Health', 'Health Packages', 'Women\'s Health'];

  const toggleTestSelection = (testId: number) => {
    setSelectedItems(prev => ({
      ...prev,
      tests: prev.tests.includes(testId) 
        ? prev.tests.filter(id => id !== testId)
        : [...prev.tests, testId]
    }));
  };

  const togglePackageSelection = (packageId: number) => {
    setSelectedItems(prev => ({
      ...prev,
      packages: prev.packages.includes(packageId)
        ? prev.packages.filter(id => id !== packageId)
        : [...prev.packages, packageId]
    }));
  };

  const getTotalItems = () => {
    return selectedItems.tests.length + selectedItems.packages.length;
  };

  const getTotalPrice = () => {
    const testsTotal = selectedItems.tests.reduce((sum, testId) => {
      const test = labTests.find(t => t.id === testId);
      return sum + (test ? test.price : 0);
    }, 0);
    
    const packagesTotal = selectedItems.packages.reduce((sum, packageId) => {
      const pkg = labPackages.find(p => p.id === packageId);
      return sum + (pkg ? pkg.price : 0);
    }, 0);
    
    return testsTotal + packagesTotal;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTests = selectedItems.tests.map(id => labTests.find(t => t.id === id));
    const selectedPackages = selectedItems.packages.map(id => labPackages.find(p => p.id === id));
    
    console.log('Lab test booking:', {
      tests: selectedTests,
      packages: selectedPackages,
      total: getTotalPrice(),
      bookingForm
    });
    
    alert(`Lab test booking confirmed!\nTotal: ₹${getTotalPrice()}\nSample collection: ${bookingForm.homeCollection ? 'Home collection' : 'Lab visit'}\nDate: ${bookingForm.preferredDate} at ${bookingForm.preferredTime}\nConfirmation details will be sent to your phone.`);
    
    setBookingDialog(false);
    setSelectedItems({tests: [], packages: []});
    setBookingForm({
      patientName: '',
      age: '',
      gender: '',
      phoneNumber: '',
      email: '',
      address: '',
      pincode: '',
      preferredDate: '',
      preferredTime: '',
      homeCollection: true,
      specialInstructions: ''
    });
  };

  const filteredTests = labTests.filter(test => {
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredPackages = labPackages.filter(pkg => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                <a href="/lab-tests" className="text-blue-600 font-medium px-3 py-2 border-b-2 border-blue-600">
                  Lab Tests
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={() => getTotalItems() > 0 && setBookingDialog(true)}
                >
                  <TestTube className="h-4 w-4" />
                  <span>Selected ({getTotalItems()})</span>
                </Button>
                {getTotalItems() > 0 && (
                  <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </div>
                )}
              </div>
              <Button variant="outline" className="font-medium">
                Login / Signup
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <TestTube className="h-12 w-12 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">Book Lab Tests</h1>
            </div>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Book lab tests online with home sample collection and fast reports
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search lab tests and health packages..."
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
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Home Collection</h3>
              <p className="text-gray-600 text-sm">Sample collection at your doorstep</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Reports</h3>
              <p className="text-gray-600 text-sm">Digital reports within hours</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">NABL Certified</h3>
              <p className="text-gray-600 text-sm">Accurate and reliable results</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">Free consultation with reports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Health Packages */}
      {filteredPackages.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Health Packages</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className={`hover:shadow-md transition-all duration-200 ${selectedItems.packages.includes(pkg.id) ? 'ring-2 ring-purple-500' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                        {pkg.popular && (
                          <Badge className="bg-orange-100 text-orange-600 text-xs">Popular</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-4">
                        <div className="flex items-center text-gray-600">
                          <TestTube className="h-4 w-4 mr-2 text-purple-500" />
                          {pkg.tests} tests included
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-green-500" />
                          {pkg.reportTime}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Home className="h-4 w-4 mr-2 text-blue-500" />
                          Home collection
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">₹{pkg.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{pkg.mrp}</span>
                      <span className="text-sm text-green-600">{pkg.discount}% off</span>
                    </div>
                    
                    <Button 
                      onClick={() => togglePackageSelection(pkg.id)}
                      variant={selectedItems.packages.includes(pkg.id) ? "default" : "outline"}
                      className={selectedItems.packages.includes(pkg.id) ? "bg-purple-600 hover:bg-purple-700" : ""}
                    >
                      {selectedItems.packages.includes(pkg.id) ? 'Selected' : 'Select Package'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Individual Tests */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Individual Lab Tests ({filteredTests.length} tests)
          </h2>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            All tests include free home sample collection
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className={`hover:shadow-md transition-all duration-200 ${selectedItems.tests.includes(test.id) ? 'ring-2 ring-purple-500' : ''}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                      {test.popular && (
                        <Badge className="bg-orange-100 text-orange-600 text-xs">Popular</Badge>
                      )}
                      {test.fasting && (
                        <Badge variant="outline" className="text-xs">Fasting Required</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center text-gray-600">
                        <TestTube className="h-4 w-4 mr-2 text-red-500" />
                        {test.sampleType} sample
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-green-500" />
                        {test.reportTime}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-blue-500" />
                        {test.parameters} parameters
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Home className="h-4 w-4 mr-2 text-purple-500" />
                        Home collection
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">₹{test.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{test.mrp}</span>
                    <span className="text-sm text-green-600">{test.discount}% off</span>
                  </div>
                  
                  <Button 
                    onClick={() => toggleTestSelection(test.id)}
                    variant={selectedItems.tests.includes(test.id) ? "default" : "outline"}
                    className={selectedItems.tests.includes(test.id) ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {selectedItems.tests.includes(test.id) ? 'Selected' : 'Select Test'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingDialog} onOpenChange={setBookingDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold text-purple-600">
              <Calendar className="h-5 w-5 mr-2" />
              Book Your Lab Tests
            </DialogTitle>
          </DialogHeader>
          
          {/* Selection Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-3">Selected Items:</h4>
            <div className="space-y-2 text-sm">
              {selectedItems.tests.map(testId => {
                const test = labTests.find(t => t.id === testId);
                return test ? (
                  <div key={testId} className="flex justify-between">
                    <span>{test.name}</span>
                    <span>₹{test.price}</span>
                  </div>
                ) : null;
              })}
              {selectedItems.packages.map(packageId => {
                const pkg = labPackages.find(p => p.id === packageId);
                return pkg ? (
                  <div key={packageId} className="flex justify-between">
                    <span>{pkg.name}</span>
                    <span>₹{pkg.price}</span>
                  </div>
                ) : null;
              })}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>₹{getTotalPrice()}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  placeholder="Age"
                  type="number"
                  value={bookingForm.age}
                  onChange={(e) => setBookingForm({...bookingForm, age: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={bookingForm.gender} onValueChange={(value) => setBookingForm({...bookingForm, gender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address for Sample Collection *</Label>
              <Textarea
                id="address"
                placeholder="Enter complete address"
                value={bookingForm.address}
                onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode *</Label>
                <Input
                  id="pincode"
                  placeholder="Enter pincode"
                  value={bookingForm.pincode}
                  onChange={(e) => setBookingForm({...bookingForm, pincode: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date *</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={bookingForm.preferredDate}
                  onChange={(e) => setBookingForm({...bookingForm, preferredDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time *</Label>
                <Select value={bookingForm.preferredTime} onValueChange={(value) => setBookingForm({...bookingForm, preferredTime: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="06:00-08:00">6:00 AM - 8:00 AM</SelectItem>
                    <SelectItem value="08:00-10:00">8:00 AM - 10:00 AM</SelectItem>
                    <SelectItem value="10:00-12:00">10:00 AM - 12:00 PM</SelectItem>
                    <SelectItem value="12:00-14:00">12:00 PM - 2:00 PM</SelectItem>
                    <SelectItem value="14:00-16:00">2:00 PM - 4:00 PM</SelectItem>
                    <SelectItem value="16:00-18:00">4:00 PM - 6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                placeholder="Any special instructions for sample collection..."
                value={bookingForm.specialInstructions}
                onChange={(e) => setBookingForm({...bookingForm, specialInstructions: e.target.value})}
                rows={2}
              />
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-purple-700 space-y-1">
                <p className="font-medium">✓ Free home sample collection</p>
                <p className="font-medium">✓ NABL certified lab reports</p>
                <p className="font-medium">✓ Digital reports via email/SMS</p>
                <p className="font-medium">✓ Free doctor consultation with reports</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setBookingDialog(false)}>
                Continue Browsing
              </Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                <Calendar className="h-4 w-4 mr-2" />
                Book Tests - ₹{getTotalPrice()}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

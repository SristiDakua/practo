"use client";

import { useState } from 'react';
import { Search, MessageCircle, Video, Clock, Star, CheckCircle, Phone, Calendar, Award, ChevronDown, Shield, Zap, Heart, Users, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ConsultationOption {
  id: number;
  type: 'video' | 'chat' | 'call';
  title: string;
  description: string;
  price: number;
  duration: string;
  icon: any;
  color: string;
  features: string[];
  availability: string;
}

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  consultations: number;
  image: string;
  languages: string[];
  availableFor: ('video' | 'chat' | 'call')[];
  nextSlot: string;
}

export default function ConsultPage() {
  const [selectedType, setSelectedType] = useState<'video' | 'chat' | 'call' | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [consultDialog, setConsultDialog] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    phoneNumber: '',
    email: '',
    consultationType: '',
    timeSlot: '',
    symptoms: ''
  });

  const consultationOptions: ConsultationOption[] = [
    {
      id: 1,
      type: 'video',
      title: 'Video Consultation',
      description: 'Face-to-face consultation with doctor via video call',
      price: 500,
      duration: '15-30 mins',
      icon: Video,
      color: 'bg-blue-500',
      features: ['Face-to-face interaction', 'Screen sharing', 'Recording available', 'Prescription provided'],
      availability: 'Available 24/7'
    },
    {
      id: 2,
      type: 'chat',
      title: 'Chat Consultation',
      description: 'Text-based consultation with instant responses',
      price: 300,
      duration: '30-45 mins',
      icon: MessageCircle,
      color: 'bg-green-500',
      features: ['Text-based chat', 'Image sharing', 'Quick responses', 'Chat history saved'],
      availability: 'Available 24/7'
    },
    {
      id: 3,
      type: 'call',
      title: 'Voice Call',
      description: 'Audio-only consultation over phone call',
      price: 400,
      duration: '15-20 mins',
      icon: Phone,
      color: 'bg-purple-500',
      features: ['Audio consultation', 'Call recording', 'No video required', 'Prescription via SMS'],
      availability: 'Available 24/7'
    }
  ];

  const availableDoctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "General Physician",
      experience: "15 years experience",
      rating: 96,
      consultations: 3200,
      image: "https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      languages: ["English", "Hindi", "Tamil"],
      availableFor: ['video', 'chat', 'call'],
      nextSlot: "Available now"
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialization: "Internal Medicine",
      experience: "18 years experience",
      rating: 94,
      consultations: 2800,
      image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      languages: ["English", "Hindi", "Kannada"],
      availableFor: ['video', 'chat', 'call'],
      nextSlot: "Available in 10 mins"
    },
    {
      id: 3,
      name: "Dr. Kavitha Reddy",
      specialization: "Family Medicine",
      experience: "12 years experience",
      rating: 98,
      consultations: 2100,
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      languages: ["English", "Telugu", "Hindi"],
      availableFor: ['video', 'chat', 'call'],
      nextSlot: "Available now"
    }
  ];

  const handleConsultationTypeSelect = (type: 'video' | 'chat' | 'call') => {
    setSelectedType(type);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setBookingForm({...bookingForm, consultationType: selectedType || 'video'});
    setConsultDialog(true);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation booked:', {
      doctor: selectedDoctor,
      type: selectedType,
      booking: bookingForm
    });
    alert(`${selectedType?.charAt(0).toUpperCase()}${selectedType?.slice(1)} consultation booked with ${selectedDoctor?.name}!\nType: ${bookingForm.consultationType}\nTime: ${bookingForm.timeSlot}\nYou will receive connection details shortly.`);
    setConsultDialog(false);
    setBookingForm({
      patientName: '',
      phoneNumber: '',
      email: '',
      consultationType: '',
      timeSlot: '',
      symptoms: ''
    });
    setSelectedType(null);
  };

  const filteredDoctors = availableDoctors.filter(doctor => 
    !selectedType || doctor.availableFor.includes(selectedType)
  );

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
                <a href="/video-consult" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Video Consult
                </a>
                <a href="/surgeries" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Surgeries
                </a>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="font-medium">
                Login / Signup
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Stethoscope className="h-12 w-12 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">Consult with a Doctor</h1>
            </div>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Get instant medical consultation through video, chat, or voice call
            </p>
          </div>
        </div>
      </div>

      {/* Consultation Types */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Choose Your Consultation Type
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {consultationOptions.map((option) => (
            <Card 
              key={option.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedType === option.type ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onClick={() => handleConsultationTypeSelect(option.type)}
            >
              <CardContent className="p-6 text-center">
                <div className={`${option.color} p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="text-2xl font-bold text-gray-900">₹{option.price}</div>
                  <div className="text-sm text-gray-600">{option.duration}</div>
                  <div className="text-sm text-green-600 font-medium">{option.availability}</div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  {option.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                {selectedType === option.type && (
                  <Badge className="mt-4 bg-blue-100 text-blue-600">Selected</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Available Doctors */}
        {selectedType && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Available Doctors for {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Consultation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4 shadow-md"
                      />
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{doctor.specialization}</p>
                      <p className="text-gray-600 text-sm mb-4">{doctor.experience}</p>
                      
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{doctor.rating}%</span>
                        </div>
                        <div className="text-gray-600 text-sm">
                          {doctor.consultations} consultations
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Languages: {doctor.languages.join(', ')}</p>
                        <div className="flex items-center justify-center text-green-600 text-sm font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {doctor.nextSlot}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleDoctorSelect(doctor)}
                        className="w-full bg-teal-600 hover:bg-teal-700"
                      >
                        Start Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!selectedType && (
          <div className="text-center py-12">
            <Stethoscope className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a consultation type to continue</h3>
            <p className="text-gray-600">Choose from video, chat, or voice call consultation above</p>
          </div>
        )}
      </div>

      {/* Consultation Dialog */}
      <Dialog open={consultDialog} onOpenChange={setConsultDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold text-teal-600">
              <Heart className="h-5 w-5 mr-2" />
              Book {selectedType?.charAt(0).toUpperCase()}{selectedType?.slice(1)} Consultation with {selectedDoctor?.name}
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
              <Label htmlFor="timeSlot">Preferred Time *</Label>
              <Select value={bookingForm.timeSlot} onValueChange={(value) => setBookingForm({...bookingForm, timeSlot: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
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
              <Label htmlFor="symptoms">Symptoms/Concerns *</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe your symptoms or health concerns..."
                value={bookingForm.symptoms}
                onChange={(e) => setBookingForm({...bookingForm, symptoms: e.target.value})}
                rows={3}
                required
              />
            </div>

            <div className="bg-teal-50 p-4 rounded-lg">
              <h4 className="font-semibold text-teal-800 mb-2">Consultation Details:</h4>
              <div className="text-sm text-teal-700 space-y-1">
                <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
                <p><strong>Specialization:</strong> {selectedDoctor?.specialization}</p>
                <p><strong>Type:</strong> {selectedType?.charAt(0).toUpperCase()}{selectedType?.slice(1)} Consultation</p>
                <p><strong>Fee:</strong> ₹{consultationOptions.find(opt => opt.type === selectedType)?.price}</p>
                <p><strong>Languages:</strong> {selectedDoctor?.languages.join(', ')}</p>
                <p className="text-green-600 font-medium">✓ Instant consultation • ✓ Prescription included • ✓ Follow-up support</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setConsultDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                <Heart className="h-4 w-4 mr-2" />
                Start Consultation
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { NextRequest, NextResponse } from 'next/server';

// Sample doctor data - in a real app, this would come from a database
const doctors = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    city: "Bangalore",
    experience: 15,
    rating: 4.8,
    fees: 800,
    qualification: "MBBS, MD Cardiology",
    about: "Senior Cardiologist with 15+ years experience in treating heart conditions",
    availableTimes: ["10:00 AM", "2:00 PM", "4:00 PM"],
    languages: ["English", "Hindi", "Kannada"]
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    city: "Mumbai",
    experience: 12,
    rating: 4.9,
    fees: 600,
    qualification: "MBBS, MD Dermatology",
    about: "Expert in skin care and cosmetic dermatology with modern treatment approaches",
    availableTimes: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"],
    languages: ["English", "Hindi", "Marathi"]
  },
  {
    id: 3,
    name: "Dr. Arjun Patel",
    specialty: "Orthopedist",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
    city: "Delhi",
    experience: 18,
    rating: 4.7,
    fees: 1000,
    qualification: "MBBS, MS Orthopedics",
    about: "Specialist in joint replacement and sports medicine with international training",
    availableTimes: ["8:00 AM", "12:00 PM", "6:00 PM"],
    languages: ["English", "Hindi", "Gujarati"]
  },
  {
    id: 4,
    name: "Dr. Kavitha Reddy",
    specialty: "Gynecologist",
    image: "https://images.unsplash.com/photo-1594824495944-3f954c62aa0a?w=300&h=300&fit=crop&crop=face",
    city: "Hyderabad",
    experience: 14,
    rating: 4.8,
    fees: 700,
    qualification: "MBBS, MD Gynecology",
    about: "Women's health specialist with expertise in high-risk pregnancies and fertility",
    availableTimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
    languages: ["English", "Hindi", "Telugu"]
  },
  {
    id: 5,
    name: "Dr. Amit Singh",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=300&h=300&fit=crop&crop=face",
    city: "Pune",
    experience: 20,
    rating: 4.9,
    fees: 1200,
    qualification: "MBBS, DM Neurology",
    about: "Senior Neurologist specializing in stroke, epilepsy, and neurodegenerative diseases",
    availableTimes: ["9:00 AM", "2:00 PM", "5:00 PM"],
    languages: ["English", "Hindi", "Marathi"]
  },
  {
    id: 6,
    name: "Dr. Sunita Agarwal",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
    city: "Chennai",
    experience: 16,
    rating: 4.8,
    fees: 500,
    qualification: "MBBS, MD Pediatrics",
    about: "Child specialist with expertise in newborn care and childhood development",
    availableTimes: ["8:00 AM", "11:00 AM", "3:00 PM", "6:00 PM"],
    languages: ["English", "Hindi", "Tamil"]
  },
  {
    id: 7,
    name: "Dr. Ravi Verma",
    specialty: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    city: "Bangalore",
    experience: 13,
    rating: 4.7,
    fees: 900,
    qualification: "MBBS, MD Psychiatry",
    about: "Mental health specialist focusing on anxiety, depression, and behavioral disorders",
    availableTimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
    languages: ["English", "Hindi", "Kannada"]
  },
  {
    id: 8,
    name: "Dr. Meera Joshi",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    city: "Mumbai",
    experience: 17,
    rating: 4.9,
    fees: 1100,
    qualification: "MBBS, DM Cardiology",
    about: "Interventional cardiologist with expertise in complex cardiac procedures",
    availableTimes: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"],
    languages: ["English", "Hindi", "Marathi"]
  },
  {
    id: 9,
    name: "Dr. Sanjay Gupta",
    specialty: "Urologist",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
    city: "Delhi",
    experience: 19,
    rating: 4.6,
    fees: 950,
    qualification: "MBBS, MCh Urology",
    about: "Urologist specializing in kidney stones, prostate issues, and minimally invasive surgery",
    availableTimes: ["8:00 AM", "11:00 AM", "2:00 PM", "5:00 PM"],
    languages: ["English", "Hindi"]
  },
  {
    id: 10,
    name: "Dr. Lakshmi Nair",
    specialty: "Endocrinologist",
    image: "https://images.unsplash.com/photo-1594824495944-3f954c62aa0a?w=300&h=300&fit=crop&crop=face",
    city: "Kochi",
    experience: 11,
    rating: 4.8,
    fees: 650,
    qualification: "MBBS, DM Endocrinology",
    about: "Diabetes and hormone specialist with holistic approach to metabolic disorders",
    availableTimes: ["9:00 AM", "1:00 PM", "4:00 PM"],
    languages: ["English", "Hindi", "Malayalam"]
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const location = searchParams.get('location');
    const search = searchParams.get('search');

    let filteredDoctors = [...doctors];

    // Filter by specialty
    if (specialty && specialty !== 'all') {
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    // Filter by location/city
    if (location && location !== 'all') {
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.city.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by search term (name, specialty, or qualification)
    if (search) {
      filteredDoctors = filteredDoctors.filter(doctor => 
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
        doctor.qualification.toLowerCase().includes(search.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredDoctors,
      total: filteredDoctors.length
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}
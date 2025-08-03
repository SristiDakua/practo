import { NextRequest, NextResponse } from 'next/server';

// This would typically come from the same database as the main doctors API
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
    languages: ["English", "Hindi", "Kannada"],
    hospital: "Apollo Hospital, Bangalore",
    address: "154/11, Bannerghatta Road, Opposite IIM-B, Bangalore - 560076",
    phone: "+91-80-2692-2222"
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
    languages: ["English", "Hindi", "Marathi"],
    hospital: "Fortis Hospital, Mumbai",
    address: "Mulund Goregaon Link Road, Mumbai - 400078",
    phone: "+91-22-6754-4444"
  }
  // Add more doctors as needed...
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const doctorId = parseInt(params.id);
    const doctor = doctors.find(d => d.id === doctorId);

    if (!doctor) {
      return NextResponse.json(
        { success: false, error: 'Doctor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: doctor
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch doctor details' },
      { status: 500 }
    );
  }
}

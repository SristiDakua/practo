"use client";

import { useState } from 'react';
import { Search, ShoppingCart, Pill, Package, Star, CheckCircle, Truck, Shield, Clock, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Medicine {
  id: number;
  name: string;
  genericName: string;
  category: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  manufacturer: string;
  packSize: string;
  prescription: boolean;
  inStock: boolean;
  fastDelivery: boolean;
}

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [orderDialog, setOrderDialog] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    pincode: '',
    prescriptionImage: null as File | null
  });

  const medicines: Medicine[] = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      genericName: "Acetaminophen",
      category: "Pain Relief",
      price: 24,
      mrp: 30,
      discount: 20,
      rating: 4.5,
      reviews: 2340,
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      manufacturer: "Cipla Ltd",
      packSize: "Strip of 10 tablets",
      prescription: false,
      inStock: true,
      fastDelivery: true
    },
    {
      id: 2,
      name: "Crocin Advance 500mg",
      genericName: "Paracetamol",
      category: "Pain Relief",
      price: 18,
      mrp: 22,
      discount: 18,
      rating: 4.7,
      reviews: 1820,
      image: "https://images.pexels.com/photos/3683051/pexels-photo-3683051.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      manufacturer: "GSK Pharmaceuticals",
      packSize: "Strip of 15 tablets",
      prescription: false,
      inStock: true,
      fastDelivery: true
    },
    {
      id: 3,
      name: "Azithromycin 500mg",
      genericName: "Azithromycin",
      category: "Antibiotics",
      price: 89,
      mrp: 110,
      discount: 19,
      rating: 4.3,
      reviews: 980,
      image: "https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      manufacturer: "Sun Pharma",
      packSize: "Strip of 3 tablets",
      prescription: true,
      inStock: true,
      fastDelivery: false
    },
    {
      id: 4,
      name: "Vitamin D3 60K",
      genericName: "Cholecalciferol",
      category: "Vitamins",
      price: 45,
      mrp: 55,
      discount: 18,
      rating: 4.6,
      reviews: 1560,
      image: "https://images.pexels.com/photos/3683101/pexels-photo-3683101.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      manufacturer: "Mankind Pharma",
      packSize: "Strip of 4 capsules",
      prescription: false,
      inStock: true,
      fastDelivery: true
    },
    {
      id: 5,
      name: "Omeprazole 20mg",
      genericName: "Omeprazole",
      category: "Gastric",
      price: 35,
      mrp: 42,
      discount: 17,
      rating: 4.4,
      reviews: 1200,
      image: "https://images.pexels.com/photos/3683095/pexels-photo-3683095.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      manufacturer: "Dr. Reddy's",
      packSize: "Strip of 10 capsules",
      prescription: true,
      inStock: true,
      fastDelivery: true
    },
    {
      id: 6,
      name: "Cetrizine 10mg",
      genericName: "Cetirizine HCl",
      category: "Allergy",
      price: 28,
      mrp: 35,
      discount: 20,
      rating: 4.5,
      reviews: 890,
      image: "https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      manufacturer: "Lupin Ltd",
      packSize: "Strip of 10 tablets",
      prescription: false,
      inStock: true,
      fastDelivery: true
    }
  ];

  const categories = ['all', 'Pain Relief', 'Antibiotics', 'Vitamins', 'Gastric', 'Allergy', 'Diabetes', 'Heart'];

  const addToCart = (medicineId: number) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1
    }));
  };

  const removeFromCart = (medicineId: number) => {
    setCart(prev => {
      const newCart = {...prev};
      if (newCart[medicineId] > 1) {
        newCart[medicineId]--;
      } else {
        delete newCart[medicineId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [id, count]) => {
      const medicine = medicines.find(m => m.id === parseInt(id));
      return sum + (medicine ? medicine.price * count : 0);
    }, 0);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cartItems = Object.entries(cart).map(([id, count]) => ({
      medicine: medicines.find(m => m.id === parseInt(id)),
      quantity: count
    }));
    
    console.log('Order submitted:', {
      items: cartItems,
      total: getTotalPrice(),
      orderForm
    });
    
    alert(`Order placed successfully!\nTotal: ₹${getTotalPrice()}\nEstimated delivery: ${cartItems.some(item => item.medicine?.fastDelivery) ? '2-4 hours' : '1-2 days'}\nOrder confirmation will be sent to your phone.`);
    
    setOrderDialog(false);
    setCart({});
    setOrderForm({
      name: '',
      phoneNumber: '',
      email: '',
      address: '',
      pincode: '',
      prescriptionImage: null
    });
  };

  const filteredMedicines = medicines.filter(medicine => {
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const requiresPrescription = Object.entries(cart).some(([id]) => {
    const medicine = medicines.find(m => m.id === parseInt(id));
    return medicine?.prescription;
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
                <a href="/medicines" className="text-blue-600 font-medium px-3 py-2 border-b-2 border-blue-600">
                  Medicines
                </a>
                <a href="/lab-tests" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors">
                  Lab Tests
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={() => getTotalItems() > 0 && setOrderDialog(true)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart ({getTotalItems()})</span>
                </Button>
                {getTotalItems() > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Pill className="h-12 w-12 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold">Order Medicines</h1>
            </div>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Get genuine medicines delivered to your doorstep with fast delivery
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search medicines by name or generic name..."
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
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Genuine</h3>
              <p className="text-gray-600 text-sm">Authentic medicines from licensed pharmacies</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Express delivery in 2-4 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Packaging</h3>
              <p className="text-gray-600 text-sm">Safe and hygienic packaging</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">Hassle-free returns within 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Available Medicines ({filteredMedicines.length} items)
          </h2>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            All medicines are verified and sourced from licensed pharmacies
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {medicine.prescription && (
                    <Badge className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs">
                      Rx Required
                    </Badge>
                  )}
                  {medicine.fastDelivery && (
                    <Badge className="absolute top-2 left-2 bg-green-100 text-green-600 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Fast
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{medicine.name}</h3>
                  <p className="text-gray-600 text-xs">{medicine.genericName}</p>
                  <p className="text-gray-500 text-xs">{medicine.manufacturer}</p>
                  <p className="text-gray-500 text-xs">{medicine.packSize}</p>
                  
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-gray-600">{medicine.rating} ({medicine.reviews})</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">₹{medicine.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{medicine.mrp}</span>
                    <span className="text-xs text-green-600">{medicine.discount}% off</span>
                  </div>

                  {cart[medicine.id] ? (
                    <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromCart(medicine.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium">{cart[medicine.id]}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToCart(medicine.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(medicine.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-sm py-2"
                      disabled={!medicine.inStock}
                    >
                      {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Order Dialog */}
      <Dialog open={orderDialog} onOpenChange={setOrderDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold text-green-600">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Complete Your Order
            </DialogTitle>
          </DialogHeader>
          
          {/* Cart Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-3">Order Summary:</h4>
            <div className="space-y-2 text-sm">
              {Object.entries(cart).map(([id, count]) => {
                const medicine = medicines.find(m => m.id === parseInt(id));
                return medicine ? (
                  <div key={id} className="flex justify-between">
                    <span>{medicine.name} × {count}</span>
                    <span>₹{medicine.price * count}</span>
                  </div>
                ) : null;
              })}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>₹{getTotalPrice()}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  type="tel"
                  value={orderForm.phoneNumber}
                  onChange={(e) => setOrderForm({...orderForm, phoneNumber: e.target.value})}
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
                value={orderForm.email}
                onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter complete delivery address"
                value={orderForm.address}
                onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                placeholder="Enter pincode"
                value={orderForm.pincode}
                onChange={(e) => setOrderForm({...orderForm, pincode: e.target.value})}
                required
              />
            </div>

            {requiresPrescription && (
              <div className="space-y-2">
                <Label htmlFor="prescription">Upload Prescription *</Label>
                <Input
                  id="prescription"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setOrderForm({...orderForm, prescriptionImage: e.target.files?.[0] || null})}
                  required
                />
                <p className="text-xs text-red-600">
                  * Prescription required for some medicines in your cart
                </p>
              </div>
            )}

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-700 space-y-1">
                <p className="font-medium">✓ Express delivery available</p>
                <p className="font-medium">✓ Secure payment options</p>
                <p className="font-medium">✓ 100% genuine medicines</p>
                <p className="font-medium">✓ Easy returns within 7 days</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOrderDialog(false)}>
                Continue Shopping
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Place Order - ₹{getTotalPrice()}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

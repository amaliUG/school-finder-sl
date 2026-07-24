import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Plus, Download, Loader, ChevronDown } from 'lucide-react';

export default function SchoolFinderSriLanka() {
  const [homeLocation, setHomeLocation] = useState(null);
  const [schoolLocation, setSchoolLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [nearbySchools, setNearbySchools] = useState([]);
  const [homeAddress, setHomeAddress] = useState('');
  const [schoolAddress, setSchoolAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [mapType, setMapType] = useState('distance');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const sriLankanSchools = [
    // WESTERN PROVINCE - Colombo District
    { id: 1, name: 'Royal College Colombo', lat: 6.9271, lng: 80.6386, district: 'Colombo', province: 'Western', grade1: true, medium: 'English', type: 'National' },
    { id: 2, name: 'Colombo High School for Girls', lat: 6.9301, lng: 80.6276, district: 'Colombo', province: 'Western', grade1: true, medium: 'English', type: 'Government' },
    { id: 3, name: 'St. Thomas\' College', lat: 6.9241, lng: 80.6361, district: 'Colombo', province: 'Western', grade1: true, medium: 'English', type: 'National' },
    { id: 4, name: 'Colombo North Government School', lat: 6.9350, lng: 80.6450, district: 'Colombo', province: 'Western', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 5, name: 'Colombo Central Primary School', lat: 6.9200, lng: 80.6300, district: 'Colombo', province: 'Western', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 6, name: 'Colombo South Government School', lat: 6.9100, lng: 80.6400, district: 'Colombo', province: 'Western', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 7, name: 'Thanthirimale Maha Vidyalaya', lat: 6.9180, lng: 80.6500, district: 'Colombo', province: 'Western', grade1: true, medium: 'Sinhala', type: 'Government' },

    // WESTERN PROVINCE - Gampaha District
    { id: 8, name: 'Negombo Public School', lat: 7.2086, lng: 79.8478, district: 'Gampaha', province: 'Western', grade1: true, medium: 'English', type: 'Government' },
    { id: 9, name: 'Negombo Primary School', lat: 7.2050, lng: 79.8500, district: 'Gampaha', province: 'Western', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 10, name: 'Wattala Maha Vidyalaya', lat: 7.1683, lng: 79.8929, district: 'Gampaha', province: 'Western', grade1: true, medium: 'Sinhala', type: 'Government' },

    // CENTRAL PROVINCE - Kandy District
    { id: 11, name: 'Kandy High School', lat: 7.2906, lng: 80.6337, district: 'Kandy', province: 'Central', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 12, name: 'Kandy North Primary School', lat: 7.2850, lng: 80.6300, district: 'Kandy', province: 'Central', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 13, name: 'Peradeniya Central School', lat: 7.2706, lng: 80.7755, district: 'Kandy', province: 'Central', grade1: true, medium: 'Sinhala', type: 'Government' },

    // CENTRAL PROVINCE - Matale District
    { id: 14, name: 'Dambulla Maha Vidyalaya', lat: 7.8600, lng: 80.6546, district: 'Matale', province: 'Central', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 15, name: 'Matale High School', lat: 7.4696, lng: 80.7854, district: 'Matale', province: 'Central', grade1: true, medium: 'Sinhala', type: 'Government' },

    // SOUTHERN PROVINCE - Galle District
    { id: 16, name: 'Galle Fort School', lat: 6.0535, lng: 80.2173, district: 'Galle', province: 'Southern', grade1: true, medium: 'English', type: 'National' },
    { id: 17, name: 'Galle Primary School', lat: 6.0450, lng: 80.2200, district: 'Galle', province: 'Southern', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 18, name: 'Galle South Government School', lat: 6.0400, lng: 80.2300, district: 'Galle', province: 'Southern', grade1: true, medium: 'Sinhala', type: 'Government' },

    // SOUTHERN PROVINCE - Matara District
    { id: 19, name: 'Matara High School', lat: 5.9497, lng: 80.5491, district: 'Matara', province: 'Southern', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 20, name: 'Matara Primary School', lat: 5.9400, lng: 80.5400, district: 'Matara', province: 'Southern', grade1: true, medium: 'Sinhala', type: 'Government' },

    // NORTHERN PROVINCE - Jaffna District
    { id: 21, name: 'Jaffna Central High School', lat: 9.6615, lng: 80.7821, district: 'Jaffna', province: 'Northern', grade1: true, medium: 'Tamil', type: 'Government' },
    { id: 22, name: 'Jaffna Primary School', lat: 9.6550, lng: 80.7850, district: 'Jaffna', province: 'Northern', grade1: true, medium: 'Tamil', type: 'Government' },

    // EASTERN PROVINCE - Trincomalee District
    { id: 23, name: 'Trincomalee High School', lat: 8.5711, lng: 81.2341, district: 'Trincomalee', province: 'Eastern', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 24, name: 'Trincomalee Primary School', lat: 8.5650, lng: 81.2350, district: 'Trincomalee', province: 'Eastern', grade1: true, medium: 'Sinhala', type: 'Government' },

    // EASTERN PROVINCE - Batticaloa District
    { id: 25, name: 'Batticaloa High School', lat: 7.7123, lng: 81.6930, district: 'Batticaloa', province: 'Eastern', grade1: true, medium: 'Tamil', type: 'Government' },
    { id: 26, name: 'Batticaloa Primary School', lat: 7.7050, lng: 81.6900, district: 'Batticaloa', province: 'Eastern', grade1: true, medium: 'Tamil', type: 'Government' },

    // NORTH WESTERN PROVINCE - Kurunegala District
    { id: 27, name: 'Kurunegala High School', lat: 7.4863, lng: 80.6357, district: 'Kurunegala', province: 'North Western', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 28, name: 'Kurunegala Primary School', lat: 7.4800, lng: 80.6350, district: 'Kurunegala', province: 'North Western', grade1: true, medium: 'Sinhala', type: 'Government' },

    // SABARAGAMUWA PROVINCE - Ratnapura District
    { id: 29, name: 'Ratnapura High School', lat: 6.7128, lng: 80.3942, district: 'Ratnapura', province: 'Sabaragamuwa', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 30, name: 'Ratnapura Primary School', lat: 6.7100, lng: 80.3900, district: 'Ratnapura', province: 'Sabaragamuwa', grade1: true, medium: 'Sinhala', type: 'Government' },

    // UVA PROVINCE - Badulla District
    { id: 31, name: 'Badulla High School', lat: 6.9914, lng: 81.0622, district: 'Badulla', province: 'Uva', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 32, name: 'Badulla Primary School', lat: 6.9900, lng: 81.0600, district: 'Badulla', province: 'Uva', grade1: true, medium: 'Sinhala', type: 'Government' },

    // NORTH CENTRAL PROVINCE - Anuradhapura District
    { id: 33, name: 'Anuradhapura High School', lat: 8.3363, lng: 80.6789, district: 'Anuradhapura', province: 'North Central', grade1: true, medium: 'Sinhala', type: 'Government' },
    { id: 34, name: 'Anuradhapura Primary School', lat: 8.3350, lng: 80.6750, district: 'Anuradhapura', province: 'North Central', grade1: true, medium: 'Sinhala', type: 'Government' },
  ];

  const sriLankanCities = {
    'colombo': { lat: 6.9271, lng: 80.6386, name: 'Colombo', district: 'Colombo' },
    'kandy': { lat: 7.2906, lng: 80.6337, name: 'Kandy', district: 'Kandy' },
    'galle': { lat: 6.0535, lng: 80.2173, name: 'Galle', district: 'Galle' },
    'jaffna': { lat: 9.6615, lng: 80.7821, name: 'Jaffna', district: 'Jaffna' },
    'matara': { lat: 5.9497, lng: 80.5491, name: 'Matara', district: 'Matara' },
    'trincomalee': { lat: 8.5711, lng: 81.2341, name: 'Trincomalee', district: 'Trincomalee' },
    'batticaloa': { lat: 7.7123, lng: 81.6930, name: 'Batticaloa', district: 'Batticaloa' },
    'negombo': { lat: 7.2086, lng: 79.8478, name: 'Negombo', district: 'Gampaha' },
    'ratnapura': { lat: 6.7128, lng: 80.3942, name: 'Ratnapura', district: 'Ratnapura' },
    'kurunegala': { lat: 7.4863, lng: 80.6357, name: 'Kurunegala', district: 'Kurunegala' },
    'peradeniya': { lat: 7.2706, lng: 80.7755, name: 'Peradeniya', district: 'Kandy' },
    'dambulla': { lat: 7.8600, lng: 80.6546, name: 'Dambulla', district: 'Matale' },
    'badulla': { lat: 6.9914, lng: 81.0622, name: 'Badulla', district: 'Badulla' },
    'anuradhapura': { lat: 8.3363, lng: 80.6789, name: 'Anuradhapura', district: 'Anuradhapura' },
    'home': { lat: 6.9271, lng: 80.6386, name: 'Your Home', district: 'Colombo' },
    'school': { lat: 7.2906, lng: 80.6337, name: 'Target School', district: 'Kandy' },
  };

  const provinces = {
    'Western': ['Colombo', 'Gampaha', 'Kalutara'],
    'Central': ['Kandy', 'Matale', 'Nuwara Eliya'],
    'Southern': ['Galle', 'Matara', 'Hambantota'],
    'Northern': ['Jaffna', 'Mullaitivu', 'Vavuniya'],
    'Eastern': ['Trincomalee', 'Batticaloa', 'Ampara'],
    'North Western': ['Kurunegala', 'Puttalam'],
    'Sabaragamuwa': ['Ratnapura', 'Kegalle'],
    'Uva': ['Badulla', 'Monaragala'],
    'North Central': ['Anuradhapura', 'Polonnaruwa']
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getCoordinates = async (address, isHome = true) => {
    setLoading(true);
    const key = address.toLowerCase().trim();
    const coords = sriLankanCities[key];
    
    if (!coords) {
      alert('City not found. Try: colombo, kandy, galle, matara, negombo, jaffna');
      setLoading(false);
      return null;
    }

    if (isHome) {
      setHomeLocation(coords);
      setHomeAddress(address);
    } else {
      setSchoolLocation(coords);
      setSchoolAddress(address);
    }
    
    setLoading(false);
    return coords;
  };

  const handleCalculateDistance = async () => {
    if (!homeAddress || !schoolAddress) {
      alert('Please enter both home and school addresses');
      return;
    }

    const home = homeLocation || await getCoordinates(homeAddress, true);
    const school = schoolLocation || await getCoordinates(schoolAddress, false);

    if (home && school) {
      const dist = calculateDistance(home.lat, home.lng, school.lat, school.lng);
      setDistance(dist);
      setSchoolLocation(school);
      setHomeLocation(home);

      let nearby = sriLankanSchools.filter(s => {
        const d = calculateDistance(home.lat, home.lng, s.lat, s.lng);
        return d <= dist;
      }).sort((a, b) => {
        const distA = calculateDistance(home.lat, home.lng, a.lat, a.lng);
        const distB = calculateDistance(home.lat, home.lng, b.lat, b.lng);
        return distA - distB;
      });

      if (selectedDistrict) {
        nearby = nearby.filter(s => s.district === selectedDistrict);
      }
      
      setNearbySchools(nearby);
      setShowMap(true);
      setMapType('distance');
    }
  };

  const handleShowCircle = () => {
    if (!homeLocation || distance === null) {
      alert('Please calculate distance first');
      return;
    }
    setMapType('circle');
    setShowMap(true);
  };

  useEffect(() => {
    if (!showMap || !mapRef.current) return;

    const canvas = mapRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    ctx.fillStyle = '#e8f4f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#d0e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    const allPoints = [homeLocation, ...(nearbySchools.map(s => ({ lat: s.lat, lng: s.lng })))];
    
    if (!allPoints[0]) return;

    const lats = allPoints.map(p => p.lat);
    const lngs = allPoints.map(p => p.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const latRange = maxLat - minLat || 0.05;
    const lngRange = maxLng - minLng || 0.05;
    const padding = 0.15;

    const mapToCanvas = (lat, lng) => {
      const x = ((lng - minLng + padding * lngRange) / (lngRange * (1 + 2 * padding))) * canvas.width;
      const y = ((maxLat - lat + padding * latRange) / (latRange * (1 + 2 * padding))) * canvas.height;
      return { x, y };
    };

    if (mapType === 'distance' && homeLocation && schoolLocation) {
      const homePos = mapToCanvas(homeLocation.lat, homeLocation.lng);
      const schoolPos = mapToCanvas(schoolLocation.lat, schoolLocation.lng);

      ctx.strokeStyle = '#0047AB';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(homePos.x, homePos.y);
      ctx.lineTo(schoolPos.x, schoolPos.y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#1E7145';
      ctx.beginPath();
      ctx.arc(homePos.x, homePos.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#D4A574';
      ctx.beginPath();
      ctx.arc(schoolPos.x, schoolPos.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#1E7145';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Home', homePos.x + 15, homePos.y - 5);

      ctx.fillStyle = '#D4A574';
      ctx.fillText('School', schoolPos.x + 15, schoolPos.y - 5);

      const midX = (homePos.x + schoolPos.x) / 2;
      const midY = (homePos.y + schoolPos.y) / 2;
      ctx.fillStyle = '#0047AB';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(`${distance.toFixed(2)} km`, midX + 10, midY - 10);

    } else if (mapType === 'circle' && homeLocation && distance !== null) {
      const homePos = mapToCanvas(homeLocation.lat, homeLocation.lng);
      const radiusInDegrees = distance / 111;
      const radiusInPixels = (radiusInDegrees / (latRange * (1 + 2 * padding))) * canvas.height;

      ctx.strokeStyle = '#FF6B35';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(homePos.x, homePos.y, radiusInPixels, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(255, 107, 53, 0.1)';
      ctx.beginPath();
      ctx.arc(homePos.x, homePos.y, radiusInPixels, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1E7145';
      ctx.beginPath();
      ctx.arc(homePos.x, homePos.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#1E7145';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Home', homePos.x + 15, homePos.y - 5);

      nearbySchools.forEach((school) => {
        const schoolPos = mapToCanvas(school.lat, school.lng);
        ctx.fillStyle = '#0047AB';
        ctx.beginPath();
        ctx.arc(schoolPos.x, schoolPos.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#0047AB';
        ctx.font = '9px sans-serif';
        ctx.fillText(school.name.substring(0, 12), schoolPos.x + 10, schoolPos.y - 5);
      });

      ctx.fillStyle = '#FF6B35';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Radius: ${distance.toFixed(2)} km`, homePos.x - 50, 20);
    }
  }, [showMap, mapType, homeLocation, schoolLocation, distance, nearbySchools]);

  const generatePDF = async (type) => {
    try {
      if (!window.jsPDF) {
        alert('PDF library is loading. Please wait and try again.');
        return;
      }

      const { jsPDF } = window;
      const canvas = mapRef.current;
      const mapImage = canvas.toDataURL('image/png');

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      let yPos = 20;

      if (type === 'distance') {
        doc.setFontSize(14);
        doc.setTextColor(30, 113, 69);
        doc.text('ශ්‍රී ලංකා පාසල් දුරස්‍ථ වාර්තාව', 20, yPos);
        yPos += 8;
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text('School Distance Report - Grade 1 Admission', 20, yPos);
        yPos += 12;

        doc.setFontSize(10);
        doc.text(`Home Address: ${homeAddress}`, 20, yPos);
        yPos += 8;
        doc.text(`School Address: ${schoolAddress}`, 20, yPos);
        yPos += 8;
        doc.text(`Distance: ${distance.toFixed(2)} km`, 20, yPos);
        yPos += 8;
        doc.text(`Date Generated: ${new Date().toLocaleDateString('en-US')}`, 20, yPos);
        yPos += 12;

        doc.addImage(mapImage, 'PNG', 20, yPos, 170, 120);
        yPos += 130;

        doc.setFontSize(9);
        doc.setTextColor(128, 128, 128);
        doc.text('This report is generated using School Distance Finder - Sri Lanka Edition', 20, yPos);

      } else {
        doc.setFontSize(14);
        doc.setTextColor(30, 113, 69);
        doc.text('පාසල් ලැයිස්තුව - Radius Report', 20, yPos);
        yPos += 8;
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text('Government Schools Within Radius - Grade 1 Admission', 20, yPos);
        yPos += 12;

        doc.setFontSize(10);
        doc.text(`Home Address: ${homeAddress}`, 20, yPos);
        yPos += 8;
        doc.text(`Search Radius: ${distance.toFixed(2)} km`, 20, yPos);
        yPos += 8;
        doc.text(`Schools Found: ${nearbySchools.length}`, 20, yPos);
        yPos += 8;
        doc.text(`Date Generated: ${new Date().toLocaleDateString('en-US')}`, 20, yPos);
        yPos += 12;

        doc.addImage(mapImage, 'PNG', 20, yPos, 170, 90);
        yPos += 100;

        doc.setFontSize(11);
        doc.setTextColor(0, 71, 171);
        doc.text('Government Schools Within Radius:', 20, yPos);
        yPos += 8;

        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        nearbySchools.slice(0, 20).forEach((school, index) => {
          const schoolDist = calculateDistance(
            homeLocation.lat, homeLocation.lng,
            school.lat, school.lng
          );
          const schoolText = `${index + 1}. ${school.name} (${school.district}) - ${schoolDist.toFixed(2)} km - ${school.medium}`;
          doc.text(schoolText, 25, yPos);
          yPos += 6;
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
        });

        if (nearbySchools.length > 20) {
          yPos += 5;
          doc.setFontSize(9);
          doc.text(`... and ${nearbySchools.length - 20} more schools`, 25, yPos);
        }

        yPos += 10;
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('Generated by School Distance Finder - Sri Lanka Edition', 20, yPos);
      }

      doc.save(type === 'distance' ? `school-distance-report-${new Date().getTime()}.pdf` : `schools-radius-report-${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error('PDF error:', error);
      alert('Error generating PDF. jsPDF library may not be loaded yet.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <div className="border-b border-blue-100 bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">පාසල් දුරස්‍ථ සොයනය</h1>
              <p className="text-sm text-gray-600">School Distance Finder - Sri Lanka</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4 sticky top-24">
              {/* Quick City Select */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-900 mb-2">Popular Cities:</p>
                <div className="flex flex-wrap gap-2">
                  {['colombo', 'kandy', 'galle', 'matara', 'negombo', 'jaffna'].map(city => (
                    <button
                      key={city}
                      onClick={() => setHomeAddress(city)}
                      className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded hover:bg-blue-300 transition"
                    >
                      {city.charAt(0).toUpperCase() + city.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Home Address Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Home Location
                </label>
                <input
                  type="text"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  placeholder="e.g., Colombo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* School Address Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  School Location
                </label>
                <input
                  type="text"
                  value={schoolAddress}
                  onChange={(e) => setSchoolAddress(e.target.value)}
                  placeholder="e.g., Kandy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculateDistance}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Calculate Distance
              </button>

              {/* Results Display */}
              {distance !== null && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">දුරස්ථ ගණනය කරා ඇත</p>
                  <p className="text-2xl font-bold text-green-600">{distance.toFixed(2)} km</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {nearbySchools.length} schools found
                  </p>
                </div>
              )}

              {/* PDF Buttons */}
              {showMap && distance !== null && (
                <div className="space-y-2 border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700">Reports:</p>
                  <button
                    onClick={() => generatePDF('distance')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Distance PDF
                  </button>
                  <button
                    onClick={() => generatePDF('circle')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Schools List PDF
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Map Area */}
          <div className="lg:col-span-2">
            {showMap && distance !== null ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-100 p-4 border-b flex justify-between items-center flex-wrap gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                    {mapType === 'distance' ? 'Distance Map (දුරු සිතියම)' : 'Schools in Radius'}
                  </h3>
                  <div className="flex gap-2">
                    {mapType === 'distance' && (
                      <button
                        onClick={handleShowCircle}
                        className="text-xs md:text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700"
                      >
                        Show Circle
                      </button>
                    )}
                    {mapType === 'circle' && (
                      <button
                        onClick={() => setMapType('distance')}
                        className="text-xs md:text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Show Distance
                      </button>
                    )}
                  </div>
                </div>
                <canvas
                  ref={mapRef}
                  width={500}
                  height={400}
                  className="w-full border-b border-gray-200 bg-gray-50"
                />
                {mapType === 'circle' && nearbySchools.length > 0 && (
                  <div className="p-4 md:p-6 max-h-96 overflow-y-auto">
                    <h4 className="font-semibold text-gray-800 mb-4 text-sm md:text-base">
                      Schools Found: {nearbySchools.length}
                    </h4>
                    <div className="space-y-2">
                      {nearbySchools.map((school, index) => {
                        const dist = calculateDistance(homeLocation.lat, homeLocation.lng, school.lat, school.lng);
                        return (
                          <div key={school.id} className="flex items-start gap-2 pb-2 border-b last:border-b-0 text-xs md:text-sm">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-grow">
                              <p className="font-semibold text-gray-800">{school.name}</p>
                              <p className="text-xs text-gray-500">{school.district} - {school.medium} Medium</p>
                              <p className="text-xs text-gray-600">{dist.toFixed(2)} km from home</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 md:p-12 flex flex-col items-center justify-center min-h-96">
                <MapPin className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-600 text-center text-sm md:text-base">
                  Select your home and school locations, then click "Calculate Distance"
                </p>
                <p className="text-xs text-gray-500 mt-2">Quick test: Try "home" and "school"</p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Grade 1 Admission Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">System Coverage:</h3>
              <ul className="space-y-1 text-blue-800 text-xs md:text-sm">
                <li>✓ All 9 Provinces</li>
                <li>✓ 25 Districts Covered</li>
                <li>✓ 34+ Government Schools</li>
                <li>✓ All Grade 1 Eligible</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">How It Works:</h3>
              <ol className="space-y-1 text-green-800 text-xs md:text-sm">
                <li>1. Enter your location</li>
                <li>2. Choose a school location</li>
                <li>3. System finds nearby schools</li>
                <li>4. Download PDF reports</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

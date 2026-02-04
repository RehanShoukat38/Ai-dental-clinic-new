
import React from 'react';
import { Shield, Sparkles, HeartPulse, UserRound, Baby, Clock } from 'lucide-react';
import { Service, Testimonial } from './types';

export const CLINIC_INFO = {
  name: "My Dentist",
  slogan: "Helping the Nation to Smile",
  phone: "+1 (555) 123-4567",
  email: "care@mydentist.com",
  address: "123 Smile Boulevard, Health City, Dental State 56789",
  hours: {
    weekdays: "8:00 AM - 7:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "Emergency Only"
  }
};

export const SERVICES: Service[] = [
  {
    id: 'general',
    title: 'General Dentistry',
    description: 'Comprehensive check-ups, cleanings, and preventative care for the whole family.',
    icon: 'Shield'
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments for a brighter, more confident smile.',
    icon: 'Sparkles'
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Permanent, natural-looking solutions for missing teeth using advanced technology.',
    icon: 'HeartPulse'
  },
  {
    id: 'braces',
    title: 'Orthodontics',
    description: 'Braces and clear aligners to straighten your teeth and improve your bite.',
    icon: 'UserRound'
  },
  {
    id: 'kids',
    title: 'Pediatric Care',
    description: 'Gentle and fun dental care specially designed for children of all ages.',
    icon: 'Baby'
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    description: 'Rapid response for toothaches, accidents, and other urgent dental needs.',
    icon: 'Clock'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Parent',
    content: 'The staff is incredible with kids! My son used to be terrified of dentists, but now he actually looks forward to his visits.',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Local Business Owner',
    content: 'Modern equipment and professional service. The whitening treatment I received was top-notch and results were visible immediately.',
    rating: 5
  }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-8 h-8 text-sky-600" />,
  Sparkles: <Sparkles className="w-8 h-8 text-sky-600" />,
  HeartPulse: <HeartPulse className="w-8 h-8 text-sky-600" />,
  UserRound: <UserRound className="w-8 h-8 text-sky-600" />,
  Baby: <Baby className="w-8 h-8 text-sky-600" />,
  Clock: <Clock className="w-8 h-8 text-sky-600" />
};

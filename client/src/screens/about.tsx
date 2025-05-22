import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Search,
  Shield,
  Clock,
  CheckCircle,
  Award,
  ThumbsUp,
  MapPin,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            Chatrabash
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="font-medium text-gray-900 hover:text-emerald-600"
            >
              Home
            </Link>
            <Link
              to="/listings"
              className="font-medium text-gray-900 hover:text-emerald-600"
            >
              Listings
            </Link>
            <Link
              to="/about"
              className="font-medium text-emerald-600 border-b-2 border-emerald-600"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="font-medium text-gray-900 hover:text-emerald-600"
            >
              Contact
            </Link>
          </nav>
          <div className="flex space-x-3">
            <Button variant="outline">Login</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Chatrabash
          </h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            We're on a mission to make finding rental properties simple,
            transparent, and stress-free.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-6">
                Chatrabash was founded in 2018 with a simple goal: to transform
                the rental property market in Bangladesh. We recognized the
                challenges that both property owners and tenants faced in the
                traditional rental process - from lack of transparency to
                inefficient communication and limited options.
              </p>
              <p className="text-gray-700 mb-6">
                Our founders, having experienced these frustrations firsthand,
                decided to create a platform that would leverage technology to
                connect property owners with potential tenants in a seamless,
                transparent manner.
              </p>
              <p className="text-gray-700">
                Today, Chatrabash has grown to become the leading rental
                property platform in Bangladesh, with thousands of listings
                across major cities and a growing community of satisfied users.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://kzml236cx750tlp0qezr.lite.vusercontent.net/placeholder.svg?height=400&width=600"
                alt="Chatrabash Team"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
            To revolutionize the rental property market by creating a
            transparent, efficient platform that empowers both property owners
            and tenants.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Simplify the Search
                </h3>
                <p className="text-gray-600">
                  We make it easy to find the perfect rental property with our
                  comprehensive listings and powerful search tools.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Build Trust</h3>
                <p className="text-gray-600">
                  We foster trust between property owners and tenants through
                  verified listings and transparent communication.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Connect People</h3>
                <p className="text-gray-600">
                  We connect property owners with the right tenants, creating
                  mutually beneficial relationships.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose Chatrabash
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Verified Listings
                </h3>
                <p className="text-gray-600">
                  All our listings are verified by our team to ensure accuracy
                  and authenticity, giving you peace of mind during your
                  property search.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Clock className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
                <p className="text-gray-600">
                  Our platform streamlines the rental process, saving you
                  valuable time in finding or listing properties.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Quality Selection
                </h3>
                <p className="text-gray-600">
                  We curate high-quality properties across various price ranges
                  to ensure you find the perfect match for your needs.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <ThumbsUp className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
                <p className="text-gray-600">
                  Our intuitive platform is designed to make your property
                  search or listing experience as smooth as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">5,000+</p>
              <p className="text-lg">Active Listings</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">10,000+</p>
              <p className="text-lg">Happy Tenants</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">2,000+</p>
              <p className="text-lg">Property Owners</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">5</p>
              <p className="text-lg">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="h-48 w-48 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-emerald-600 mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Coverage</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cities.map((city, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={
                        city.image ||
                        "https://kzml236cx750tlp0qezr.lite.vusercontent.net/placeholder.svg?height=400&width=600"
                      }
                      alt={city.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-5 w-5 text-emerald-600 mr-2" />
                      <h3 className="text-xl font-semibold">{city.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{city.description}</p>
                    <p className="text-sm text-gray-500">
                      {city.listings} active listings
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who have found their ideal rental
            property through Chatrabash.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="default"
              className="bg-white text-emerald-600 hover:bg-gray-100"
            >
              Browse Listings
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-emerald-700"
            >
              List Your Property
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Chatrabash</h3>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect rental property.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings"
                    className="text-gray-400 hover:text-white"
                  >
                    Listings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Popular Areas</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/listings?location=dhanmondi"
                    className="text-gray-400 hover:text-white"
                  >
                    Dhanmondi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?location=gulshan"
                    className="text-gray-400 hover:text-white"
                  >
                    Gulshan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?location=banani"
                    className="text-gray-400 hover:text-white"
                  >
                    Banani
                  </Link>
                </li>
                <li>
                  <Link
                    href="/listings?location=uttara"
                    className="text-gray-400 hover:text-white"
                  >
                    Uttara
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <address className="text-gray-400 not-italic">
                <p>123 Main Street</p>
                <p>Dhaka, Bangladesh</p>
                <p className="mt-2">Email: info@chatrabash.com</p>
                <p>Phone: +880 1234 567890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Chatrabash. All rights reserved.
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

// Sample data
const teamMembers = [
  {
    name: "Rahim Ahmed",
    position: "CEO & Founder",
    bio: "With over 15 years of experience in real estate, Rahim founded Chatrabash to revolutionize the rental market in Bangladesh.",
    image:
      "https://kzml236cx750tlp0qezr.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  },
  {
    name: "Nusrat Khan",
    position: "COO",
    bio: "Nusrat oversees the day-to-day operations of Chatrabash, ensuring smooth experiences for both property owners and tenants.",
    image:
      "https://kzml236cx750tlp0qezr.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  },
  {
    name: "Kamal Hossain",
    position: "CTO",
    bio: "Kamal leads our technology team, developing innovative solutions to make property searching and listing easier than ever.",
    image:
      "https://kzml236cx750tlp0qezr.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  },
  {
    name: "Farida Rahman",
    position: "Marketing Director",
    bio: "Farida drives our marketing strategies, helping connect property owners with potential tenants across Bangladesh.",
    image:
      "https://kzml236cx750tlp0qezr.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  },
];

const cities = [
  {
    name: "Dhaka",
    description:
      "The capital city with a wide range of rental options from luxury apartments to affordable housing.",
    listings: 3200,
    image:
      "https://kzml236cx750tlp0qezr.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  },
  {
    name: "Chittagong",
    description:
      "The port city offers beautiful properties with scenic views and modern amenities.",
    listings: 1500,
    image:
      "https://kzml236cx750tlp0qezr.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  },
  {
    name: "Sylhet",
    description:
      "Known for its natural beauty, Sylhet offers serene living spaces surrounded by lush greenery.",
    listings: 800,
    image:
      "https://kzml236cx750tlp0qezr.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  },
];

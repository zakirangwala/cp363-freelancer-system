import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";

// interface for service data structure
interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  freelancer: {
    id: number;
    name: string;
    freelancerOrigin: string;
    yearsOfExperience: number;
  };
}

const HirePage: NextPage = () => {
  // state management for services and ui
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // filter services based on search term
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.freelancer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // handle service selection
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  // handle adding service to cart and checkout
  const handleAddToCart = async () => {
    if (!selectedService) return;
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      console.log("Starting cart creation process...");

      // create new cart for user
      const cartResponse = await axios.post("/api/cart", {
        userId: 1, // For MVP, we'll use a default user
      });
      console.log("Cart creation response:", cartResponse.data);

      if (!cartResponse.data || !cartResponse.data.id) {
        console.error(
          "Cart creation failed - Invalid response:",
          cartResponse.data
        );
        throw new Error("Failed to create cart");
      }

      // add selected service to cart
      console.log("Adding item to cart...");
      const cartItemResponse = await axios.post("/api/cart-items", {
        cartId: cartResponse.data.id,
        serviceId: selectedService.id,
        quantity: 1,
      });
      console.log("Cart item creation response:", cartItemResponse.data);

      if (!cartItemResponse.data) {
        console.error(
          "Cart item creation failed - Invalid response:",
          cartItemResponse.data
        );
        throw new Error("Failed to add item to cart");
      }

      console.log("Fetching updated cart...");
      // Wait for cart to be updated before redirecting
      const updatedCartResponse = await axios.get("/api/cart");
      console.log("Updated cart response:", updatedCartResponse.data);

      const latestCart =
        updatedCartResponse.data[updatedCartResponse.data.length - 1];
      console.log("Latest cart:", latestCart);
      console.log("Latest cart items:", latestCart?.items);

      if (latestCart?.items?.length > 0) {
        console.log("Cart successfully updated, redirecting to checkout...");
        window.location.href = "/checkout";
      } else {
        console.error("Cart update verification failed:", {
          latestCart,
          items: latestCart?.items,
          cartId: cartResponse.data.id,
        });
        throw new Error("Cart was not properly updated");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      console.error("Full error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        response: (error as { response?: { data: unknown; status: number } })
          ?.response?.data,
        status: (error as { response?: { data: unknown; status: number } })
          ?.response?.status,
      });
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Hire Freelancers - Freelancer System</title>
        <meta name="description" content="Find and hire freelancers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find the Perfect Service
          </h1>
          <p className="text-lg text-gray-600">
            Browse through our collection of professional services
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for services, freelancers, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-black"
            />
            <svg
              className="absolute right-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center text-gray-600">
              Loading services...
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              No services found matching your search.
            </div>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                  selectedService?.id === service.id
                    ? "ring-2 ring-violet-500"
                    : ""
                }`}
                onClick={() => handleServiceSelect(service)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center">
                        <span className="text-violet-600 font-medium">
                          {service.freelancer.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {service.freelancer.name}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-violet-600">
                      ${service.price}
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>Origin: {service.freelancer.freelancerOrigin}</p>
                    <p>
                      Experience: {service.freelancer.yearsOfExperience} years
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating Action Button for selected service */}
        {selectedService && (
          <div className="fixed bottom-8 right-8 left-8 md:left-auto md:w-auto">
            <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 flex items-center justify-between md:space-x-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {selectedService.name}
                </h4>
                <p className="text-violet-600 font-bold">
                  ${selectedService.price}
                </p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isProcessing}
                className={`${
                  isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-violet-600 hover:bg-violet-700"
                } text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2`}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HirePage;

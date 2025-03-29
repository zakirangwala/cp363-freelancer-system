import React, { useEffect, useState } from "react";
import axios from "axios";

interface Freelancer {
  id: number;
  name: string;
  freelancerOrigin: string | null;
  yearsOfExperience: number | null;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  freelancerID: number;
  freelancer: Freelancer;
}

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    freelancerID: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/services", formData);
      setFormData({ name: "", description: "", price: "", freelancerID: "" });
      fetchServices();
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">
        Service Management
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Service Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 border rounded text-blue-500 placeholder-blue-300"
            required
          />
          <textarea
            placeholder="Service Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="p-2 border rounded text-blue-500 placeholder-blue-300"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="p-2 border rounded text-blue-500 placeholder-blue-300"
            required
          />
          <input
            type="number"
            placeholder="Freelancer ID"
            value={formData.freelancerID}
            onChange={(e) =>
              setFormData({ ...formData, freelancerID: e.target.value })
            }
            className="p-2 border rounded text-blue-500 placeholder-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Service
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2 text-blue-500">
          Service List
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {services.map((service) => (
            <div key={service.id} className="p-4 border rounded shadow">
              <p className="font-medium text-blue-500">{service.name}</p>
              <p className="text-blue-400">{service.description}</p>
              <p className="text-blue-400">Price: ${service.price}</p>
              <p className="text-blue-400">
                Freelancer: {service.freelancer.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;

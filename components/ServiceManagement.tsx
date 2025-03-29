import React, { useEffect, useState } from "react";
import axios from "axios";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  freelancerId: number;
}

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    freelancerId: "",
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
      await axios.post("/api/services", {
        ...formData,
        price: parseFloat(formData.price),
        freelancerId: parseInt(formData.freelancerId),
      });
      setFormData({ title: "", description: "", price: "", freelancerId: "" });
      fetchServices();
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Service Management</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Service Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Service Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Freelancer ID"
            value={formData.freelancerId}
            onChange={(e) =>
              setFormData({ ...formData, freelancerId: e.target.value })
            }
            className="p-2 border rounded"
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
        <h3 className="text-xl font-semibold mb-2">Service List</h3>
        <div className="grid grid-cols-1 gap-4">
          {services.map((service) => (
            <div key={service.id} className="p-4 border rounded shadow">
              <h4 className="font-medium text-lg">{service.title}</h4>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-blue-600 font-semibold mt-2">
                ${service.price}
              </p>
              <p className="text-sm text-gray-500">
                Freelancer ID: {service.freelancerId}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;

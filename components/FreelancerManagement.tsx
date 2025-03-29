import React, { useEffect, useState } from "react";
import axios from "axios";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface Freelancer {
  id: number;
  name: string;
  freelancerOrigin: string | null;
  yearsOfExperience: number | null;
  services: Service[];
}

const FreelancerManagement: React.FC = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    freelancerOrigin: "",
    yearsOfExperience: "",
  });

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const response = await axios.get("/api/freelancers");
      setFreelancers(response.data);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/freelancers", formData);
      setFormData({ name: "", freelancerOrigin: "", yearsOfExperience: "" });
      fetchFreelancers();
    } catch (error) {
      console.error("Error creating freelancer:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">
        Freelancer Management
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-2 border rounded text-blue-500 placeholder-blue-300"
            required
          />
          <input
            type="text"
            placeholder="Origin (Optional)"
            value={formData.freelancerOrigin}
            onChange={(e) =>
              setFormData({ ...formData, freelancerOrigin: e.target.value })
            }
            className="p-2 border rounded text-blue-500 placeholder-blue-300"
          />
          <input
            type="number"
            placeholder="Years of Experience"
            value={formData.yearsOfExperience}
            onChange={(e) =>
              setFormData({ ...formData, yearsOfExperience: e.target.value })
            }
            className="p-2 border rounded text-blue-500 placeholder-blue-300"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Freelancer
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2 text-blue-500">
          Freelancer List
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {freelancers.map((freelancer) => (
            <div key={freelancer.id} className="p-4 border rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-blue-500">{freelancer.name}</p>
                  {freelancer.freelancerOrigin && (
                    <p className="text-blue-400">
                      Origin: {freelancer.freelancerOrigin}
                    </p>
                  )}
                  {freelancer.yearsOfExperience && (
                    <p className="text-blue-400">
                      Experience: {freelancer.yearsOfExperience} years
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-400">
                    Services: {freelancer.services.length}
                  </p>
                </div>
              </div>
              {freelancer.services.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium text-blue-500">Services:</p>
                  <ul className="list-disc list-inside">
                    {freelancer.services.map((service) => (
                      <li key={service.id} className="text-blue-400">
                        {service.name} - ${service.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreelancerManagement;

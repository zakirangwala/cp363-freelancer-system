import React, { useEffect, useState } from "react";
import axios from "axios";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface CartItem {
  id: number;
  quantity: number;
  service: Service;
  cartId: number;
}

interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
}

interface User {
  id: number;
  name: string;
}

const CartManagement: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
  const [formData, setFormData] = useState({
    userId: "",
    serviceId: "",
    quantity: "1",
  });

  useEffect(() => {
    fetchCarts();
    fetchUsers();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await axios.get("/api/cart");
      setCarts(response.data);
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateCart = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/cart", { userId: parseInt(formData.userId) });
      setFormData({ userId: "", serviceId: "", quantity: "1" });
      fetchCarts();
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCart) return;

    try {
      await axios.post("/api/cart-items", {
        cartId: selectedCart.id,
        serviceId: parseInt(formData.serviceId),
        quantity: parseInt(formData.quantity),
      });
      setFormData({ userId: "", serviceId: "", quantity: "1" });
      fetchCarts();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    try {
      await axios.put(`/api/cart-items`, {
        id: itemId,
        quantity: newQuantity,
      });
      fetchCarts();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      await axios.delete(`/api/cart-items?id=${itemId}`);
      fetchCarts();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Cart Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-500">
            Create New Cart
          </h3>
          <form onSubmit={handleCreateCart} className="mb-8">
            <select
              value={formData.userId}
              onChange={(e) =>
                setFormData({ ...formData, userId: e.target.value })
              }
              className="w-full p-2 border rounded text-blue-500 mb-4"
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Cart
            </button>
          </form>

          <h3 className="text-xl font-semibold mb-2 text-blue-500">Carts</h3>
          <div className="space-y-4">
            {carts.map((cart) => (
              <div
                key={cart.id}
                className={`p-4 border rounded shadow cursor-pointer ${
                  selectedCart?.id === cart.id ? "border-blue-500" : ""
                }`}
                onClick={() => setSelectedCart(cart)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-blue-500">
                      Cart #{cart.id} - User #{cart.userId}
                    </p>
                    <p className="text-sm text-blue-400">
                      Items: {cart.items.length}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-400">
                      Total: $
                      {cart.items.reduce(
                        (sum, item) => sum + item.service.price * item.quantity,
                        0
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedCart && (
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500">
              Cart Items
            </h3>
            <form onSubmit={handleAddItem} className="mb-8">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="number"
                  placeholder="Service ID"
                  value={formData.serviceId}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceId: e.target.value })
                  }
                  className="p-2 border rounded text-blue-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  className="p-2 border rounded text-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Item
                </button>
              </div>
            </form>

            <div className="space-y-4">
              {selectedCart.items.map((item) => (
                <div key={item.id} className="p-4 border rounded shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-blue-500">
                        {item.service.name}
                      </p>
                      <p className="text-sm text-blue-400">
                        ${item.service.price} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-blue-100 text-blue-500 rounded"
                        >
                          -
                        </button>
                        <span className="text-blue-500">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-blue-100 text-blue-500 rounded"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="px-2 py-1 bg-red-100 text-red-500 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartManagement;

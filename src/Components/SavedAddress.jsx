
import { useState, useEffect } from "react";
import axios from "axios";

const SavedAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get("https://smart-book-server-arittro7-arittros-projects.vercel.app/addresses");
      setAddresses(response.data);
    } catch (err) {
      console.error("Error fetching addresses", err);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="text-xl font-bold mb-4">Saved Addresses</h2>
      <input 
        type="text" 
        placeholder="Search by City or State" 
        className="input input-bordered w-full mb-4" 
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>PIN Code</th>
            </tr>
          </thead>
          <tbody>
            {addresses
              .filter(addr => addr.city.toLowerCase().includes(search.toLowerCase()) || addr.state.toLowerCase().includes(search.toLowerCase()))
              .map((addr, index) => (
                <tr key={index}>
                  <td>{addr.addressLine1}</td>
                  <td>{addr.city}</td>
                  <td>{addr.state}</td>
                  <td>{addr.pinCode}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedAddress;
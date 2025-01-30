import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const AddAddress = ({ fetchAddresses }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/add-address", data);
      fetchAddresses();
    } catch (err) {
      console.error("Error saving address", err);
    }
  };

  

  return (
    <div className="card bg-base-100 shadow-xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Add New Address</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("addressLine1", { required: true })} placeholder="Address Line 1" className="input input-bordered w-full" />
        <input {...register("pinCode", { required: true })} placeholder="PIN Code" className="input input-bordered w-full" onBlur={(e) => fetchAddressDetails(e.target.value)} />
        <input {...register("city", { required: true })} placeholder="City" className="input input-bordered w-full" />
        <input {...register("state", { required: true })} placeholder="State" className="input input-bordered w-full" />
        <input value="India" readOnly className="input input-bordered w-full bg-gray-200" />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="btn btn-primary w-full">Add Address</button>
      </form>
    </div>
  );
};

export default AddAddress;
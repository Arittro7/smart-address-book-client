/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const AddAddress = ({ fetchAddresses }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      await axios.post("https://smart-book-server.vercel.app/add-address", data);
      fetchAddresses();
      Swal.fire({
        title: "Success!",
        text: "Address added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error("Error saving address", err);
    }
  };

  const fetchAddressDetails = async (pinCode) => {
    if (pinCode.length === 6) {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pinCode}`);
        const details = response.data[0];
        if (details.Status === "Success") {
          const { District, State } = details.PostOffice[0];
          setValue("city", District);
          setValue("state", State);
          setError("");
        } else {
          setError("Invalid PIN Code");
        }
      } catch (err) {
        setError("Error fetching address details");
      }
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

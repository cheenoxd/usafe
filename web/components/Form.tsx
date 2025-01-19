import React from 'react';
import { Link } from "react-router" 
import { api } from "../api";
import { useActionForm } from "@gadgetinc/react";

export default function NewPerson() {
  const { submit, register, formState, error, reset } = useActionForm(api.userInfo.create, {
    defaultValues: {
      fullName: "",
      eContact: "",
      phoneNumber: "",
      address: "",
      userEmail:""
    },
    onSuccess: () => {
      reset(); // Reset form state after successful submission
    },
  });

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1>Personal Information</h1>
        <form onSubmit={submit}> {/* Use submit from useActionForm */}
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="fullName" style={{ display: 'block', marginBottom: '5px' }}>
              Full Name:
            </label>
            <input
              {...register("fullName")} 
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="userEmail" style={{ display: 'block', marginBottom: '5px' }}>
              User Email:
            </label>
            <input
              {...register("userEmail")} 
              type="text"
              id="userEmail"
              placeholder="Enter your email"
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="address" style={{ display: 'block', marginBottom: '5px' }}>
              Address:
            </label>
            <input
              {...register("address")} 
              id="address"
              placeholder="Enter your address"
              style={{ width: '100%', padding: '8px', height: '40px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="emergencyContactName" style={{ display: 'block', marginBottom: '5px' }}>
              Emergency Contact Name:
            </label>
            <input
              {...register("eContact")} 
              type="text"
              id="emergencyContactName"
              placeholder="Enter emergency contact name"
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="emergencyContactNumber" style={{ display: 'block', marginBottom: '5px' }}>
              Emergency Contact Number:
            </label>
            <input
              {...register("phoneNumber")} 
              type="text"
              id="emergencyContactNumber"
              placeholder="Enter emergency contact number"
              style={{ width: '100%', padding: '8px' }}
              required
            />
          </div>
          
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#FFF',
              border: 'none',
              borderRadius: '5px',
            }} // Disable the button while submitting
          >
            Submit
          </button>
        </form>

        {/* Show errors if any */}
        {error && (
          <p className="format-message error">
            <code>{error.message}</code>
          </p>
        )}
      </div>
    </>
  );
}
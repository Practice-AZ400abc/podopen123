"use client";

import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { RiEyeFill } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import toast from 'react-hot-toast';

const Listings = ({ listing, refreshListings }) => {
  const [token, setToken] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState(listing.status); // Track status changes
  const [updatedListing, setUpdatedListing] = useState(listing); // Track full listing updates

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // DELETE method
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const deleteResponse = await fetch(`/api/listing/${listing._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete listing");
      }

      toast.success("Listing deleted successfully!");
      refreshListings(); // Refetch listings after deletion
    } catch (error) {
      console.error(error);
      toast.error("Error deleting listing.");
    }
  };

  // PUT method to update the listing
  const handleUpdate = async (updatedData) => {
    try {
      const updateResponse = await fetch(`/api/listing/${listing._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update listing");
      }

      const updatedListing = await updateResponse.json();
      setUpdatedListing(updatedListing); // Update the state with the updated listing
      setUpdatedStatus(updatedListing.status); // Ensure status is updated
      toast.success("Listing updated successfully!");
      refreshListings(); // Refetch listings after update
    } catch (error) {
      console.error(error);
      toast.error("Error updating listing.");
    }
  };

  // Handle status change
  const handleStatusChange = (newStatus) => {
    setUpdatedStatus(newStatus);
    handleUpdate({ status: newStatus }); // Update only the status
  };

  const getStatusColor = () => {
    switch (updatedStatus) {
      case "Published":
        return "bg-green-400";
      case "Draft":
        return "bg-red-400";
      case "Inactive":
        return "bg-yellow-400";
      case "Expired":
        return "bg-gray-400";
      default:
        return "bg-gray-200";
    }
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="w-full rounded-md flex flex-col items-start border p-2 justify-start gap-2">
      <div className="flex gap-2 justify-between w-full">

        <div className="flex items-center justify-end w-full gap-2">
          <div className='flex gap-2 border p-2 rounded-md justify-center items-center'>
            <span>Status:</span>
            <Button className={`${getStatusColor()} text-white`}>{updatedStatus}</Button>
          </div>
          <div className="flex items-start justify-between">
            <div className="w-[200px]">
              <Select
                onValueChange={(value) => handleStatusChange(value)} // Handle status change
              >
                <SelectTrigger className="h-12">
                  <div className="flex items-center gap-2">
                    <RiEyeFill className="text-blue-500" />
                    <SelectValue
                      className="text-lg font-bold"
                      value={updatedStatus}
                      placeholder="Change Visibility"
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">
                    {updatedStatus === "Published" && "✔️ "} Activate Listing
                  </SelectItem>
                  <SelectItem value="Draft">
                    {updatedStatus === "Draft" && "✔️ "} Save Draft
                  </SelectItem>
                  <SelectItem value="Unpublished">
                    {updatedStatus === "Unpublished" && "✔️ "} Unpublish Listing
                  </SelectItem>
                </SelectContent>

              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          {updatedListing.images.map((img, idx) => (
            <Image
              key={idx}
              className="h-[100px] object-cover rounded-md w-[100px]"
              src={img}
              width={"100"}
              height={"100"}
              alt={`Listing Image ${idx + 1}`}
            />
          ))}
        </div>

        <div className=" rounded-sm text-gray-600 font-light text-sm">
          <span className="font-bold text-black">Title: </span>
          <p className='mt-4'>{updatedListing.sponsorShipDescription}</p>
        </div>
        <div className=" rounded-sm text-gray-600 font-light text-sm">
          <span className="font-bold text-black">Listing Number: </span>
          <p className='mt-4'>{updatedListing._id.slice(0, 5)}</p>
        </div>

        <div className="  rounded-sm text-gray-600 font-light text-sm">
          <span className="font-bold text-black">Description: </span>
          <p className='mt-4'>{updatedListing.projectDescription}</p>
        </div>
        <h1 className="font-light text-gray-800 ">
          <span className="font-bold">Investors needed from
          these countri(es): </span>
          {updatedListing.countriesForInvestors.map((country, idx) => (
            <span
              key={idx}
              className="underline p-2 m-2 rounded-sm text-sm font-bold"
            >
              {country}
            </span>
          ))}
        </h1>
      </div>
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="underline text-black p-2 rounded-md mt-4"
      >
        {showDetails ? "See Less" : "See More"}
      </button>

      {showDetails && (
        <>
          <div className="mt-4 flex gap-2 flex-col">
            <h1 className="mt-2 font-bold">
            Country where investment is needed: {" "}
              <span className="text-blue-500 uppercase p-2 m-2 rounded-sm text-sm font-bold">
                {updatedListing.countryForInvestment}

              </span>
            </h1>
            <h1 className="mt-2 font-bold">
              Industry of Investment: {" "}
              <span className="text-blue-500 uppercase p-2 m-2 rounded-sm text-sm font-bold">
                {updatedListing.investmentIndustry}
              </span>
            </h1>
            <h1 className="mt-2 font-bold">
              Minimum Investment: {" "}
              <span className="text-blue-500 uppercase p-2 m-2 rounded-sm text-sm font-bold">
                {updatedListing.minimumInvestment}
              </span>
            </h1>
          </div>
          <div className="mt-4 flex gap-2 flex-col">
            <div className="flex gap-4">
              <div className="flex gap-2">
                <span className="font-bold ">Telegram:</span>
                <span>{updatedListing.telegram}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold ">
                  Contact Phone Number:
                </span>
                <span>{updatedListing.phone}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-green-400">Whatsapp:</span>
                <span>{updatedListing.whatsapp}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2 flex-col">
            <div className="flex gap-2">
              <h1 className="font-bold ">Email</h1>
              <span>{updatedListing.contactEmail}</span>
            </div>
          </div>
        </>
      )}

      <div className="flex items-end justify-end gap-2 w-full">
        <Dialog>
          <DialogTrigger className=' text-white rounded-md bg-red-500 p-2'>Delete</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Warning!</DialogTitle>
              <DialogDescription>
                Do you want to
                delete this listing?
              </DialogDescription>

              <div className='flex gap-2 justify-end'>
                <Button onClick={handleDelete} className="bg-red-500 text-white w-fit aligh-end">
                  Delete Now
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {updatedStatus !== "Published" ? (
          <Button
            onClick={() => handleUpdate({ status: "Published" })}
            className="bg-blue-500 text-white"
          >
            Publish Listing
          </Button>
        ) : (
          <Button
            onClick={() => handleUpdate({ status: "Unpublished" })}
            className="bg-yellow-500 text-white"
          >
            Unpublish Listing
          </Button>
        )}
      </div>
    </div>
  );
};

export default Listings;


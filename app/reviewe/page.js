'use client'

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../globals.css';
import { useRouter } from 'next/navigation';


import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Reviews = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const reviewsList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://plypicker-backend-3a25.onrender.com/api/product/reviews`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      if (data.reviewsList && data.reviewsList.length > 0) {
        setProducts(data.reviewsList);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    reviewsList();
    if(!localStorage.getItem("token")){
      router.push('/login');
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'accept':
        return 'green';
      case 'reject':
        return 'red';
      default:
        return 'inherit';
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row-reverse m-5">
        <a 
        href={`/list`}
          className="top-5 mx-10 bg-blue-600 text-white px-4 py-2 rounded shadow-lg"
        >
         back
        </a>
      </div> 

      <div className="overflow-y-auto pt-10 mx-auto w-11/12 m-5">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12}>No products found in review.</TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {products.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell>{row.productName}</TableCell>
                  <TableCell style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{row.productDescription}</TableCell>
                  <TableCell>INR.{row.price}</TableCell>
                  <TableCell>
                    <div style={{ textAlign: 'center', backgroundColor: getStatusColor(row.status), padding: '5px', borderRadius: '50px', width: '30%'}}>
                      <span style={{color: "black"}}>{row.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Reviews;
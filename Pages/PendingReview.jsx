import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const PendingReviews = () => {
  const [products, setProducts] = useState([]);

  const reviewsList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/product/reviews`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      if (data.reviewsList && data.reviewsList.length > 0) {
        const pending = data.reviewsList.filter(review => review.status === 'pending')
        setProducts(pending);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    reviewsList();
  }, []);


  const handleAccept = async(reviewId) => {
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/product/reviews/status/${reviewId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "accept" }) 
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      else {
        const data = await response.json();
        toast.success(data.message, {
          autoClose: 1000
        })
        setTimeout(() => {
          reviewsList()
        }, 1100);
      }
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  }

  const handleReject = async(reviewId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/product/reviews/status/${reviewId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "reject" })
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      toast.success(data.message, {
        autoClose: 1000
      })
      setTimeout(() => {
        reviewsList()
      }, 1100);
      // }
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-row-reverse mt-2">
        <a
          href={`/list`}
          className="top-5 mx-10 bg-blue-600 text-white px-4 py-2 rounded shadow-lg"
        >
          back
        </a>
      </div>

      <div className="overflow-y-auto pt-10 mx-auto w-11/12">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12}>
                    No products found in review.
                  </TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {products.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <a style={{"cursor":"pointer"}} className="no-underline" onClick={()=>{
                    router.push({
                      pathname: '/CheckProductReview',
                      query: { id: row._id },
                    })
                  }}>
                    <TableCell>{row.productName}</TableCell>
                  </a>
                  <TableCell
                    style={{ maxWidth: "200px", wordWrap: "break-word" }}
                  >
                    {row.productDescription}
                  </TableCell>
                  <TableCell>INR.{row.price}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <div className="mr-2">
                        <button onClick={ () => handleAccept(row._id)}>
                          <svg
                            className="w-6 h-6 text-gray-500 hover:text-green-600 transition-colors duration-300"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            {" "}
                            <path stroke="none" d="M0 0h24v24H0z" />{" "}
                            <circle cx="12" cy="12" r="9" />{" "}
                            <path d="M9 12l2 2l4 -4" />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button onClick={ () => handleReject(row._id)}>
                          <svg
                            className="w-6 h-6 text-gray-500 hover:text-red-600 transition-colors duration-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            {" "}
                            <circle cx="12" cy="12" r="10" />{" "}
                            <line x1="15" y1="9" x2="9" y2="15" />{" "}
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                        </button>
                      </div>
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

export default PendingReviews;
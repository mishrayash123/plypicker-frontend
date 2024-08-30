import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Reviews = () => {
  const [products, setProducts] = useState([]);

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
      <div className="flex flex-row-reverse mt-2">
        <a 
        href={`/product`}
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
                    {/* <div className="flex">
                      <div className="mr-2">
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-500 hover:text-red-600 transition-colors duration-300"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                      <div>
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-500 hover:text-green-600 transition-colors duration-300"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>
                      </div>
                    </div> */}
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
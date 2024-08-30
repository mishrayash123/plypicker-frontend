'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../globals.css';

const EditProduct = () => {
  const router = useRouter();
  const id="jkjk"
  const [product, setProduct] = useState({});

  const getUserRole = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.role;
      }
    } catch (error) {
      console.log("error while getting user role", error);
    }
    return null;
  };

  const handleSubmit = async() => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://plypicker-backend-3a25.onrender.com/api/product/review/add`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          });
          const role = getUserRole()
        const data = await response.json();
        if (!data) {
          toast.error(data.error, {
            autoClose: 1000,
          });
        } else if (data) {
          if(role === 'admin') {
            toast.success(
              "product data updated",
              {
                autoClose: 1000,
              }
            );
          } else {
            toast.success(
              "product added for review",
              {
                autoClose: 1000,
              }
            );
          }
          setTimeout(() => {
            router.push("/list");
          }, 2000);
        }
      } catch (error) {
        console.log(error.message);
      }
  }

  useEffect(() => {
    const fetchProductById = async (productId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://plypicker-backend-3a25.onrender.com/api/product/products/${productId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        if (data.list && data.list.length > 0) {
          setProduct(data.list[0]);
        } else {
          setProduct([]);
        }
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };
    fetchProductById(router.query.id);
    if(!localStorage.getItem("token")){
      router.push('/login');
    }
  }, [router.query.id]);

  return (
    <div>
      <div className="flex md:flex-row p-10 mt-[2rem]">
        <div className="md:w-1/2 flex flex-col items-center space-y-4">
          <div className="border w-64 h-64 flex items-center justify-center text-gray-500">
            <img src={product.image} alt={product.image} className="w-64 h-64"/>
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col space-y-4 pl-10">
          <input
            type="text"
            placeholder="Product Name"
            className="py-2 px-4 w-full border border-gray-300"
            value={product.productName || ''}
            onChange={(e) => setProduct({...product, productName: e.target.value})}
          />
          <textarea
            placeholder="Product Description"
            className="py-2 px-4 w-full border border-gray-300"
            rows="4"
            value={product.productDescription || ''}
            onChange={(e) => setProduct({ ...product, productDescription: e.target.value })}
          ></textarea>
          <input
            type="text"
            placeholder="Product Price"
            className="py-2 px-4 w-full border border-gray-300"
            value={product.price || ''}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
      </div>
        <div className="flex justify-center mt-[10rem] m-5">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 mr-4 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
          <a
            href={`/list`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </a>
        </div>
    </div>

  );
};

export default EditProduct;
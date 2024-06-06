import React, { useState, useEffect } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
import { Cloudinary } from "@cloudinary/url-gen";

const StudentBasic = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Before Chat", formData);
    try {
      const response = await fetch("https://gnj.onrender.com/api/auth/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log("After Chat", formData);
      navigate('/studentsList');
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      {
        loading
          ?
          <div className="grid grid-cols-1 lg:grid-cols-1">
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md text-center">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span>
                </div>
              </div>
            </div>
          </div>
          :

          <div className="mt-6 flex flex-col">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
             Add New Customer
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                       Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder='Student Code'
                          value={formData['name']}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.studentcode ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>


                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                      Contact Number
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="contact"
                          placeholder='+91 98765-43210'
                          id="contact"
                          value={formData['contact']}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.firstname ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="middlename" className="block text-sm font-medium leading-6 text-gray-900">
                       Address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="address"
                          placeholder='Address'
                          id="address"
                          value={formData['address']}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.middlename ? 'border-red-500' : ''
                            }`}
                        />
                      </div>
                    </div>



                  </div>
                </div>
              </div>

              {errors.gender && <p className="text-red-500">Please select a gender.</p>}
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save & Next
                </button>
              </div>
            </form>


          </div>

      }
    </section>
  )
}

export default StudentBasic
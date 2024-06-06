import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';

const VendorWiseItems = () => {
    const [formData, setFormData] = useState({
        customerId: '',
        vendorId:'',
        customerName: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [customerOptions, setCustomerOptions] = useState([]);
    const [vendorOptions, setVendorOptions] = useState([]);
    const [vendorItems, setvendorItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        fetchAllCustomer();
        fetchAllVendor();
    }, []);

    const fetchAllCustomer = () => {
        setLoading(true);
        fetch('https://gnj.onrender.com/api/auth/customers')
            .then(response => response.json())
            .then(data => {
                const options = data.map(customer => ({
                    value: customer._id,
                    label: customer.name,
                }));
                setCustomerOptions(options);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching customer details:', error);
                setLoading(false);
            });
    };

    const fetchAllVendor = () => {
      setLoading(true);
      fetch('https://gnj.onrender.com/api/auth/vendors')
          .then(response => response.json())
          .then(data => {
              const options = data.map(customer => ({
                  value: customer._id,
                  label: customer.name
              }));

              console.log("options", options);
              setVendorOptions(options);
              setLoading(false);
          })
          .catch(error => {
              console.error('Error fetching customer details:', error);
              setLoading(false);
          });
  };

    const fetchItems = async (vendorId) => {
        console.log("Fecsdsd");
        try {
            const response = await fetch(`https://gnj.onrender.com/api/auth/vendorWiseItem/${vendorId}`);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error fetching items:', errorData.message);
                return;
            }
            const items = await response.json();
            setvendorItems(items)
            console.log('Fetched items:', items);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log("Before Data", formData);
        try {
            const response = await fetch("https://gnj.onrender.com/api/auth/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log("After Data", formData);
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
    
    const handleViewPage = (itemId) => {
      navigate(`/updatevendor/${itemId}`);
  };

    const handleCustomerChange = (selectedOption) => {
        setFormData(prevData => ({
            ...prevData,
            customerId: selectedOption.value
        }));
        fetchItems(selectedOption.value)
    };


  //   const updateItemVendor = async (vendorId) => {
  //     setLoading(true);
  //     try {
  //         const response = await fetch(`https://gnj.onrender.com/api/auth/items/${vendorItems._id}`, {
  //             method: "PUT",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ vendorId }),
  //         });

  //         if (!response.ok) {
  //             throw new Error(response.statusText);
  //         }
  //         console.log('Item vendor updated successfully');
  //     } catch (error) {
  //         console.error("Error updating item vendor:", error.message);
  //     } finally {
  //         setLoading(false);
  //     }
  // };

    const handleVendorChange = (selectedOption) => {
        setFormData(prevData => ({
            ...prevData,
            vendorId: selectedOption.value
        }));
        fetchItems(selectedOption.value)
    };

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-1">
                    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-6 flex flex-col">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Add New Item</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="customerName" className="block text-sm font-medium leading-6 text-gray-900">Vendor Name</label>
                                        <div className="mt-2">
                                            <Select
                                                options={vendorOptions}
                                                id="vendorId"
                                                name="vendorId"
                                                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={vendorOptions.find(option => option.value === formData.vendorId)}
                                                onChange={handleVendorChange}
                                            />
                                        </div>
                                    </div>
                                    {console.log(formData)}

                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save & Next</button>
                        </div>
                    </form>
                </div>
            )}


<div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
          
        
          
            {vendorItems ? 
          
           
           (   <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      <span>Item Name</span>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      label/Weight
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      customer Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      photo
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
{console.log(vendorItems, "user Data")}
                {vendorItems.map((item, index)=> (
                   <tr className="divide-x divide-gray-200">
                   <td className="whitespace-nowrap px-4 py-4">
                     <div className="flex items-center">

                       <div className="ml-4">
                         <div className="text-sm font-medium text-gray-900">{item.itemName}</div>

                       </div>
                     </div>
                   </td>
                   <td className="whitespace-nowrap px-12 py-4">
                     <div className="text-sm font-medium text-gray-900">{item.status}</div>

                   </td>
                   <td className="whitespace-nowrap px-4 py-4">
                     <div className="text-sm font-medium text-gray-900">{item.label} / {item.weight} gram</div>
                   </td>
                   <td className="whitespace-nowrap px-4 py-4">
                     <div className="text-sm font-medium text-gray-900">{item.price}</div>
                   </td>
                   <td className="whitespace-nowrap px-4 py-4">
                    {item.customerdata ? (
                      <div className="text-sm font-medium text-gray-900">
                        {item.customerdata.name}
                      </div>
                    ) : (
                      <div className="text-sm font-medium text-gray-900 text-center">-</div>
                    )}
                    {/* <div className="text-sm font-medium text-gray-900">
                        {item.customerdata.name}
                      </div> */}
                    </td>
                   <td className="whitespace-nowrap  px-4 py-4 text-sm text-gray-500">
                     <div className="text-sm font-medium text-gray-900">
                        <img src={item.photo} width={150} /></div>
                   </td>
                   {/* <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                   <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => handleViewPage(item._id)}
                    >
                      View
                    </button>

                     <Link to=""  className="text-gray-500 hover:text-indigo-600">
                       <span className="inline-flex rounded-full bg-red-100 px-2 mx-2 text-xs font-semibold leading-5 text-green-800">
                         Delete
                       </span>
                     </Link>
                   </td> */}
                 </tr>

                ))}

                 
                </tbody>
              </table>)

: 
            
(
      <p>Loading user data...</p>
    )

}
            </div>
          </div>
        </div>
      </div>
        </section>
    );
};

export default VendorWiseItems;

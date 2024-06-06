import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const Updatevendor = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [vendorId, setvendorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vendorOptions, setVendorOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("UserauthToken")) {
      navigate("/");
    }
    fetchAllVendor();
    fetchItemData(id);
  }, []);

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
  const fetchItemData = async (itemId) => {
    try {
      const response = await fetch(`https://gnj.onrender.com/api/auth/getitemdata/${itemId}`);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching item:', errorData.message);
        return;
      }
      const data = await response.json();
      setItemData(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  if (!itemData) {
    return <div>Loading...</div>;
  }
  
  const updateVendorId = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://gnj.onrender.com/api/auth/updatevendorid/${itemData._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vendorId: vendorId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update vendor ID');
      }

      const updatedItem = await response.json();
      onUpdate(updatedItem);
    } catch (error) {
      console.error('Error updating vendor ID:', error.message);
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  const handleVendorChange = (selectedOption) => {
    setvendorId(selectedOption.value);
};

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-4">Update Item</h1>
      <form className="space-y-4">
        
      <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Customer Name</label>
                    {itemData.customer ? (
                      // <div className="text-sm font-medium text-gray-900">
                      //   {itemData.customer.name}
                      // </div>
                      <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={itemData.customer.name} // Assuming customer name is in the 'name' field of the customer object
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />      
                    ) : (
                      <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={itemData.customer.name} // Assuming customer name is in the 'name' field of the customer object
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />      
                    )}                   
                  </div>

                  <div className="sm:col-span-2">
                  <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                      type="text"
                      id="itemName"
                      name="itemName"
                      value={itemData.itemName}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />                    
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={itemData.description}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />                    
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Weight</label>
                    <input
                      type="text"
                      id="weight"
                      name="weight"
                      value={itemData.weight}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />                    
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">label</label>
                    <input
                      type="text"
                      id="label"
                      name="label"
                      value={itemData.label}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />                    
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={itemData.price}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />                    
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Photo</label>
                    {/* <input
                      type="file"
                      id="photo"
                      name="photo"
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />    */}
                    <img src={itemData.photo} alt="" height={'50px'} width={'200px'} />                 
                  </div>
                  
                  <div className="text-sm font-medium text-gray-900">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Vendor Name</label>
                      {itemData.vendorId == '' || itemData.vendorId == null ? (
                          <Select
                              options={vendorOptions}
                              id={`vendor-${itemData._id}`}
                              name={`vendor-${itemData._id}`}
                              className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={vendorOptions.find(option => option.value === vendorId)}
                              onChange={(selectedOption) => handleVendorChange(selectedOption)}
                          />
                      ) : (
                        <Select
                          options={[...vendorOptions, { value: itemData.vendorId, label: itemData.vendorName }]}
                          id={`vendor-${itemData._id}`}
                          name={`vendor-${itemData._id}`}
                          className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={vendorOptions.find(option => option.value === itemData.vendorId)}
                          onChange={(selectedOption) => handleVendorChange(selectedOption)}
                        />
                      )}
                  </div>
                </div>
              </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
              <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={updateVendorId}>{loading ? 'Saving...' : 'Save'}</button>
              <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save & Next</button>
            </div>
      </form>
    </div>
  );
};

export default Updatevendor;

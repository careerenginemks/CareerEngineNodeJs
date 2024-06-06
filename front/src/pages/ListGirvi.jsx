import React, { useState,useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';


const ListGirvi = () => {
  const [userID,setUserId] = useState('')
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [GirviItems, setGirviItems] = useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    fetchItems()
    if(!localStorage.getItem("UserauthToken"))
    {
      navigate("/");
    }
    fetchGirviData()
const getUserid = localStorage.getItem("UserId")
console.log(typeof getUserid);
console.log({getUserid}, "tes")
setUserId(getUserid)

}, [])

const fetchItems = async (customerId) => {
    console.log("Fecsdsd");
    try {
      const response = await fetch(`https://gnj.onrender.com/api/items/${customerId}`);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching items:', errorData.message);
        return;
      }
      const items = await response.json();
      console.log('Fetched items:', items);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

const fetchGirviData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://gnj.onrender.com/api/auth/items');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setGirviItems(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 class="text-lg font-semibold">Item List</h2>
          <p class="mt-1 text-sm text-gray-700">
            See all records 
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
          
        
          
            {GirviItems ? 
          
           
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
                      Customer Name / Number
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
                      status
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
{console.log(GirviItems, "user Data")}
                {GirviItems.map((item, index)=> (
                   <tr className="divide-x divide-gray-200">
                   <td className="whitespace-nowrap px-4 py-4">
                     <div className="flex items-center">

                       <div className="ml-4">
                         <div className="text-sm font-medium text-gray-900">{item.itemName}</div>

                       </div>
                     </div>
                   </td>
                   <td className="whitespace-nowrap px-12 py-4">
                     <div className="text-sm font-medium text-gray-900">{item.customerId}</div>

                   </td>
                   <td className="whitespace-nowrap px-4 py-4">
                     <div className="text-sm font-medium text-gray-900">{item.label} / {item.weight} gram</div>
                   </td>
                   <td className="whitespace-nowrap px-4 py-4">
                     <div className="text-sm font-medium text-gray-900">{item.status}</div>
                   </td>
                   <td className="whitespace-nowrap  px-4 py-4 text-sm text-gray-500">
                     <div className="text-sm font-medium text-gray-900">
                        <img src={item.imageUrl} width={150} /></div>
                   </td>
                   <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">

                     <Link to="/studentAllData" className="text-gray-500 hover:text-indigo-600">
                       <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                         View
                       </span>
                       <span className="inline-flex rounded-full bg-red-100 px-2 mx-2 text-xs font-semibold leading-5 text-green-800">
                         Delete
                       </span>
                     </Link>
                   </td>
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

  )
}

export default ListGirvi
import React, { useEffect,useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate} from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [counts, setCounts] = useState({
        customers: 0,
        vendors: 0,
        items: 0,
        girviItems: 0
    });
    useEffect(()=>{
        if(!localStorage.getItem("UserauthToken"))
        {
          navigate("/");
        }
        fetchTotalCounts();
    })

    const fetchTotalCounts = async () => {
        try {
            const response = await fetch('https://gnj.onrender.com/api/auth/totalcount');
            if (response.ok) {
                const data = await response.json();
                setCounts(data);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error(error);
            // Handle error, e.g., show a message to the user
        }
    };
    return (
        <section>

            <div className="">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div>
                            <h2 class="text-lg font-semibold">Dashboard</h2>
                            <p class="mt-1 text-sm text-gray-700">
                                Dashboard
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div className="group relative p-4 rounded-lg bg-blue-600 text-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3">
                                        {/* <a href="/addCustomer"> */}
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Total Customers
                                        {/* </a> */}
                                    </h2>
                                    <h2 className='font-bold text-3xl'>{counts.customers}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="group relative p-4 rounded-lg bg-red-600 text-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3">
                                        {/* <a href="/addCustomer"> */}
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Total Items
                                        {/* </a> */}
                                    </h2>
                                    <h2 className='font-bold text-3xl'>{counts.items}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="group relative p-4 rounded-lg bg-green-600 text-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3">
                                        {/* <a href="/addCustomer"> */}
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Total Vendors
                                        {/* </a> */}
                                    </h2>
                                    <h2 className='font-bold text-3xl'>{counts.vendors}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="group relative p-4 rounded-lg bg-purple-600 text-white">
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3">
                                        {/* <a href="/addCustomer"> */}
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Total Girvi Items
                                        {/* </a> */}
                                    </h2>
                                    <h2 className='font-bold text-3xl'>{counts.girviItems}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="group relative p-4 rounded-lg bg-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3 text-gray-700">
                                        <a href="/addCustomer">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Add New Customer
                                        </a>
                                    </h2>

                                    <a href='#'
                                        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                                    >
                                        Add New
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>

                                </div>

                            </div>
                        </div>
                        <div className="group relative p-4 rounded-lg bg-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3 text-gray-700">
                                        <a href="/AddGirviItem">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                           Add Girvi Item
                                        </a>
                                    </h2>

                                    <a href='#'
                                        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                                    >
                                        See List
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>

                                </div>

                            </div>
                        </div>
                        <div className="group relative p-4 rounded-lg bg-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3 text-gray-700">
                                        <a href="/addVendor">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                           Add New Vendor
                                        </a>
                                    </h2>

                                    <a href='#'
                                        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                                    >
                                        See List
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>

                                </div>

                            </div>
                        </div>
                        <div className="group relative p-4 rounded-lg bg-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3 text-gray-700">
                                        <a href="/listGirvi">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                           See Girvi Items
                                        </a>
                                    </h2>

                                    <a href='#'
                                        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                                    >
                                        See List
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>

                                </div>

                            </div>
                        </div>
                        <div className="group relative p-4 rounded-lg bg-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3 text-gray-700">
                                        <a href="/customerWiseItem">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                           Customer Wise Items
                                        </a>
                                    </h2>

                                    <a href='#'
                                        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                                    >
                                        See List
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>

                                </div>

                            </div>
                        </div>
                        <div className="group relative p-4 rounded-lg bg-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3 text-gray-700">
                                        <a href="/addItem">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                           Add New Item
                                        </a>
                                    </h2>

                                    <a href='#'
                                        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                                    >
                                        Add New
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>

                                </div>

                            </div>
                        </div>
                        <div className="group relative p-4 rounded-lg bg-white">

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h2 className="text-lg pb-3 text-gray-700">
                                        <a href="/vendorWiseItems">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                           Vendor Wise Items
                                        </a>
                                    </h2>

                                    <a href='#'
                                        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                                    >
                                        See List
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default Dashboard
import React, { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

const StudentDetailSection = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("UserauthToken"))
        {
          navigate("/");
        }
    })
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-4">
            <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h2 class="text-lg font-semibold">Student Details Section</h2>
                    <p class="mt-1 text-sm text-gray-700">
                        See all Sections
                    </p>
                </div>
            </div>
            <div className="mt-6 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr className="divide-x divide-gray-200">
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                        >
                                            <span>Section Name</span>
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
                                            Actions
                                        </th>


                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">

                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center">

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">Student Basic Detail</div>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                        Pending
                                                </span>
                                           

                                        </td>


                                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">

                                            <a href="#" className="text-gray-500 hover:text-indigo-600">
                                                <span className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold leading-5 text-white">
                                                    View
                                                </span>

                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center">

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">Student Address</div>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                        Pending
                                                </span>
                                           

                                        </td>


                                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">

                                            <a href="#" className="text-gray-500 hover:text-indigo-600">
                                                <span className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold leading-5 text-white">
                                                    View
                                                </span>

                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center">

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">Student Institution</div>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                        Pending
                                                </span>
                                           

                                        </td>


                                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">

                                            <a href="#" className="text-gray-500 hover:text-indigo-600">
                                                <span className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold leading-5 text-white">
                                                    View
                                                </span>

                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center">

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">Student Academic</div>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                        Pending
                                                </span>
                                           

                                        </td>


                                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">

                                            <a href="#" className="text-gray-500 hover:text-indigo-600">
                                                <span className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold leading-5 text-white">
                                                    View
                                                </span>

                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center">

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">Student ReportCard</div>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                        Pending
                                                </span>
                                           

                                        </td>


                                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">

                                            <a href="#" className="text-gray-500 hover:text-indigo-600">
                                                <span className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold leading-5 text-white">
                                                    View
                                                </span>

                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center">

                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">Student Family</div>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                        Pending
                                                </span>
                                           

                                        </td>


                                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">

                                            <a href="#" className="text-gray-500 hover:text-indigo-600">
                                                <span className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold leading-5 text-white">
                                                    View
                                                </span>

                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    )
}

export default StudentDetailSection
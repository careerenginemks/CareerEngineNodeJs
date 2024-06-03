import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Select from 'react-select';

const StudentAllData = () => {
    const [userID, setUserId] = useState('')
    const [searchStudentCode, setSearchStudentCode] = useState('');
    const [studentDetails, setStudentDetails] = useState([]);
    const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setloading] = useState(false);
    const [formData, setFormData] = useState([])
    const [selectedStudentCode, setSelectedStudentCode] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

   

    const handleStudentCodeChange = (selectedOptions) => {
        console.log(selectedOptions, "selectedOptions");
        setSelectedStudentCode(selectedOptions[0]);
    };

    const handleYearChange = (selectedOptions) => {
        setSelectedYear(selectedOptions[0]);
    };


    const navigate = useNavigate();

    useEffect(() => {
        fetchAllStudentDetails();
        if (!localStorage.getItem("UserauthToken")) {
            navigate("/");
        }
        const getUserid = localStorage.getItem("UserId");
        setUserId(getUserid);
      

    }, [setUserId, navigate]);


    const fetchAllStudentDetails = () => {
        setloading(true);
        fetch('http://localhost:5000/api/v1/fetchAllStudentDetails')
            .then(response => response.json())
            .then(data => {
                setStudentDetails(data.data);
                setloading(false);
            })
            .catch(error => {
                console.error('Error fetching student details:', error);
                setloading(false);
            });
    };


    const handleSearchChange = (selectedOption) => {
        setSearchStudentCode(selectedOption ? selectedOption.value : '');

        // Update studentCode in formData when searchStudentCode changes

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setSelectedYear(value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(searchStudentCode, selectedYear);
        try {
            const response = await fetch('http://localhost:5000/api/v1/getAllData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentCode: searchStudentCode,
                    year: selectedYear,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            console.log(data.data.length, "data.length");
            if (data.data.length > 0) {
                console.log(data.data,"data.data");
                console.log(typeof data.data,"data.data");
                setFilteredStudentDetails(data.data);
            } else {
                alert("No Data Found!");
            }
            console.log(data, 'data');

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <section className="mx-auto w-full max-w-7xl px-4 py-4">
                {
                    loading
                        ?
                        <div className="grid grid-cols-1 lg:grid-cols-1">
                            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md text-black text-center">
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
                                Student All Detail {searchStudentCode || 'Test'} {selectedYear}
                            </h1>

                            <form onSubmit={handleSubmit}>

                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                            <div className="sm:col-span-2">
                                                <label htmlFor="searchStudentCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Search Student Code 
                                                </label>
                                                <Select
                                                    options={studentDetails.map((student) => ({ value: student.studentCode, label: student.studentCode }))}
                                                    value={searchStudentCode ? { value: searchStudentCode, label: searchStudentCode } : null}
                                                    className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                        }`}
                                                    onChange={handleSearchChange}
                                                // onChange={(selectedOption) => setSearchStudentCode(selectedOption ? selectedOption.value : '')}
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Student Code
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        type="text"
                                                        id="studentcode"
                                                        name="studentcode"
                                                        value={searchStudentCode}
                                                        onChange={handleSearchChange}
                                                        className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="stuyear" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Year
                                                </label>
                                                <div className="mt-2">
                                                    <select
                                                        id="stuyear"
                                                        name="stuyear"
                                                        // value={formData['stuyear']}
                                                        onChange={handleInputChange}
                                                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.stuyear ? 'border-red-500' : ''
                                                            }`}
                                                    >
                                                        <option >Select Year</option>
                                                        <option value="2023-2024">2023-2024</option>
                                                        <option value="2022-2023">2022-2023</option>
                                                        <option value="2021-2022">2021-2022</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <button >Search</button> */}
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                                >
                                    Show Data
                                </button>


                            </form>
                        </div>
                }

{/* {console.log(filteredStudentDetails.data, "sd")} */}
{filteredStudentDetails.length > 0 && (


                <div className="overflow-hidden border my-5 border-gray-200 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr className="divide-x divide-gray-200">
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                >
                                    <span>Table Name</span>
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                >
                                    <span>Action</span>
                                </th>
                                </tr>
                         
                        </thead>
                        {console.log(typeof filteredStudentDetails, "filteredStudentDetails")}
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredStudentDetails.map((item, index) => (
                                <tr  className="divide-x divide-gray-200" key={index}>
                                    <td className="whitespace-nowrap px-4 py-4">{item.tableName}</td>
                                    <td className="whitespace-nowrap px-4 py-4"><Link to={`/editStudentBasic/${searchStudentCode}/${selectedYear}/${item.tableName}`} className="text-sm font-semibold px-3 py-2 bg-black leading-6 text-white">Edit</Link></td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
                )}





            </section>
        </>
    )
}

export default StudentAllData
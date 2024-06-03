import { useState, useEffect } from 'react'
import {logo} from './assets' 
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import {Dashboard, Home, AddCustomer, AddItem, AddVendor, ListGirvi,CustomerWiseItem,Updatevendor} from './pages'
import {EditStudentBasic} from './pages/EditData/index'

function App() {

  const [checkLogin ,setcheckLogin] = useState(false)
  const handleLogout = () => {
    
    localStorage.removeItem('UserauthToken');
    localStorage.removeItem('UserEmail');
    localStorage.removeItem('UserId');
    window.location.reload(true);
  }
  useEffect(()=>{
    const getToken = localStorage.getItem("UserauthToken");
    if (getToken !== null) {
      setcheckLogin(true)
    }else{
      setcheckLogin(false)
    }
    // console.log(getToken,"sd  ");
})
  return (
    <>
    <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <div className=''>
      <Link to="/">
       {/* <img src={logo} alt="logo" className="w-2/5 object-contain" /> */}
       <h2>Gurunanak Jewellers</h2>
      </Link>
      </div>
    {checkLogin == true
    ?
    <div className=''>
    <Link to="/dashboard" className="font-inter font-medium   px-4 py-2 rounded-md">Dashoard</Link>
    <Link to="/studentsList" className="font-inter font-medium   px-4 py-2 rounded-md">Student List</Link>
    <Link to="/studentAddress" className="font-inter font-medium   px-4 py-2 rounded-md">Student Address</Link>
    <Link to="" onClick={handleLogout} className="font-inter font-medium px-4 py-2 rounded-md">Logout</Link>
    </div>
    :
    <div className=''>
    <p className="font-inter font-medium   px-4 py-2 rounded-md">Welcome Message</p>
    
    </div>
    }


     
    </header>
    
      
     
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addCustomer" element={<AddCustomer />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/addVendor" element={<AddVendor />} />
        <Route path="/listGirvi" element={<ListGirvi />} />
        <Route path="/customerWiseItem" element={<CustomerWiseItem />} />
        <Route path="/updatevendor/:id" element={<Updatevendor />} />
        

       
      </Routes>
    </main>
  </BrowserRouter>
  </>
  )
}

export default App

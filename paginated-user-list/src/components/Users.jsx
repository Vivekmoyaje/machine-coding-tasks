import React from "react";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/users`);
      const data = await response.json();
      const totalUsers = data.total;
      setTotalPages(Math.min(Math.ceil(totalUsers / 3), 10));

      setUsers(data.users.slice(0, 3));
      console.log(data);
    };

    fetchUsers();
  }, []);

  const handlePageChange = async (newPageNumber) => {
    setLoading(true);
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    const start = (newPageNumber - 1) * 3;
    const end = start + 3;
    setUsers(data.users.slice(start, end));
    setPageNumber(newPageNumber);
    setLoading(false);
  };

  const handlePrevious = () => {
    if (pageNumber > 1) {
      handlePageChange(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages) {
      handlePageChange(pageNumber + 1);
    }
  };

  return (
    <div className="pt-20 w-[90%] mx-auto">
      <h1 className="text-4xl text-center underline">Users</h1>
      <div className="border flex justify-around py-5 my-5 ">
        {users.map((user) => (
          <div className=" border bg-gray-100 border-4  border-b-blue-950">
            <div className="border p-7 " key={user.id}>
              <p>
                <span className="font-bold">Id :</span> {user.id}
              </p>
              <p>
                <span className="font-bold">Name :</span> {user.firstName} {""}
                {user.lastName}
              </p>
              <p>
                <span className="font-bold">Email :</span> {user.email}
              </p>
              <p>
                <span className="font-bold">Phone Number :</span> {user.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-black flex justify-center text-white text-2xl">
        <button
          className="cursor-pointer hover:text-red-500"
          onClick={handlePrevious}
          disabled={pageNumber === 1}
        >
          <FaArrowLeft />
        </button>
        <div className="mx-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={page === pageNumber}
              className="cursor-pointer hover:bg-gray-300 bg-white text-black mx-1 px-2 my-1 rounded"
            >
              {page}
            </button>
          ))}
        </div>

        <span className="me-10">
          Page {pageNumber} of {totalPages}
        </span>
        <button
          className="cursor-pointer hover:text-green-500"
          onClick={handleNext}
          disabled={pageNumber === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Users;

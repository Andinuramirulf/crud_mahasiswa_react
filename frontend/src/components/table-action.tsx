import { MahasiswaProps } from "@/app/page";
import React, { useState } from "react";
import TableModalEdit from "./table-modal-edit";

type Props = {
  id: number | null;
};

const TableAction = (props: Props) => {
  const { id } = props;
  const [isShow, setShow] = useState<boolean>(false);

  const onClick = () => {
    setShow(!isShow);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:5000/mahasiswa", {
        method: "DELETE",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        console.log("Data berhasil dihapus");
        window.location.reload();
      } else {
        console.error("Gagal menghapus data");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg  hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </button>
      <div
        className={
          isShow
            ? `absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl  border border-gray-100`
            : `absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl hidden`
        }
      >
        <TableModalEdit id={id ?? null} />
        <div
          onClick={handleDelete}
          className="block px-4 py-3 cursor-pointer text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100  "
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default TableAction;

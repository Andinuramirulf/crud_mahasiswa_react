"use client";

import TableRow from "@/components/table-row";
import TableModal from "../components/table-modal";
import { useEffect, useState } from "react";

export type MahasiswaProps = {
  id: number;
  name: string;
  nim: string;
  picture: string;
  major: string;
  createdAt: string;
} | null;

export default function Home() {
  const [mahasiswa, setMahasiswa] = useState<MahasiswaProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/mahasiswa", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        const jsonData: MahasiswaProps[] = await response.json();
        setMahasiswa(jsonData);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  const addRowMahasiswa = (data: MahasiswaProps) => {
    setMahasiswa([data, ...mahasiswa]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <section className="container px-4 mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between ">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 ">
                  Mahasiswa
                </h2>

                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">
                  {mahasiswa.length} orang
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-500 ">
                Ini adalah data mahasiswa Universitas Hasanuddin
              </p>
            </div>
          </div>

          <div className="mt-6 md:flex md:items-center md:justify-between">
            <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg  rtl:flex-row-reverse  ">
              <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-white sm:text-sm  ">
                View all
              </button>
              <TableModal addRowMahasiswa={addRowMahasiswa} />
            </div>

            <div className="relative flex items-center mt-4 md:mt-0">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mx-3 text-gray-400 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Search"
                className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5    focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50 ">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          <button className="flex items-center gap-x-3 focus:outline-none">
                            No
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          <button className="flex items-center gap-x-3 focus:outline-none">
                            Nama
                          </button>
                        </th>

                        <th
                          scope="col"
                          className=" py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          NIM
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          Jurusan
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          Foto
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                        >
                          Created At
                        </th>
                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mahasiswa?.map((mhs, key) => (
                        <TableRow key={key} data={mhs} rowIndex={key + 1} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

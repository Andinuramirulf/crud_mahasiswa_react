"use client";

import React, { useState } from "react";

type Props = { id: number | null };

const TableModalEdit = (props: Props) => {
  const { id } = props;
  const [formValue, setFormValue] = useState<{
    id: number | null;
    name: string;
    nim: string;
    picture: string;
    major: string;
  }>({
    id: null,
    name: "",
    nim: "",
    picture: "",
    major: "",
  });
  const [isOpenModal, setOpenModal] = useState<boolean>();
  let openClassName =
    "fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-10";

  const openModal = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/mahasiswa/" + id, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }
      const jsonData: {
        name: string;
        nim: string;
        picture_path: string;
        major: string;
      } = await response.json();

      setFormValue({
        id: id,
        name: jsonData.name,
        nim: jsonData.nim,
        picture: jsonData.picture_path,
        major: jsonData.major,
      });
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data:", error);
    }
    setOpenModal(!isOpenModal);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/mahasiswa", {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });

      if (response.ok) {
        console.log("Data berhasil dirubah");
        window.location.reload();
      } else {
        console.error("Gagal merubah data");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <>
      <div
        onClick={openModal}
        className="block px-4 py-3 cursor-pointer text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100  "
      >
        Edit
      </div>
      <div className={isOpenModal ? openClassName : "hidden"}>
        <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
          <div className="w-full">
            <div className="m-8 my-20 max-w-[450px] mx-auto">
              <div className="mb-8">
                <h1 className="mb-4 text-3xl font-extrabold">
                  Tambah Mahasiswa
                </h1>
                <p className="text-gray-600">
                  Tambahkan data Mahasiswa dengan benar, lalu pastikan formulir
                  sudah terisi semua.
                </p>
              </div>
              <div className="mx-auto w-full bg-white">
                <form className="py-6">
                  <div className="mb-5">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Nama Mahasiswa
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formValue.name}
                      onChange={(e) =>
                        setFormValue({ ...formValue, name: e.target.value })
                      }
                      className="w-full rounded-md border border-gray-200 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-300 "
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="nim"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      NIM
                    </label>
                    <input
                      type="text"
                      name="nim"
                      id="nim"
                      value={formValue.nim}
                      onChange={(e) =>
                        setFormValue({ ...formValue, nim: e.target.value })
                      }
                      className="w-full rounded-md border border-gray-200 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-300 "
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="major"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Jurusan
                    </label>
                    <input
                      type="text"
                      name="major"
                      id="major"
                      value={formValue.major}
                      onChange={(e) =>
                        setFormValue({ ...formValue, major: e.target.value })
                      }
                      className="w-full rounded-md border border-gray-200 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-300 "
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="picture"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Url Foto Mahasiswa
                    </label>
                    <input
                      type="text"
                      name="picture"
                      id="picture"
                      value={formValue.picture}
                      onChange={(e) =>
                        setFormValue({
                          ...formValue,
                          picture: e.target.value,
                        })
                      }
                      className="w-full rounded-md border border-gray-200 bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-green-300 "
                    />
                  </div>
                </form>
              </div>
              <div className="space-y-4">
                <button
                  onClick={handleSubmit}
                  className="p-3 bg-green-200 rounded-full text-green-700 w-full font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={openModal}
                  className="p-3 bg-white border rounded-full w-full font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableModalEdit;

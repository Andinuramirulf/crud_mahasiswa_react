"use client";

import { MahasiswaProps } from "@/app/page";
import React, { useState } from "react";

type Props = {
  addRowMahasiswa: (data: MahasiswaProps) => void;
};

const TableModal = (props: Props) => {
  const { addRowMahasiswa } = props;

  const [formValue, setFormValue] = useState<{
    name: string;
    nim: string;
    picture: string;
    major: string;
  }>({
    name: "",
    nim: "",
    picture: "",
    major: "",
  });
  const [isOpenModal, setOpenModal] = useState<boolean>();
  let openClassName =
    "fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-10";

  const openModal = () => {
    setOpenModal(!isOpenModal);
    setFormValue({
      name: "",
      nim: "",
      picture: "",
      major: "",
    });
  };

  const handleSubmit = async () => {
    try {
      const response: { status: number; data: MahasiswaProps } = await fetch(
        "http://localhost:5000/mahasiswa",
        {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValue),
        }
      ).then((res) => res.json());

      if (response.status == 200) {
        openModal();
        addRowMahasiswa(response.data);
        console.log("Data berhasil ditambahkan");
      } else {
        console.error("Gagal menambahkan data ke API");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-5 py-2 text-xs font-medium text-green-600 transition-colors duration-200 bg-green-200 sm:text-sm  "
      >
        + Add Mahasiswa
      </button>
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

export default TableModal;

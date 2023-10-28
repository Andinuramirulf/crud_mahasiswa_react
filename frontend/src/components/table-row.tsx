"use client";

import React from "react";
import Image from "next/image";
import { MahasiswaProps } from "@/app/page";
import time_ago from "../../utils/time-since";
import TableAction from "./table-action";

const TableRow = (props: { data: MahasiswaProps; rowIndex: number }) => {
  const { data, rowIndex } = props;
  console.log(data?.id);

  return (
    <tr>
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="font-medium text-gray-800">{rowIndex}</h2>
        </div>
      </td>
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <h2 className="font-medium text-gray-800">{data?.name}</h2>
      </td>
      <td className="py-4 text-sm whitespace-nowrap">
        <h4 className="text-gray-700 ">{data?.nim}</h4>
      </td>
      <td className="py-4 text-sm font-medium whitespace-nowrap">
        <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 ">
          {data?.major}
        </div>
      </td>
      <td className="px-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center w-12 h-12 overflow-hidden relative">
          <Image
            fill
            sizes="300"
            style={{
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={"https://source.unsplash.com/random"}
            alt=""
          />
        </div>
      </td>
      <td className="py-4 text-sm font-medium whitespace-nowrap">
        <div className="inline px-3 py-1 text-sm font-normal rounded-full text-orange-500 gap-x-2 bg-orange-100/60 ">
          {time_ago(data?.createdAt ?? "")}
        </div>
      </td>
      <td>
        <TableAction id={data?.id ?? null} />
      </td>
    </tr>
  );
};

export default TableRow;

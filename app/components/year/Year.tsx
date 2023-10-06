"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getYearsOnly } from "@/api/api";
import LoadingBars from "../loading/LoadingBars";

type Year = {
  year: string;
};

type UniqueYear = number[];

const Year = () => {
  const router = useRouter();
  const [years, setYears] = useState<Year[]>([]);
  const [uniqueYears, setUniqueYears] = useState<UniqueYear>([]);
  const allYears: number[] = [];

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    getYears();
  }, [years]);

  const fetchYears = async () => {
    let fetchedYears: Year[] = await getYearsOnly();
    setYears(fetchedYears);
  };

  const getYears = () => {
    years.forEach((year) => allYears.push(parseInt(year.year)));
    setUniqueYears(allYears.sort((a, b) => a - b));
  };

  return (
    <main className="flex justify-center flex-wrap gap-8 m-4 pt-8">
      {uniqueYears.length > 0 ? (
        uniqueYears.map((year, index) => (
          <article
            key={index}
            className="w-[26vw] h-[13vw] flex justify-center items-center bg-secondary cursor-pointer hover:opacity-50 text-6xl shadow-lg shadow-current"
            onClick={() => router.push(`/year/${year}`)}
          >
            {year}
          </article>
        ))
      ) : (
        <LoadingBars />
      )}
    </main>
  );
};

export default Year;

// import React from "react";
// import { useRouter } from "next/navigation";
// import LoadingBars from "../loading/LoadingBars";

// type YearProps = {
//   years: string[]; // Assuming the prop is an array of years
// };

// const Year = ({ years }: YearProps) => {
//   const router = useRouter();

//   return (
//     <main className="flex justify-center flex-wrap gap-8 m-4 pt-8">
//       {years.length > 0 ? (
//         years.map((year, index) => (
//           <article
//             key={index}
//             className="w-[26vw] h-[13vw] flex justify-center items-center bg-secondary cursor-pointer hover:opacity-50 text-6xl shadow-lg shadow-current"
//             onClick={() => router.push(`/year/${year}`)}
//           >
//             {year}
//           </article>
//         ))
//       ) : (
//         <LoadingBars />
//       )}
//     </main>
//   );
// };

// export default Year;
"use client";
import {
  queryCountries,
  queryDirectors,
  queryGenres,
  queryTitles,
} from "@/api/api";
import { useState, Fragment, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Masonry from "@/utils/Masonry";
import LoadingBars from "../components/loading/LoadingBars";

type Movies = {
  stills: Still[];
  imdb_id: string;
  title: string;
};
type Still = {
  id: number;
  image_url: string;
  imdb_id: string;
};

const SearchResultsPage = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [resultsDirector, setResultsDirector] = useState<Movies[]>([]);
  const [resultsCountry, setResultsCountry] = useState<Movies[]>([]);
  const [resultsGenre, setResultsGenre] = useState<Movies[]>([]);
  const [resultsTitle, setResultsTitle] = useState<Movies[]>([]);

  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const getUniqueResults = () => {
    const combinedMovies = [
      ...resultsCountry,
      ...resultsDirector,
      ...resultsGenre,
      ...resultsTitle,
    ];

    const uniqueMovies = combinedMovies.reduce((acc: Movies[], current) => {
      const found = acc.find((movie) => movie.imdb_id === current.imdb_id);

      if (!found) return acc.concat([current]);
      else return acc;
    }, []);

    setMovies(uniqueMovies);
  };

  const getQueryResults = async (query: string | null) => {
    if (query === null) return;

    const directors = await queryDirectors(query);
    setResultsDirector(directors);

    const genres = await queryGenres(query);
    setResultsGenre(genres);

    const countries = await queryCountries(query);
    setResultsCountry(countries);

    const titles = await queryTitles(query);
    setResultsTitle(titles);
  };

  useEffect(() => {
    getQueryResults(query);
  }, [query]);

  useEffect(() => {
    getUniqueResults();
  }, [resultsCountry, resultsDirector, resultsGenre, resultsTitle]);

  return (
    <main className="mr-4 pt-4 ">
      <Masonry breakpointCols={3} className="flex" columnClassName="pl-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Fragment key={movie.imdb_id}>
              <div className="relative group overflow-hidden bg-gray-400 mb-4">
                <Link href={`/movie/${movie.imdb_id}`}>
                  <img
                    src={movie.stills[22]?.image_url}
                    alt={movie.title}
                    className="transition-transform transform group-hover:scale-110 w-full h-auto "
                  />
                  <div className="overflow-hidden absolute inset-0 bg-black bg-opacity-40 group-hover:opacity-100 opacity-0 transition-opacity flex justify-center items-center">
                    <span className="text-white font-bold z-10">
                      <h1>{movie.title}</h1>
                    </span>
                  </div>
                </Link>
              </div>
            </Fragment>
          ))
        ) : (
          <aside className="w-screen flex justify-center">
            <LoadingBars />
          </aside>
        )}
      </Masonry>
    </main>
  );
};

export default SearchResultsPage;

"use client";
import React, { useState, useEffect } from "react";
import { queryDirectors } from "@/api/api";
import Link from "next/link";
import LoadingBars from "@/app/components/loading/LoadingBars";
import Masonry from "react-masonry-css";

const DirectorResultsPage = ({ params }: DirectorParamsProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMoviesByDirector();
  }, []);

  const fetchMoviesByDirector = async () => {
    const fetchedMovies = await queryDirectors(params.director);
    setMovies(fetchedMovies);
  };

  return (
    <main className="mr-4 pt-8">
      <Masonry breakpointCols={3} className="flex" columnClassName="pl-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <article
              key={movie.imdb_id}
              className="relative group overflow-hidden bg-gray-400 mb-4"
            >
              <img
                src={movie.stills[11]?.image_url}
                alt={movie.title}
                className="transition-transform transform group-hover:scale-110 w-full h-auto "
              />
              <div className="overflow-hidden absolute inset-0 bg-black bg-opacity-40 group-hover:opacity-100 opacity-0 transition-opacity flex justify-center items-center">
                <span className="text-white font-bold z-10">
                  <Link href={`/movie/${movie.imdb_id}`}>
                    <h1>{movie.title}</h1>
                  </Link>
                </span>
              </div>
            </article>
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

export default DirectorResultsPage;
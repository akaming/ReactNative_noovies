import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { movieApi } from "../../api";
import MoviesPresenter from "./MoviesPresenter";

export default () => {
  const [refreshing, setRefresing] = useState(false);
  const [movies, setMovies] = useState({
    loading: true,
    nowPlaying: [],
    popular: [],
    upcoming: [],
    nowPlayingError: null,
    popuplarError: null,
    upcomingError: null,
  });
  const getData = async () => {
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying(); // nowPlaying은 getAnything을 부른다.
    const [popular, popularError] = await movieApi.popular();
    const [upcoming, upcomingError] = await movieApi.upcoming();
    setMovies({
      loading: false,
      nowPlaying: nowPlaying.filter((movie) => !!movie.backdrop_path),
      popular,
      upcoming,
      nowPlayingError,
      popularError,
      upcomingError,
    });
  };

  // useEffecf를 사용해서 getData를 call
  // 이건 component 가 mount 됐을때만 사용됨
  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefresing(true);
    await getData();
    setRefresing(false);
  };

  return <MoviesPresenter refreshFn={getData} {...movies} />;
};

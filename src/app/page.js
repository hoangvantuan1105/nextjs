import Header from "../components/header/page";
import HeroSlideItem from "../components/HeroSlideItem/page";
import TopMovieSlide from "../components/TopMovieSlide/page";
import LatestMoviesSlide from "../components/latestMovie/page";
import EpisodeMovie from "../components/episodeMovie/page"
import Pricing from "../components/Pricing/page";
import Footer from "../components/footer/page";
export default function Page() {
  return (
    <>
      <Header />
      <HeroSlideItem />
      <TopMovieSlide />
      <LatestMoviesSlide/>
      <EpisodeMovie/>
      <Pricing/>
      <Footer/>
    </>
  );
}

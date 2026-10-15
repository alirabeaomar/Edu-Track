import Image from "next/image";
import HeroBanner from "../componant/HeroBanner";
import FilterSection from "../componant/FilterSection";

export default function Home() {
  return (
    <div>
      <HeroBanner/>
      <FilterSection/>
    </div>
  );
}

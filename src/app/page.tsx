import Image from "next/image";
import HeroBanner from "../componant/HeroBanner";
import FilterSection from "../componant/FilterSection";
import InfoToPage from "../componant/InfoToPage";
import CollegeChatbot from "../componant/CollegeChatbot";

export default function Home() {
  return (
    <div>

      <HeroBanner/> 
      <InfoToPage/>
      <CollegeChatbot/>
      <FilterSection/>
    </div>
  );
}

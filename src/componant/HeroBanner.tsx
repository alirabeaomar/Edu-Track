import Image from "next/image";
export default function HeroBanner() {
  return (
    <section className="bg-blue-550 py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="relative w-full h-[200px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-blue-100 border-4 border-white flex items-center justify-center">
  
            <Image 
              src="/hero.jpg" 
              alt="Edu Track Banner" 
              fill 
              className="object-cover" 
              priority 
            /> 
            

        </div>

      </div>
    </section>
  );
}
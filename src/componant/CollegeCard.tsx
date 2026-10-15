import { CollegeDetail } from "@/data/collegeDetailsData";

interface CollegeCardProps {
  collegeData: CollegeDetail;
}

export default function CollegeCard({ collegeData }: CollegeCardProps) {
  if (!collegeData) return null;

  // قاموس شاطر لترجمة أسماء السنوات حتى السنة السابعة (امتياز)
  const yearNamesMap: Record<string, string> = {
    firstYear: "الفرقة الأولى",
    secondYear: "الفرقة الثانية",
    thirdYear: "الفرقة الثالثة",
    fourthYear: "الفرقة الرابعة",
    fifthYear: "الفرقة الخامسة",
    sixthYear: "الفرقة السادسة / سنة الامتياز الأولى",
    seventhYear: "الفرقة السابعة / سنة الامتياز الثانية",
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl transition-all duration-300 space-y-6">
      
      {/* رأس الكارد */}
      <div className="border-b border-blue-400 pb-4">
        <span className="bg-white text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
          تفاصيل الكلية والمناهج
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold mt-2">
          {collegeData.name}
        </h3>
        <p className="text-blue-100 text-sm sm:text-base mt-2 leading-relaxed">
          {collegeData.description}
        </p>
      </div>

      {/* التخصصات */}
      <div className="bg-blue-700/50 p-5 rounded-2xl border border-blue-500/30">
        <h4 className="text-lg font-semibold text-blue-200 mb-3 flex items-center gap-2">
          🎓 الأقسام والتخصصات المتاحة:
        </h4>
        <div className="flex flex-wrap gap-2">
          {collegeData.specializations?.map((spec, idx) => (
            <span key={idx} className="bg-blue-800/80 text-blue-100 text-sm px-3 py-1.5 rounded-xl border border-blue-400/30">
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* المناهج الدراسية (ديناميكية حسب عدد سنوات الكلية) */}
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-blue-200 flex items-center gap-2">
          📅 المواد الدراسية حسب السنوات والفصول الدراسية:
        </h4>

        <div className="space-y-4">
          {Object.entries(collegeData.years || {}).map(([yearKey, yearTerms]) => (
            <div key={yearKey} className="bg-blue-700/40 p-5 rounded-2xl border border-blue-500/30 space-y-4">
              <h5 className="font-bold text-blue-300 text-lg border-b border-blue-500/30 pb-2">
                {yearNamesMap[yearKey] || yearKey}
              </h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* الترم الأول */}
                <div className="bg-blue-800/50 p-3.5 rounded-xl border border-blue-400/20">
                  <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-md mb-2">
                    الترم الأول 📖
                  </span>
                  <ul className="space-y-1.5 text-sm text-white">
                    {yearTerms.firstTerm?.map((sub, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* الترم الثاني */}
                <div className="bg-blue-800/50 p-3.5 rounded-xl border border-blue-400/20">
                  <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-md mb-2">
                    الترم الثاني 📚
                  </span>
                  <ul className="space-y-1.5 text-sm text-white">
                    {yearTerms.secondTerm?.map((sub, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
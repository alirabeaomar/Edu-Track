"use client";

import { useState } from "react";
import governmentUniversities from "@/data/governmentUniversities";
import { collegeDetailsData } from "@/data/collegeDetailsData";
import CollegeCard from "./CollegeCard";

export default function FilterSection() {
  const [selectedFirst, setSelectedFirst] = useState<string>("");
  const [selectedSecond, setSelectedSecond] = useState<string>("");
  const [selectedThird, setSelectedThird] = useState<string>("");

  // حالات فتح/إغلاق القوائم المخصصة
  const [openFirst, setOpenFirst] = useState<boolean>(false);
  const [openSecond, setOpenSecond] = useState<boolean>(false);
  const [openThird, setOpenThird] = useState<boolean>(false);

  const firstOptions = [
    { id: "government", name: "جامعة حكومية" },
    { id: "national", name: "جامعة أهلية" },
    { id: "private", name: "جامعة خاصة" },
  ];

  // جلب الجامعات بناءً على النوع المختار
  const getSecondOptions = (): string[] => {
    if (selectedFirst === "government") {
      return Object.keys(governmentUniversities);
    }
    return [];
  };

  // جلب الكليات الخاصة بالجامعة المختارّة
  const getThirdOptions = (): string[] => {
    if (selectedFirst === "government" && selectedSecond) {
return governmentUniversities[selectedSecond as keyof typeof governmentUniversities] || [];    }
    return [];
  };

  // جلب اسم نوع الجامعة المختار للعرض
  const getSelectedFirstName = () => {
    return firstOptions.find((opt) => opt.id === selectedFirst)?.name || "اختر النوع...";
  };

  // دالة ذكية ومرنة لجلب بيانات الكلية لضمان ظهور الكارد دائماً
  const getCollegeData = () => {
    if (!selectedThird) return null;

    // 1. مطابقة تامة لاسم الكلية في الداتا
    if (collegeDetailsData[selectedThird]) {
      return collegeDetailsData[selectedThird];
    }

    // 2. مطابقة مرنة (لو الاسم يحتوي على كلمة هندسة، طب، صيدلة، حاسبات...)
    const foundKey = Object.keys(collegeDetailsData).find((key) => 
      selectedThird.includes(key) || key.includes(selectedThird)
    );

    if (foundKey) {
      return collegeDetailsData[foundKey];
    }

    // 3. قالب افتراضي آمن يمنع اختفاء الكارد لأي كلية أخرى
    

  };

  const currentCollegeData = getCollegeData();

  return (
    <section className="bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* حاوية الاختيارات Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-blue-50 p-6 rounded-2xl shadow-md border border-blue-100">
          
          {/* 1. نوع الجامعة */}
          <div className="flex flex-col relative">
            <label className="text-blue-900 font-semibold mb-2 text-sm">
              1. نوع الجامعة
            </label>
            <button
              type="button"
              onClick={() => {
                setOpenFirst(!openFirst);
                setOpenSecond(false);
                setOpenThird(false);
              }}
              className="w-full text-right p-3 rounded-xl border border-blue-200 bg-white text-gray-700 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
            >
              <span>{getSelectedFirstName()}</span>
              <span className={`transform transition-transform ${openFirst ? "rotate-180" : ""}`}>▼</span>
            </button>

            {/* قائمة خيارات سكرول */}
            {openFirst && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-blue-200 rounded-xl shadow-lg z-30 max-h-56 overflow-y-auto">
                {firstOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setSelectedFirst(opt.id);
                      setSelectedSecond("");
                      setSelectedThird("");
                      setOpenFirst(false);
                    }}
                    className={`p-3 text-sm cursor-pointer hover:bg-blue-50 transition border-b border-gray-100 last:border-none ${
                      selectedFirst === opt.id ? "bg-blue-100 font-bold text-blue-900" : "text-gray-700"
                    }`}
                  >
                    {opt.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. اسم الجامعة */}
          <div className="flex flex-col relative">
            <label className="text-blue-900 font-semibold mb-2 text-sm">
              2. اختر الجامعة
            </label>
            <button
              type="button"
              disabled={!selectedFirst}
              onClick={() => {
                setOpenSecond(!openSecond);
                setOpenFirst(false);
                setOpenThird(false);
              }}
              className="w-full text-right p-3 rounded-xl border border-blue-200 bg-white text-gray-700 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              <span className="truncate">
                {selectedSecond ? selectedSecond : selectedFirst ? "اختر الجامعة..." : "اختر الخطوة السابقة أولاً"}
              </span>
              <span className={`transform transition-transform ${openSecond ? "rotate-180" : ""}`}>▼</span>
            </button>

            {/* قائمة خيارات سكرول للجامعات */}
            {openSecond && selectedFirst && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-blue-200 rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto custom-scrollbar">
                {getSecondOptions().map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedSecond(item);
                      setSelectedThird("");
                      setOpenSecond(false);
                    }}
                    className={`p-3 text-sm cursor-pointer hover:bg-blue-50 transition border-b border-gray-100 last:border-none ${
                      selectedSecond === item ? "bg-blue-100 font-bold text-blue-900" : "text-gray-700"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. الكلية */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1 relative">
            <label className="text-blue-900 font-semibold mb-2 text-sm">
              3. الكلية
            </label>
            <button
              type="button"
              disabled={!selectedSecond}
              onClick={() => {
                setOpenThird(!openThird);
                setOpenFirst(false);
                setOpenSecond(false);
              }}
              className="w-full text-right p-3 rounded-xl border border-blue-200 bg-white text-gray-700 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              <span className="truncate">
                {selectedThird ? selectedThird : selectedSecond ? "اختر الكلية..." : "اختر الخطوة السابقة أولاً"}
              </span>
              <span className={`transform transition-transform ${openThird ? "rotate-180" : ""}`}>▼</span>
            </button>

            {/* قائمة خيارات سكرول للكليات */}
            {openThird && selectedSecond && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-blue-200 rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto custom-scrollbar">
                {getThirdOptions().map((college, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedThird(college);
                      setOpenThird(false);
                    }}
                    className={`p-3 text-sm cursor-pointer hover:bg-blue-50 transition border-b border-gray-100 last:border-none ${
                      selectedThird === college ? "bg-blue-100 font-bold text-blue-900" : "text-gray-700"
                    }`}
                  >
                    {college}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* عرض الكارد المنفصل فور اختيار الكلية وتوفر بياناتها */}
        {selectedThird && currentCollegeData && (
          <CollegeCard collegeData={currentCollegeData} />
        )}

      </div>
    </section>
  );
}
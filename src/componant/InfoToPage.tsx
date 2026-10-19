"use client";

export default function InfoToPage() {
  const stats = [
    {
      number: "+50",
      title: "جامعة مصرية وعالمية",
      description: "حكومية، أهلية، وخاصة معتمدة بالكامل",
      icon: "🏛️",
    },
    {
      number: "+250",
      title: "كلية وبرنامج دراسي",
      description: "تغطية شاملة لجميع التخصصات الطبية والهندسية والتكنولوجية",
      icon: "🎓",
    },
    {
      number: "+1000",
      title: "مقرر دراسي تفصيلي",
      description: "مناهج دقيقة لجميع السنوات والترم الأول والثاني",
      icon: "📚",
    },
    {
      number: "100%",
      title: "تحديث مستمر ودقيق",
      description: "متابعة دورية لأحدث اللوائح والبرامج الأكاديمية",
      icon: "⚡",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-blue-50/50 py-16 px-4 border-t border-blue-100">
      <div className="max-w-7xl mx-auto">
        
        {/* عنوان القسم */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            منصتنا بالأرقام
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
            بوابتك الشاملة لاستكشاف التعليم العالي في مصر
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            نجمع لك كافة تفاصيل الكليات والجامعات والمناهج الدراسية بتصميم تفاعلي وسهل الوصول.
          </p>
        </div>

        {/* شبكة الإحصائيات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100 flex flex-col items-center text-center group hover:-translate-y-1"
            >
              {/* أيقونة تعبيرية */}
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                {stat.icon}
              </div>

              {/* الرقم البارز */}
              <span className="text-3xl sm:text-4xl font-black text-blue-900 mb-2 tracking-tight">
                {stat.number}
              </span>

              {/* عنوان الإحصائية */}
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {stat.title}
              </h3>

              {/* الوصف التفصيلي */}
              <p className="text-xs text-gray-500 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
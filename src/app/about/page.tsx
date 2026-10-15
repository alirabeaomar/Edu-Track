export default function AboutSection() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-2xl p-8 sm:p-12 text-center transition-all duration-300 hover:shadow-blue-200/50">
        
        {/* شارة توضيحية */}
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
          عن منصة Edu Track
        </span>

        {/* عنوان رئيسي */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 mb-6 leading-tight">
          دليلك الأكاديمي الشامل لجميع جامعات مصر و كلياتها و تخصوصاتها
        </h1>

        {/* نبذة عن الموقع */}
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
          منصة <span className="font-semibold text-blue-600">Edu Track</span> وُدت لتكون المرجع الأول لكل طالب يبحث عن تفاصيل كليات الحاسبات والذكاء الاصطناعي والتكنولوجيا في الجامعات المصرية (الحكومية، الأهلية، والخاصة). نهدف لتسهيل عملية استكشاف الأقسام، المناهج، والفرق الدراسية لتمكين الطلاب من اتخاذ القرار الأنسب لمستقبلهم الرقمي.
        </p>

        {/* خط فاصل أنيق */}
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8"></div>

        {/* قسم أهدافنا (تمت إضافته وتطويره) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-right">
          
          <div className="bg-blue-50/80 border border-blue-100 p-5 rounded-2xl flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h4 className="font-bold text-blue-900 text-sm sm:text-base mb-1">تقليل الوقت والجهد</h4>
              <p className="text-gray-600 text-xs sm:text-sm">نوفر لك كل تفاصيل الكليات ومناهجها في ثوانٍ معدودة بدلاً من التفتيش في مواقع متعددة.</p>
            </div>
          </div>

          <div className="bg-blue-50/80 border border-blue-100 p-5 rounded-2xl flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h4 className="font-bold text-blue-900 text-sm sm:text-base mb-1">الاستغناء عن عناء البحث</h4>
              <p className="text-gray-600 text-xs sm:text-sm">منصة مركزية واحدة تجمع كافة جامعات مصر وأقسامها الدراسية بدقة عالية ومنظمة.</p>
            </div>
          </div>

        </div>

        {/* قسم فريق العمل / من أنشأ الموقع */}
        <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-inner">
          <h3 className="text-lg font-bold text-blue-200 mb-2">
            💡 من نحن وراء هذا العمل؟
          </h3>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            تم تطوير هذه المنصة بشغف وعناية بواسطة مطورين كليه حاسبات و معلومات قنا يهدفون لرفع مستوى جودة المحتوى التعليمي الرقمي في مصر باستخدام أحدث تقنيات الويب  <span className="font-semibold text-white"></span>.
          </p>
        </div>

        {/* زر تفاعلي أو رابط عودة */}
        <div className="mt-8">
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            استكشف الكليات الآن 
          </a>
        </div>

      </div>
    </section>
  );
}
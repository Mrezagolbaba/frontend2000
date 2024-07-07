import LandingLayout from "layouts/Landing";
import { BreadcrumbItem, Container, Breadcrumb } from "reactstrap";

import home from "assets/scss/landing/home.module.scss";
import rules from "assets/scss/landing/rules.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function RulesPage() {
  const jumpToReleventDiv = (id) => {
    const releventDiv = document.getElementById(id);
    // behavior: "smooth" parameter for smooth movement
    releventDiv?.scrollIntoView({behavior: "smooth"});
  }
  useEffect(() => {
    //https://arsonex.com/terms/#privacy get the id from the url
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      jumpToReleventDiv(id);
    }
  }, []);

  return (
    <LandingLayout disableBanner={true}>
      <main className={home["main-wrapper"]}>
        <Container className={`${rules["page"]}`}>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/">آرسونیکس</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active className={rules["breadcrumb-item-custom"]}>
              قوانین و مقررارت
            </BreadcrumbItem>
          </Breadcrumb>
          <div className={rules["rules"]}>
            <div
              className={`${rules["page-header"]} ${rules["page-header--flex"]} ${rules["page-header--mb50"]}`}
            >
              <h1 className={rules["page-title"]}>قوانین و مقررات آرسونیکس</h1>
              <p className={rules["page-text"]}>
                متنی که در ادامه آن را مطالعه خواهید کرد، حاوی شرایطی است که شما
                با استفاده یا مشاهده از ابزارها، محتوا و سرویس‌های "آرسونیکس"،
                به‌عنوان یک کاربر، می‌پذیرید. این توافق‌نامه به عنوان یک قرارداد
                میان "آرسونیکس" به‌عنوان ارائه‌دهنده خدمات در زمینه ارزهای
                دیجیتال و شما به‌عنوان کاربر، شامل مفادی است که برای حل اختلافات
                بین "آرسونیکس" و شما، به مراجع قانونی کشور مورد استفاده قرار
                می‌گیرد. همچنین، این توافق‌نامه قابل تغییر است و امکان تغییرات
                در آن در بازه‌های زمانی مختلف، بسته به شرایط فعلی کشور، وجود
                دارد.
                <strong>
                  هیچ گونه تبادل ارزی کاغذی اعم از معامله دلار یا سایر
                  ارزهای کاغذی، در آرسونیکس صورت نمی گیرد.
                </strong>{" "}
                کاربر می‌تواند جهت اطلاع از تغییرات ممکن، در بازه‌های زمانی
                مختلف این صفحه را بررسی نماید.
              </p>
            </div>

            <div
              className={`${rules["rules-summary"]} ${rules["rules-summary--mb50"]}`}
            >
              <div className={`${rules["rules-text"]}`}>
                <h3>مقدمه</h3>
                <p>
                  عبارات و متن‌های استفاده شده در این متن به معنای زیر هستند:
                </p>
                <p>
                  <strong>آرسونیکس: </strong>یک پلتفرم معاملات ارز و ارز دیجیتال
                  است که طبق قوانین کشور مربوطه عمل می‌کند و به صورت رسمی فعالیت
                  می‌نماید.
                </p>
                <p>
                  <strong>احراز هویت: </strong>کاربران حقیقی یا حقوقی برای
                  استفاده از خدمات آرسونیکس ملزم به احراز هویت هستند. برای انجام
                  این احراز هویت، کاربران باید اطلاعات شخصی خود را وارد کنند، که
                  شامل نام و نام خانوادگی، تاریخ تولد، شماره همراه و کد ملی
                  می‌شود. همچنین، برای تایید اطلاعات و احراز هویت فردی که
                  اطلاعات را وارد کرده است، ارسال یک ویدیو احراز هویت یا تصویر
                  سلفی همراه با یک مدرک هویت معتبر الزامی است.
                </p>
                <p>
                  <strong>کاربر: </strong>هر فرد حقیقی یا حقوقی که در وب‌سایت
                  arsonex.com ثبت نام کند و هویت او توسط آرسونیکس احراز گردد، به
                  عنوان کاربر آرسونیکس شناخته می‌شود و می‌تواند طبق قوانین و
                  مقررات تعیین شده، از خدمات این پلتفرم بهره‌مند شود.
                </p>
                <p>
                  <strong>حساب کاربری: </strong>حساب کاربری به عنوان یک بخش از
                  وب‌سایت آرسونیکس تعریف می‌شود، که به وسیله احراز هویت فرد،
                  امکان دسترسی به بخش‌های معامله و تبدیل فراهم می‌شود. برای
                  استفاده از بخش معامله و تبدیل، لازم است فرد ابتدا مراحل
                  احراز هویت را طی کرده و تایید آن توسط آرسونیکس صورت پذیرد.
                </p>
                <p>
                  <strong>کیف پول: </strong> حساب کاربری شامل یک بخش است که
                  کاربر می‌تواند دارایی‌های واریزی یا تبدیل شده خود را در آن
                  مشاهده کند، و مالکیت کل دارایی‌های کیف پول به کاربر احراز هویت
                  شده تعلق دارد.
                </p>
                <p>
                  <strong>دعوت از دوستان: </strong>این بخش از حساب کاربری، فرصتی
                  را برای کسب درآمد از طریق دعوت افراد دیگر به آرسونیکس فراهم
                  می‌کند و شرایط استفاده از این امکان توسط آرسونیکس تعیین
                  می‌شود.
                </p>
                <p></p>
              </div>
            </div>
            <div
              className={`${rules["rules-summary"]} ${rules["rules-summary--mb50"]}`}
            >
              <div className={`${rules["rules-text"]}`}>
                <h3>شرایط استفاده از خدمات</h3>
                <p>
                  تنها مراجع رسمی برای دسترسی به خدمات آرسونیکس، آدرس‌های
                  اینترنتی Arsonex.com و Arsonex.ir هستند. خدمات آرسونیکس در هیچ
                  شبکه اجتماعی یا آدرس دیگری ارائه نمی‌شود. استفاده از هر روش
                  دیگری برای دریافت خدمات، مورد تایید آرسونیکس نمی‌باشد، و هر
                  گونه مسئولیت مربوط به استفاده و هر گونه خسارت به دارایی کاربر
                  به عهده ایشان است.
                </p>
                <p>
                  افرادی که تصمیم به استفاده از خدمات آرسونیکس دارند، موظف به
                  مطالعه قوانین این صفحه و پذیرش آن‌ها پیش از ثبت نام می‌باشند.
                </p>
                <p>
                  استفاده از خدمات آرسونیکس به این معناست که کاربر تمامی قوانین
                  و مقررات را پذیرفته و به آن‌ها پایبند است.
                </p>
                <p>
                  آرسونیکس یک پلتفرم برای خرید، فروش، و تبدیل ارز و ارز دیجیتال
                  است.
                </p>
                <p>
                  آرسونیکس به اطمینان از اجرای کامل احکام قوانین ضدپولشویی
                  بین‌المللی و قوانین جمهوری اسلامی ایران ملزم است و برای
                  جلوگیری از هر گونه سواستفاده از خدمات، احراز هویت کامل کاربران
                  را انجام می‌دهد.
                </p>
                <p>
                  آرسونیکس ممکن است مدارک هویتی را به صورت ویدیو یا تصویر از
                  کاربر درخواست کند، و کاربر برای استفاده از خدمات، موظف به
                  ارسال مدارک مورد نیاز آرسونیکس است.
                </p>
                <p>
                  آرسونیکس بدون دستور مستقیم از مراجع قضایی (قوه قضائیه)، هیچ
                  اطلاعات هویتی یا مستندات معاملات کاربر را به هیچ نهاد، سازمان
                  یا فردی ارائه نمی‌دهد.
                </p>
                <p>
                  آرسونیکس به صورت پیشفرض از اطلاعات کاربران فقط برای ارسال
                  اطلاع رسانی‌های تبلیغاتی یا بروزرسانی‌های سیستم استفاده می‌کند
                  و هیچ یک از اطلاعات کاربران را در اختیار هیچ سازمان، پلتفرم یا
                  فردی برای استفاده‌های تجاری یا غیرتجاری قرار نمی‌دهد.
                </p>
                <p>
                  آرسونیکس علاوه بر اطاعت از قوانین جمهوری اسلامی ایران، از
                  قوانین بین‌المللی نیز پیروی کرده و هیچ گونه اقدامی خارج از این
                  قوانین را انجام نمی‌دهد.
                </p>
                <p>
                  همه واریزها و برداشت‌های انجام شده توسط کاربران در بخش‌های ارز
                  دیجیتال، تومان یا فیات باید با رعایت قوانین بین‌المللی و
                  جمهوری اسلامی ایران هماهنگ باشند.
                </p>
                <p>
                  در هنگام برداشت دارایی، که شامل ارز دیجیتال، تومان یا فیات
                  می‌باشد، کاربر موظف به دقت در وارد کردن اطلاعات است. در صورتی
                  که کاربر اطلاعات را به‌طور اشتباه وارد کند، ضمن این‌که امکان
                  بازگشت دارایی وجود ندارد، هیچ مسئولیتی توسط آرسونیکس قبول
                  نخواهد شد و تمامی خسارات احتمالی بر عهده کاربر است.
                </p>
                <p>
                  آرسونیکس در سود یا زیان معامله ارزهای دیجیتال، تومان یا فیات
                  خریداری یا فروخته شده، ذی‌نفع نیست. بدیهی است که آرسونیکس به
                  هیچ عنوان در پوشش ریسک معاملات این چنینی نخواهد بود و مسئولیتی
                  ندارد. هرگونه ریسک مرتبط با استفاده از ارزهای دیجیتال یا دیگر
                  معاملات در پلتفرم بر عهده کاربر است.
                </p>
                <p>
                  کاربر بعد از برداشت هر گونه دارایی از کیف پول خود می‌تواند از
                  آن‌ها به طریقی که با قوانین بین‌المللی یا جمهوری اسلامی ایران
                  در تضاد نباشد، استفاده نماید.
                </p>
                <p>
                  کاربر باید بلافاصله پس از انتقال ارز دیجیتال به کیف پول خود،
                  شناسه TXT مرتبط را در بخش مشخص شده در کیف پول وارد کند. در
                  صورتی که کاربر این اقدام را تا یک ساعت پس از واریز انجام ندهد،
                  آرسونیکس هیچگونه مسئولیتی در قبال دارایی واریز شده را نخواهد
                  داشت.
                </p>
                <p>
                  پلتفرم معاملاتی آرسونیکس در تمامی ساعات شبانه روز و هفت روز
                  هفته برای کاربرانی که هویت خود را احراز کرده‌اند، در دسترس
                  قرار دارد. ساعات پشتیبانی آرسونیکس از ساعت ۹ صبح تا ۵ بعد از
                  ظهر هر روز ارائه می‌شود.
                </p>
                <p></p>
              </div>
            </div>
            <div
              className={`${rules["rules-summary"]} ${rules["rules-summary--mb50"]}`}
            >
              <div className={`${rules["rules-text"]}`}>
                <h3>
                  قوانین مبارزه با پولشویی؛ بین‌الملل و جمهوری اسلامی ایران
                </h3>
                <p>
                  هور تابان تجارت الکترونیک، با نام تجاری "آرسونیکس"، به‌عنوان
                  یک شرکت سهامی خاص در ایران به ثبت رسیده و طبق قوانین جمهوری
                  اسلامی ایران فعالیت می‌نماید. هرگونه فعالیتی که ممکن است
                  به‌عنوان تخلف از قوانین جمهوری اسلامی ایران تلقی شود، در تضاد
                  با مفاد این توافق‌نامه و نقض شرایط آن محسوب می‌شود. آرسونیکس
                  هیچگونه نقض قوانین یا فعالیت غیرقانونی را با استفاده از خدمات
                  خود پذیرفته نمی‌کند. به‌محض آگاهی از هر گونه فعالیت مجرمانه یا
                  نقض قوانین، آرسونیکس بلافاصله اقدام به مسدودسازی حساب کاربری
                  متخلف می‌نماید و اطلاعات مربوطه را به مراجع قضایی اعلام
                  می‌کند.
                </p>
                <p>
                  با توجه به دستور مستقیم پلیس فتا، تسویه ارز دیجیتال پس از ۷۲
                  ساعت از زمان تبدیل یا معامله انجام خواهد شد.
                </p>
                <p>
                  استفاده از خدمات آرسونیکس به‌منظور اقداماتی همچون تامین مالی
                  تروریسم، پول‌شویی، تأمین مالی برای فعالیت‌های غیرقانونی،
                  انتقال از منابع غیرشفاف، و همچنین فرار از تحریم‌های بین‌المللی
                  به عنوان تخلف در نظر گرفته می‌شود. در صورت انجام هر یک از این
                  عملیات، حساب کاربری به‌صورت خودکار توسط سامانه مسدود و متخلف
                  از ادامه استفاده منع خواهد شد.
                </p>
                <p>
                  در صورتی که یک مرجع قضایی نیاز به همکاری کاربر برای روشن شدن
                  ابعاد مختلف یک مسئله داشته باشد، کاربر ملزم است تا به انتهای
                  فرآیند بررسی، تمامی همکاری‌های لازم را با مراجع مرتبط انجام
                  دهد. در صورتی که کاربر از این همکاری امتناع کند، حساب کاربری
                  او به‌صورت خودکار مسدود خواهد شد و هیچ گونه خدماتی به او ارائه
                  نخواهد شد.
                </p>
                <p>
                  تمام تراکنش‌های انجام شده در زیرساخت ارز دیجیتال به دلیل ماهیت
                  بلاکچین، قابل مشاهده برای هر فرد، نهاد یا سازمانی است.
                  بنابراین، آرسونیکس قادر به غیرفعال کردن این دسترسی نمی‌باشد.
                </p>
              </div>
            </div>
            <div
              className={`${rules["rules-summary"]} ${rules["rules-summary--mb50"]}`}
            >
              <div className={`${rules["rules-text"]}`}>
                <h3>حساب کاربری؛ ایجاد، مدیریت و نگهداری</h3>
                <p>
                  استفاده از خدمات آرسونیکس تنها برای افرادی ممکن است که بیش از
                  ۱۸ سال سن داشته باشند و به شرایط قانونی مربوطه پایبند باشند.
                </p>
                <p>
                  اگر کاربر پس از انجام احراز هویت و تایید توسط آرسونیکس، تغییری
                  در اطلاعات هویتی خود را از طریق مراجع قانونی اعمال کند، وی
                  ملزم است اطلاع رسانی کند تا اطلاعات در آرسونیکس به‌روزرسانی
                  شود.
                </p>
                <p>
                  هیچ فردی مجاز به ایجاد حساب کاربری با استفاده از اطلاعات یا
                  بدون اطلاع افراد دیگر نیست، به جز نمایندگان قانونی اشخاص حقوقی
                  و حقیقی.
                </p>
                <p>
                  با انجام ثبت نام در آرسونیکس، کاربر موافقت می‌کند که اعلانات
                  را از طریق پیامک یا ایمیل دریافت کند. در صورت غیرفعال نمودن
                  ارسال اعلانات توسط کاربر، هیچگونه مسئولیتی برای عدم دریافت
                  توصیه‌های امنیتی یا بروزرسانی‌ها از سوی آرسونیکس وجود نخواهد
                  داشت.
                </p>
                <p>
                  در صورت ایجاد بیش از یک حساب کاربری توسط افراد حقیقی یا حقوقی،
                  آرسونیکس این اختیار را برای خود محفوظ نموده و در صورت لزوم،
                  تمام حساب‌های کاربری مرتبط را مسدود کند.
                </p>
                <p>
                  اگر یک کاربر با استفاده از اطلاعات افراد دیگر حساب کاربری در
                  آرسونیکس ایجاد کند، آرسونیکس اختیار دارد حساب کاربری را مسدود
                  کرده و مسأله را به مراجع قضایی اطلاع دهد.
                </p>
                <p>
                  اگر اطلاعات حساب کاربری به هر دلیلی از دست رفت، کاربر ملزم است
                  به آرسونیکس اطلاع دهد تا حساب کاربری مسدود گردد. در صورتی که
                  این اطلاع را به آرسونیکس اعلام نکند، تمام مسئولیت‌های قانونی
                  یا از دست رفتن دارایی به عهده کاربر خواهد بود و هیچ مسئولیتی
                  بر عهده آرسونیکس قرار نخواهد گرفت.
                </p>
              </div>
            </div>
            <div
              className={`${rules["rules-summary"]} ${rules["rules-summary--mb50"]}`}
            >
              <div className={`${rules["rules-text"]}`}>
                <h3>احراز هویت؛ حقیقی و حقوقی</h3>
                <p>
                  آرسونیکس ملزم است برای جلوگیری از تامین مالی تروریسم و
                  پولشویی، به پیروی از قوانین بین‌المللی و جمهوری اسلامی ایران
                  برای احراز هویت کامل کاربران خود مشغول باشد.
                </p>
                <p>
                  آرسونیکس هیچ‌گونه اطلاعات هویتی کاربر را تحت هیچ شرایطی با شخص
                  ثالث به اشتراک نمی‌گذارد. در صورت دریافت یک نامه کتبی معتبر از
                  قوه قضاییه، تنها اطلاعات مورد نیاز کاربر به نهاد قانونی مربوطه
                  ارسال می‌شود.
                </p>
                <p>
                  در آرسونیکس، فرآیند احراز هویت دو مرحله‌ای است، که شامل سطح یک
                  و سطح دو می‌شود. با وارد کردن اطلاعات هویتی، کاربر به طور
                  خودکار به سطح یک ارتقا پیدا می‌کند و با ارسال مدارک هویتی و
                  تصویر یا ویدیو سلفی، پس از بررسی توسط کارشناسان، به سطح دو
                  انتقال می‌یابد.
                </p>
                <p>
                  کاربر با وارد کردن اطلاعات هویتی به صورت خودکار به سطح یک
                  ارتقا می‌یابد و پس از ارسال مدارک هویتی و تصویر یا ویدیو سلفی،
                  بعد از بررسی توسط کارشناسان به سطح دو منتقل می‌شود.
                </p>
                <p>
                  برای ایجاد حساب حقوقی در آرسونیکس، لازم است معرفی‌نامه نماینده
                  رسمی جهت افتتاح حساب حقوقی ارائه گردد. این معرفی‌نامه باید در
                  سربرگ رسمی شرکت حاوی مهر شرکت با امضای کلیه صاحبان امضاهای
                  مجاز شرکت باشد. متن معرفی‌نامه باید شامل عبارت "جهت افتتاح
                  حساب حقوقی برای شرکت نزد شرکت هور تابان تجارت الکترونیک
                  (آرسونیکس) و ارائه کلیه اطلاعات، مدارک، تعهدات و مستندات لازم
                  به منظور آن"، شماره حساب (های) بانکی و شماره شبای مرتبط با
                  شرکت، ایمیل شرکت، شماره تلفن همراه نماینده و نیز کدملی نماینده
                  را در بر داشته باشد. همچنین، نماینده باید تایید و تصدیق کند که
                  اطلاعات ارائه شده صحیح، دقیق و با واقعیت سازگار هستند. در صورت
                  حاکی بودن هرگونه تقلب یا دستکاری در اطلاعات در فرآیند احراز
                  هویت، مسئولیت به عهده کاربر متخلف خواهد بود و آرسونیکس حق
                  مسدودسازی حساب و اطلاع‌رسانی به مراجع قضایی را خواهد داشت.
                </p>
              </div>
            </div>
            <div
              className={`${rules["rules-summary"]} ${rules["rules-summary--mb50"]}`}
            >
              <div className={`${rules["rules-text"]}`}>
                <h3>هزینه‌های استفاده از خدمات آرسونیکس</h3>
                <p>
                  آرسونیکس به عنوان یک پلتفرم معاملاتی ارز دیجیتال، هر بار که
                  کاربر یک معامله انجام می‌دهد، کارمزدی را به عنوان درآمد از او
                  دریافت می‌کند. این هزینه‌ها به طور واضح و قبل از انجام هر
                  تراکنش و همچنین پس از آن به کاربر نمایش داده می‌شوند.
                </p>
                <p>
                  کارمزد برداشت تومان، ارز دیجیتال یا فیات توسط شبکه بانکی،
                  بلاکچین و سرویس‌های بین‌المللی تعیین می‌شود و آرسونیکس در
                  تعیین این مبالغ هیچ دخالتی ندارد. وظیفه پرداخت این هزینه‌ها بر
                  عهده کاربر است.
                </p>
                <p>
                  تمامی تبعات مالیاتی ناشی از استفاده از خدمات آرسونیکس، به عهده
                  کاربر داخل یا خارج از ایران است و آرسونیکس هیچ گونه مسئولیتی
                  در این زمینه را بر عهده نمی‌گیرد.
                </p>
                <p>
                  آرسونیکس اختیار دارد هزینه‌های خدمات خود را با توجه به
                  سیاست‌های اجرایی تغییر دهد.
                </p>
              </div>
            </div>
            <div id='privacy'
              className={`${rules["rules-summary"]} ${rules["rules-summary--mb50"]}`}
            >
              <div className={`${rules["rules-text"]}`}>
                <h3>حریم خصوصی و داده‌های شخصی</h3>
                <p>
                  آرسونیکس با ارزش‌گذاری به حریم خصوصی کاربران خود و تعهد به
                  حفاظت از داده‌های شخصی آن‌ها، به عنوان یک شرکت مسئول در زمینه
                  فناوری اطلاعات، اقدام به جمع‌آوری و پردازش داده‌های شخصی
                  می‌نماید. این اقدامات با رعایت قوانین و مقررات کشور، و با
                  درخواست رضایت کاربران صورت می‌گیرد، همچنین در پیش‌برد آگاهی از
                  اهمیت حفاظت از داده‌های شخصی است.
                </p>
                <p>
                  آرسونیکس به داده‌های شخصی تعریف شده به عنوان داده‌های مرتبط با
                  هویت یک فرد زنده، با دریافت رضایت کاربران، طبق الزامات و
                  قوانین مربوطه در کشور، اقدام به جمع‌آوری، ذخیره، استفاده،
                  توزیع، تجزیه‌وتحلیل، ترکیب با سایر داده‌ها، انتقال یا سایر
                  عملیات مشابه می‌نماید.
                </p>
                <p>
                  داده‌های شخصی ممکن است به اشتراک شرکت مادر، شرکت‌های وابسته و
                  مرتبط با آرسونیکس برای اهدافی چون توسعه، گسترش، و خلق محصولات
                  و خدمات نوآورانه با رعایت قوانین و مقررات کشور، منتقل گردد.
                </p>
                <p>
                  آرسونیکس ممکن است از کوکی‌ها به عنوان ابزاری برای جمع‌آوری
                  اطلاعات بازدیدکنندگان بستر خود استفاده نماید. کوکی‌ها
                  فایل‌هایی هستند که توسط مرورگر ساخته می‌شوند و اطلاعات
                  بازدیدها را ذخیره کرده و آن‌ها را بهینه‌سازی می‌نمایند.
                </p>
                <p>
                  اطلاعاتی که کاربران در طول فرآیند ثبت‌نام و ایجاد حساب کاربری
                  در بستر آرسونیکس وارد می‌کنند (مانند خرید و فروش) به صورت
                  کاملاً محفوظ نگهداری می‌شوند و به هیچ شخص یا سازمان دیگری
                  منتقل نمی‌شوند، مگر با رعایت قوانین و مقررات کشور و تطابق با
                  دستورات مراجع و ارگان‌های ذی‌نفع. کاربران با استفاده از بستر
                  آرسونیکس اعلام می‌دارند که به صراحت رضایت خود را در این زمینه
                  اعلام می‌نمایند و هیچگونه مسئولیت قانونی برای آرسونیکس در
                  موارد جبران خسارت یا مسائل دیگر وجود ندارد.
                </p>
              </div>
            </div>
            <div
              className={`${rules["rules-summary"]} ${rules["rules-summary--mb50"]}`}
            >
              <div className={`${rules["rules-text"]}`}>
                <h3>حریم خصوصی و داده‌های شخصی</h3>
                <p>
                  آرسونیکس با ارزش‌گذاری به حریم خصوصی کاربران خود و تعهد به
                  حفاظت از داده‌های شخصی آن‌ها، به عنوان یک شرکت مسئول در زمینه
                  فناوری اطلاعات، اقدام به جمع‌آوری و پردازش داده‌های شخصی
                  می‌نماید. این اقدامات با رعایت قوانین و مقررات کشور، و با
                  درخواست رضایت کاربران صورت می‌گیرد، همچنین در پیش‌برد آگاهی از
                  اهمیت حفاظت از داده‌های شخصی است.
                </p>
                <p>
                  الف. آرسونیکس به داده‌های شخصی تعریف شده به عنوان داده‌های
                  مرتبط با هویت یک فرد زنده، با دریافت رضایت کاربران، طبق
                  الزامات و قوانین مربوطه در کشور، اقدام به جمع‌آوری، ذخیره،
                  استفاده، توزیع، تجزیه‌وتحلیل، ترکیب با سایر داده‌ها، انتقال یا
                  سایر عملیات مشابه می‌نماید.
                </p>
                <p>
                  ب. داده‌های شخصی ممکن است به اشتراک شرکت مادر، شرکت‌های وابسته
                  و مرتبط با آرسونیکس برای اهدافی چون توسعه، گسترش، و خلق
                  محصولات و خدمات نوآورانه با رعایت قوانین و مقررات کشور، منتقل
                  گردد.
                </p>
                <p>
                  آرسونیکس ممکن است از کوکی‌ها به عنوان ابزاری برای جمع‌آوری
                  اطلاعات بازدیدکنندگان بستر خود استفاده نماید. کوکی‌ها
                  فایل‌هایی هستند که توسط مرورگر ساخته می‌شوند و اطلاعات
                  بازدیدها را ذخیره کرده و آن‌ها را بهینه‌سازی می‌نمایند.
                </p>
                <p>
                  اطلاعاتی که کاربران در طول فرآیند ثبت‌نام و ایجاد حساب کاربری
                  در بستر آرسونیکس وارد می‌کنند (مثل ثبت سفارش) به صورت کاملاً
                  محفوظ نگهداری می‌شوند و به هیچ شخص یا سازمان دیگری منتقل
                  نمی‌شوند، مگر با رعایت قوانین و مقررات کشور و تطابق با دستورات
                  مراجع و ارگان‌های ذی‌نفع. کاربران با استفاده از بستر آرسونیکس
                  اعلام می‌دارند که به صراحت رضایت خود را در این زمینه اعلام
                  می‌نمایند و هیچگونه مسئولیت قانونی برای آرسونیکس در موارد
                  جبران خسارت یا مسائل دیگر وجود ندارد.
                </p>
              </div>
            </div>
            <div
              className={`${rules["rules-summary"]} ${rules["rules-summary--mb50"]}`}
            >
              <div className={`${rules["rules-text"]}`}>
                <h3>مالکیت، حقوق مادی و معنوی</h3>
                <p>
                  تمامی حقوق مادی و معنوی مرتبط با آرسونیکس و خدمات وابسته به
                  آن، تخصیص یافته به آرسونیکس می‌باشد و هرگونه استفاده بدون مجوز
                  کتبی از آن، منجر به پیگرد قانونی خواهد شد.
                </p>
                <p>
                  هر گونه استفاده از محتوای آرسونیکس در تمامی پلتفرم‌های مرتبط،
                  از جمله وب‌سایت، اپلیکیشن، شبکه‌های اجتماعی، تبلیغات محیطی و
                  سایر موارد، بدون اجازه کتبی، غیرقانونی است و پیگرد قانونی را
                  به همراه دارد.
                </p>
              </div>
            </div>
            <div
              className={`${rules["rules-summary"]} ${rules["rules-summary--mb50"]}`}
            >
              <div className={`${rules["rules-text"]}`}>
                <h3>شرایط اضطراری</h3>
                <p>
                  در شرایط غیرعادی و وقوع اتفاقات ناگهانی، مانند بلایای طبیعی،
                  جنگ، شورش، اعتصاب، تحریم، قطع ارتباطات داخلی و بین‌المللی،
                  آرسونیکس کلیه تلاش‌های لازم را برای ارائه خدمات خود به کاربران
                  انجام می‌دهد. اما در نهایت، مسئولیتی در قبال انجام نشدن تعهدات
                  خود ندارد.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </LandingLayout>
  );
}

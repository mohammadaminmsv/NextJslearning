import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    myProviders({
      
    })
  ],
  callbacks: {
    async session({ session }) {
      const seissionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = seissionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        //serverless /lambda /when call it  run for db connection
        await connectToDB();

        //check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        //if  not , create a new user

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export { handler as GET, handler as POST };

// کدی که ارائه دادید یک فایل تنظیم برای `next-auth` در یک پروژه Next.js است. `next-auth` یک کتابخانه است که برای افزودن احراز هویت به برنامه‌های وب Next.js استفاده می‌شود. اجازه دهید هر بخش از کد را بررسی کنیم:

// ### 1. وارد کردن ماژول‌ها
// ```javascript
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
// ```
// در این قسمت، ماژول `NextAuth` و `GoogleProvider` را وارد می‌کنید. `GoogleProvider` یکی از ارائه‌دهندگان خدمات احراز هویت است که `next-auth` پشتیبانی می‌کند و امکان احراز هویت از طریق حساب گوگل را فراهم می‌آورد.

// ### 2. تنظیم کنترلر NextAuth
// ```javascript
// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: "",
//       clientSecret: "",
//     }),
//   ],
//   async session({ session }) {},
//   async signIn({ profile }) {},
// });
// ```
// - **providers**: این آرایه تمام ارائه‌دهندگان خدمات احراز هویت را تعریف می‌کند که در این مورد فقط `GoogleProvider` است. `clientId` و `clientSecret` اطلاعاتی هستند که از پروژه Google Cloud Platform دریافت می‌کنید و برای تنظیم ارتباط با سرویس احراز هویت گوگل استفاده می‌شوند.

// - **session**: این تابع هنگامی فراخوانی می‌شود که جلسه کاربر به‌روزرسانی می‌شود. در اینجا می‌توانید منطقی اضافه کنید تا بر اطلاعات جلسه کاربر اصلاحاتی انجام دهید.

// - **signIn**: این تابع هنگام ورود یک کاربر فراخوانی می‌شود. `profile` شامل اطلاعاتی است که از ارائه‌دهنده خدمات احراز هویت (مثلاً گوگل) دریافت می‌کنید. اینجا می‌توانید منطق خاصی را برای تأیید ورود کاربر اجرا کنید.

// ### 3. صادر کردن تابع handler
// ```javascript
// export {handler as GET, handler as POST}
// ```
// این خط کد `handler` را هم به عنوان تابعی برای پاسخ به درخواست‌های `GET` و هم `POST` صادر می‌کند. در Next.js، این بدین معنی است که هر دو نوع درخواست می‌توانند به این API Route ارسال شوند و هر دو توسط همین تابع `handler` که توسط `next-auth` ایجاد شده، پردازش می‌شوند.

// این کد بخشی اساسی برای مدیریت احراز هویت در برنامه‌های Next.js است و با استفاده از `next-auth`، راه‌اندازی و مدیریت احر

// از هویت به طور قابل توجهی ساده‌تر می‌شود.

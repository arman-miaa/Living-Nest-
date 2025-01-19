/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3D7E91",
        secondary: "#F05D23",
        accent: "#21A179",
        background: "#FAFAFA",
        text: "#2D2D2D",
        muted: "#D1D5DB",
      },
    },
  },
  plugins: [require("daisyui")],
};


/**
 * কালার ব্যবহারের প্রস্তাবনা:
1. Primary (#004B8D)
ব্যবহার: Navbar, Headings, এবং মূল ব্র্যান্ডের কালার হিসেবে।
কারণ: এটি বিশ্বাসযোগ্য এবং পেশাদার লুক দেয়।
2. Secondary (#F05D23)
ব্যবহার: বাটন, হোভার ইফেক্ট, এবং লিংকের জন্য।
কারণ: এটি সাইটে প্রাণশক্তি এবং কাস্টমারের মনোযোগ আনবে।
3. Accent (#21A179)
ব্যবহার: Call-to-Action বাটন বা গুরুত্বপূর্ণ এলিমেন্ট হাইলাইট করতে।
কারণ: এটি সতেজ এবং ভরসাজনক অনুভূতি দেয়।
4. Background (#FAFAFA)
ব্যবহার: সাইটের ব্যাকগ্রাউন্ড হিসেবে।
কারণ: এটি পরিষ্কার এবং ব্যবহারকারীদের চোখে আরামদায়ক।
5. Text (#2D2D2D)
ব্যবহার: প্রধান টেক্সটের জন্য।
কারণ: এটি হাই কনট্রাস্ট এবং সহজপাঠ্য।
6. Muted (#D1D5DB)
ব্যবহার: সেকেন্ডারি সেকশন, কার্ড ব্যাকগ্রাউন্ড, বা ইনপুট ফিল্ডে।
কারণ: নিরপেক্ষ এবং মিনিমালিস্ট লুক।
 */
import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";

const products = [
  {
    name: "FlameMaster Pro Series",
    price: "$299",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlctDnk3ZcT_1Nsqws4eSrVAlhbTMFKvtHdX5jua9q2BzvC-c4kLCU4oKubfMn7LXZM-fMZZ2PKK3II5Lu1T-ZtDcJglIXG_ZWOm0qnAV10lUwaW2aebbw-YRSEmZPMTEI5riTyZzARHE0dJduR4dIOYvDi7fSzBRLRPjpZesiiViPuXeArKWDDhJBDHr4g-o5-uXP7zQnDQ6XrDWc0ski1xzLl1TytYpj8OV9bNs2sIuzi2MbHAOYzp7n3SkG_ihhYTaG9r5bnzmJ",
    time: "15 mins",
    date: "7 November 2023",
    tags: ["GraphQL", "Best practice", "BI"],
    badge: { text: "BI systems integration", color: "bg-[#2D7FFF]", textColor: "text-black" },
    badgeLabel: "COMBINE DATA",
  },
  {
    name: "FlameMaster Elite Burner",
    price: "$349",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArgDy2HcxiOrb_fIhfN_FNzPLNIvQMyA5pN5RqmonDzSPcc5DQg9M9AvV7_w_8Ry3CodgwSzVmAvA5wORdz-sSJ055JKLynZwdMnffOdYpRjysKb2nm68KlAd-62IWDjfRTyWOU5fpJhU8lVYT1JgWKmrSpk5oWWVgM5IxzG8g-4LDqji-cqyy58pGBhLURVCYG07xT3gIJOod4_hXDOCjz3s8mk2PjtJcaDiKj7678LN-CTx6o4n99BRIqV3B6DkrTBCqqoP_YzqH",
    time: "15 mins",
    date: "23 October 2023",
    tags: ["Frontend", "Best practice", "Cache", "DTC", "CMS"],
    badge: { text: "CMS integration", color: "bg-[#2D7FFF]", textColor: "text-black" },
    badgeLabel: "displays(where: {id: 1}) { product {name} productVariants {name} id }",
  },
  {
    name: "FlameMaster Compact Cooktop",
    price: "$199",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCg019Sxmg22D5oLqqnJufxa77XxmBARRfrxhC9gJHNkK58fKMD29wkqejL1INvmG_7LSVmNFPy17TNO0SYD1r_f8kPZoil6FD7-KX5NrtLa8pbXnOPK2P7B8f6VlMj8BWTtv4wApRfiCLxpLBCK1AcatCv6g_ritU5nv7c-7p85m9x9d7k_DPvnQLI3-cL1hcL0g26ll4pgXw3b42G1GjSaEoU8M2OT7lHlzA40K5kyu3VAbeBsj6xSaSh0-jPjcEQHi8oSJkIAGCW",
    time: "40 mins",
    date: "12 February 2023",
    tags: ["GraphQL", "How-to", "ERP"],
    badge: { text: "ERP integration", color: "bg-[#FFED4A]", textColor: "text-black" },
    badgeLabel: "GRAPH QL",
  },
  {
    name: "FlameMaster Dual Flame",
    price: "$249",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB1rnqMVq4I4DLndmlykHTDjuxyjMb-xX7dPGahW91_x8fsy9CfVN2DiD2XAhXlaStyMpQpyunxiVFElNBzw-te__AmXgrqbakmizTEnQPaO1ycvGBhTRAKy68-U2of7AfJXleVNMvdi4gpBAdXyN11ZonvvEoVa9oO0bJvqXxzVlogFBDYpWjCQmkqe_1vzo08WjIveWbztMTr-w6qo2E429n7r20jEvc_59CiPvSwEPhIFOFdlz9Xfq5yHA5VlGvaAxlnRSnmLor9",
    time: "12 mins",
    date: "1 March 2024",
    tags: ["Dual", "Cooktop", "Compact"],
    badge: { text: "Dual Flame", color: "bg-[#FFED4A]", textColor: "text-black" },
    badgeLabel: "DUAL COOK",
  },
];

const fontMono = "font-mono"; // Use a monospaced font for the pixel look

const FeaturedProducts = () => (
  <section className="w-full bg-black min-h-screen py-8">
    <div className="flex items-center justify-between px-8 pb-6">
      <h2 className={`${fontMono} text-white text-3xl font-bold tracking-tight`}>
        Featured guides
      </h2>
      <a
        href="#"
        className={`${fontMono} text-white text-2xl font-bold flex items-center gap-2 hover:underline`}
      >
        <span>&rarr; See all</span>
      </a>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8">
      {products.slice(0, 3).map((product, idx) => (
        <Card
          key={idx}
          className="bg-[#181818] rounded-3xl overflow-hidden shadow-lg border border-[#282828] flex flex-col transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="flex gap-2 p-4 pb-0">
            {/* Badge */}
            <div
              className={`flex flex-col items-center justify-center rounded-xl w-28 h-28 ${product.badge.color} ${product.badge.textColor} text-base font-bold ${fontMono} shrink-0`}
            >
              <span className="text-center">{product.badge.text}</span>
            </div>
            {/* Image */}
            <div className="w-full h-28 rounded-xl overflow-hidden flex items-center justify-center bg-[#222]">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full grayscale"
                style={{ maxHeight: "112px" }}
              />
            </div>
          </div>
          {/* Badge Label */}
          <div className="flex gap-2 px-4 pt-2">
            <span
              className="bg-[#222] text-white/80 rounded-lg px-3 py-1 text-xs font-semibold tracking-tight"
              style={{ fontFamily: "inherit" }}
            >
              {product.badgeLabel}
            </span>
          </div>
          <CardContent className="p-4 pt-2 flex flex-col flex-1">
            {/* Time and Date */}
            <div className="flex gap-4 text-[#b0b0b0] text-xs mb-1">
              <span>{product.time}</span>
              <span>{product.date}</span>
            </div>
            {/* Title */}
            <CardTitle
              className={`${fontMono} text-white text-xl font-bold leading-snug mb-2`}
            >
              {product.name}
            </CardTitle>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {product.tags.map((tag, i) => (
                <span
                  key={i}
                  className="border border-[#444] bg-[#222] text-white/80 rounded px-2 py-1 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default FeaturedProducts;

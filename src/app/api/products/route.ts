const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    images: [
      "https://cdn-images.farfetch-contents.com/12/83/31/75/12833175_21352537_600.jpg",
    ],
    description:
      "The Nike Air Max 270 is inspired by two icons of big Air: the Air Max 180 and Air Max 93. It features Nike's biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks.",
    price: 150.0,
    gender: "Unisex",
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    images: [
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/ff63350102884175bfee3a10bd3e5b93_9366/Zapatillas_Ultraboost_Light_23_Negro_GY9353.jpg",
    ],
    description:
      "Experience unparalleled comfort with the Adidas Ultraboost 22. Built with a responsive Boost midsole and a supportive Primeknit upper, it's the perfect blend of style and performance.",
    price: 180.0,
    gender: "Men",
  },
  {
    id: 3,
    name: "Nike Air Force 1 '07",
    images: [
      "https://nikearprod.vtexassets.com/arquivos/ids/155412/CW2288_111_A_PREM-hei-3144-wid-3144-fmt.jpg?v=638086277548400000",
    ],
    description:
      "The legend lives on in the Nike xAir Force 1 '07, a modern take on the iconic AF1 that blends classic style with fresh details.",
    price: 100.0,
    gender: "Women",
  },
  {
    id: 4,
    name: "Adidas NMD_R1",
    images: [
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1b10dc973b614f01af8d757b56b41571_9366/Zapatillas_NMD_R1_Negro_IG5535_01_standard.jpg",
    ],
    description:
      "The Adidas NMD_R1 brings a futuristic look to street-ready style. With a responsive Boost midsole and a snug knit upper, it's designed for all-day comfort.",
    price: 140.0,
    gender: "Unisex",
  },
  {
    id: 5,
    name: "Nike Air Zoom Pegasus 39",
    images: [
      "https://nikearprod.vtexassets.com/arquivos/ids/453528-800-800?width=800&height=800&aspect=true",
    ],
    description:
      "The Nike Air Zoom Pegasus 39 is built for runners of all levels. With a supportive fit and Zoom Air units for responsive cushioning, it's a trusted staple in the running community.",
    price: 120.0,
    gender: "Men",
  },
];

export async function GET() {
  return Response.json(products);
}

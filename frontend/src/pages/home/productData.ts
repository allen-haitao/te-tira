// productData.ts

export interface Hotel {
  ID: number;
  HotelName: string;
  Description: string;
  price?: number | string;
  HotelWebsiteUrl: string;
  HotelRating: string;
}

export const categorizeHotels = (
  hotels: any[]
): { productList1: Hotel[]; productList2: Hotel[]; productList3: Hotel[]; productList4: Hotel[] } => {
  const productList1: Hotel[] = [];
  const productList2: Hotel[] = [];
  const productList3: Hotel[] = [];
  const productList4: Hotel[] = [];

  let bestDealCount = 0;
  let highestRatedCount = 0;
  let hotRecommendedCount = 0;
  let newArrivalCount = 0;

  // Sort hotels by HotelRating (assuming it's a string like "FiveStar", "FourStar", etc.)
  const sortedHotels = hotels.sort((a, b) => {
    const ratingOrder = ["Not rated", "OneStar", "TwoStar", "ThreeStar", "FourStar", "FiveStar"];
    return ratingOrder.indexOf(b.HotelRating) - ratingOrder.indexOf(a.HotelRating);
  });

  hotels.forEach((hotel, index) => {
    console.log(`Hotel object:`, hotel);  // 输出完整的 hotel 对象
  
    // 如果 ID 字段不存在，使用其他字段作为 ID
    const hotelID = `hotel-${index + 1}`; // 手动分配的ID
    console.log(`Assigned Hotel ID: ${hotelID}`);
  
// 构建本地图片路径
let localImagePath = '';
try {
  localImagePath = require(`../../assets/images/hotels/${hotelID}.jpg`);
} catch (err) {
  console.error(`Image not found for hotel ID: ${hotelID}`);
  localImagePath = ''; // 如果图片不存在，可以设置默认路径
}

const hotelData: Hotel = {
  ID: index + 1,
  HotelName: hotel.HotelName || 'Unknown Hotel',
  Description: hotel.Description || 'No description available',
  price: hotel.price || 0,
  HotelWebsiteUrl: localImagePath || '',
  HotelRating: hotel.HotelRating || 'Not rated',
};
  
    console.log('hotelData:', hotelData); // 查看每个 hotelData 的内容
  
    // Dynamic marking logic
    const isBestDeal = hotel.price && hotel.price < 100;
    const isHighestRated = hotel.HotelRating === "FiveStar";
    const isHotRecommended = sortedHotels.slice(0, 5).some(sortedHotel => sortedHotel.hotelId === hotel.hotelId);
    const isNewArrival = index < 5;
  
    if (bestDealCount < 1 && isBestDeal) {
      productList1.push(hotelData);
      bestDealCount++;
    }
    if (highestRatedCount < 1 && isHighestRated) {
      productList2.push(hotelData);
      highestRatedCount++;
    }
    if (hotRecommendedCount < 5 && isHotRecommended) {
      productList3.push(hotelData);
      hotRecommendedCount++;
    }
    if (newArrivalCount < 5 && isNewArrival) {
      productList4.push(hotelData);
      newArrivalCount++;
    }
  });

  return { productList1, productList2, productList3, productList4 };
};
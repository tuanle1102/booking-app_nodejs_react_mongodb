import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body);

    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body);

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body },
             { new: true });
        res.json(updatedHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


export const getHotel = async (req,res,next)=>{
    try {
        const hotel = await Hotel.findById(
            req.params.id
        );
        res.status(200).json(hotel);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// export const getAllHotel = async (req, res, next) => {
//     const { min, max,limit, ...others } = req.query;
//     try {
        
//       const hotels = await Hotel.find({
//         ...others,
//         cheapestPrice: { $gt: min | 1, $lt: max || 999 },
//       }).limit(req.query.limit);
//       res.status(200).json(hotels);
//     } catch (err) {
//       next(err);
//     }
//   };
export const getAllHotel = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;
    
    try {
      // Kiểm tra xem limit có tồn tại và là một số nguyên dương hay không
      const parsedLimit = parseInt(limit);
      const isValidLimit = !isNaN(parsedLimit) && parsedLimit > 0;
  
      // Tạo đối tượng truy vấn dựa trên các tham số
      const query = {
        ...others,
        cheapestPrice: { $gt: min || 1, $lt: max || 999 },
      };
  
      // Nếu limit hợp lệ, thêm nó vào truy vấn
      const finalQuery = isValidLimit ? Hotel.find(query).limit(parsedLimit) : Hotel.find(query);
  
      // Thực hiện truy vấn và trả về kết quả
      const hotels = await finalQuery.exec();
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };
  


export const deleteHotel = async (req,res,next)=>{
    const newHotel = new Hotel(req.body);

    try {
        await Hotel.findByIdAndRemove(req.params.id);
        res.json({ message: 'Hotel deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const countByCity = async (req,res,next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }));
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

  
  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
       hotel.rooms.map((room) => {
        return Room.findById(room);
       })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
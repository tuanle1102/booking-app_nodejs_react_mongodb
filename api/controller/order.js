// import Order from "../models/Order.js";
// import Room from "../models/Room.js"

// export const reserveRoom = async (req, res) => {
//     try {
//       const { roomId, checkInDate, checkOutDate } = req.body;
  
//       // Kiểm tra tính khả dụng của phòng và lưu đơn hàng vào MongoDB
//       const room = await Room.findById(roomId);
//       if (!room) {
//         return res.status(404).json({ error: 'Room not found' });
//       }
  
//       // Tính toán tổng số tiền dựa trên giá phòng và thời gian thuê
//       const totalPrice = calculateTotalPrice(room.price, checkInDate, checkOutDate);
  
//       const order = new Order({
//         roomId,
//         checkInDate,
//         checkOutDate,
//         // totalPrice,
//         // Thêm thông tin khác nếu cần
//       });
  
//       await order.save();
  
//       res.json({ message: 'Room reserved successfully' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//   export const getOrder = async (req,res,next)=>{
//     try {
//         const hotel = await Order.findById(
//             req.params.id
//         );
//         res.status(200).json(hotel);
        
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

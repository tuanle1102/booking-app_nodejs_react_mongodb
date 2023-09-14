
import express from "express";
// import { verifyAdmin } from "../utils/verifyToken.js";
// import { getOrder, reserveRoom } from "../controller/order.js";
// import { deleteHotel } from "../controller/hotel.js";
import Order from "../models/Order.js";
import Room from "../models/Room.js";

const router = express.Router();

function calculateTotalPrice(roomPrice, checkInDate, checkOutDate) {
    const pricePerNight = roomPrice; // Giá phòng mỗi đêm
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const numberOfNights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Số đêm thuê
  
    // Tính tổng giá phòng
    const totalPrice = pricePerNight * numberOfNights;
    return totalPrice;
  }
  

router.post('/reserve', async (req, res) => {
    try {
      const { roomId, checkInDate, checkOutDate } = req.body;
  
      // Kiểm tra tính khả dụng của phòng và lưu đơn hàng vào MongoDB
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      // Tính toán tổng số tiền dựa trên giá phòng và thời gian thuê
      const totalPrice = calculateTotalPrice(room.price, checkInDate, checkOutDate);
  
      const order = new Order({
        roomId,
        checkInDate,
        checkOutDate,
        totalPrice,
        
        
        // Thêm thông tin khác nếu cần
      });
      order.statusPay = 'None'  
  
      await order.save();
  
      res.json({ message: 'Room reserved successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/update/:roomId', async (req, res) => {
    try {
        const roomId = req.params.roomId;
    
        
        // Cập nhật trạng thái thanh toán thành "Paid"
        const order = await Order.findByIdAndUpdate(roomId, { paymentStatus: 'Paid' }, { new: true });

        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
    
        res.json({ message: 'Payment status updated to "Paid" successfully', order });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  });
  

// router.put('/payment/:roomId', async (req, res) => {
//     try {
//       const { roomId, checkInDate, checkOutDate } = req.body;
  
//       // Tính toán giá phòng từ model Room
//       const room = await Room.findById(roomId);
//       if (!room) {
//         return res.status(404).json({ error: 'Room not found' });
//       }

//       // Định nghĩa hàm tính toán tổng giá phòng dựa trên giá phòng và thời gian thuê

  
//       // Tính toán tổng giá phòng dựa trên thời gian thuê
//       const totalPrice = calculateTotalPrice(room.price, checkInDate, checkOutDate);
  
//       // Tạo một đơn hàng mới
//       const order = new Order({ roomId, checkInDate, checkOutDate, totalPrice });
//       order.statusPay = 'Paid'
//       // Lưu đơn hàng vào MongoDB
//       await order.save();
  
//       // Thực hiện thanh toán ở đây (ví dụ: sử dụng thư viện thanh toán như Stripe)
  
//       res.json({ message: 'Payment successful' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  


// API endpoint để đặt phòng
// // router.post('/reserve-room', async (req, res) => {
// //     try {
// //       const { roomId, checkInDate, checkOutDate } = req.body;
  
// //       // Kiểm tra tính khả dụng của phòng và lưu đơn hàng vào MongoDB
// //       const room = await Room.findById(roomId);
// //       if (!room) {
// //         return res.status(404).json({ error: 'Room not found' });
// //       }
  
// //       // Tính toán tổng số tiền dựa trên giá phòng và thời gian thuê
// //       const totalPrice = calculateTotalPrice(room.price, checkInDate, checkOutDate);
  
// //       const order = new Order({
// //         roomId,
// //         checkInDate,
// //         checkOutDate,
// //         totalPrice,
// //         // Thêm thông tin khác nếu cần
// //       });
  
// //       await order.save();
  
// //       res.json({ message: 'Room reserved successfully' });
// //     } catch (error) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   });
  
//   // API endpoint để thanh toán
//   router.post('/checkout', async (req, res) => {
//     try {
//       const { orderId, paymentMethod, token } = req.body;
  
//       // Lấy thông tin đơn hàng từ MongoDB
//       const order = await Order.findById(orderId);
//       if (!order) {
//         return res.status(404).json({ error: 'Order not found' });
//       }
  
//       // Xử lý thanh toán sử dụng thư viện thanh toán (ví dụ: Stripe)
//       const charge = await stripe.charges.create({
//         amount: order.totalPrice * 100, // Chuyển đổi số tiền sang cent
//         currency: 'usd',
//         source: token, // Token của thẻ thanh toán từ giao diện người dùng
//         description: 'Payment for room reservation',
//       });
  
//       // Cập nhật trạng thái đơn hàng sau khi thanh toán thành công
//       order.paymentStatus = 'Paid';
//       await order.save();
  
//       res.json({ message: 'Payment successful' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  


//GET ALL 
//router.get('/', reserveRoom)

// //GET ONE
// router.get('/find/:id', getOrder)

// router.post('/create', async (req, res) => {

//     try {
//       const { roomId, checkInDate, checkOutDate, totalPrice, paymentStatus } = req.body;
//       const order = new Order({ roomId, checkInDate, checkOutDate, totalPrice, paymentStatus });
//       await order.save();
//       res.json({ message: 'Order created successfully', order });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  

// router.get('/', async (req, res) => {
//     try {
//       const orders = await Order.find();
//       res.json(orders);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  

// //CREATE
// router.post("/res", verifyAdmin, reserveRoom);

// //UPDATE
// router.put("/update/:id", verifyAdmin, reserveRoom); 

// //DELETE
// router.delete('/delete/:id', verifyAdmin, deleteHotel);



export default router
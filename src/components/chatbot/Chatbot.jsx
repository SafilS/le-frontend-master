// import { useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { format } from 'date-fns';
// import {
//   MessageSquare,
//   Send,
//   X,
//   Crown,
//   Sparkles,
//   Phone,
//   Bot, 
// } from 'lucide-react';

// export default function Chatbot() {
//   const [chatOpen, setChatOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);
//   const [isTyping, setIsTyping] = useState(false); ;
//   const [isLoading, setIsLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     if (chatOpen) { 
//       fetchChat();
//     }
//   }, [chatOpen]);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chat]);
 

//   const fetchChat = async () => {
//     setIsLoading(true);
//     try {
//       const res = await axios.get(
//         'https://le-crown-interiors-backend.onrender.com/chatbot/getoldchat'
//       );
//       setChat(res.data.chat);
//     } catch (err) {
//       console.error('Error fetching chat:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!message.trim()) return;

//     const newMessage = {
//       sender: 'user',
//       message,
//       time: new Date().toISOString(),
//     };

//     setChat((prev) => [...prev, newMessage]);
//     setMessage('');
//     setIsTyping(true);

//     try {
//       const res = await axios.post(
//         'https://le-crown-interiors-backend.onrender.com/chatbot/chat',
//         { message }
//       );
//       setChat(res.data.chat);
//       setIsTyping(false);
//     } catch (err) {
//       console.error('Error sending message:', err);
//       setIsTyping(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const renderMessageContent = (msg) => {
//     const contactRegex = /\*https:\/\/dev\.le-crowninteriors\.com\/contact\*/g;
//     const estimateRegex = /\*https:\/\/le-crowninteriors\.com\/get-estimate\*/g;

//     let content = msg.message
//       .replace(contactRegex, '')
//       .replace(estimateRegex, '');

//     return (
//       <div className="space-y-3">
//         <p className="leading-relaxed">{content.trim()}</p>
//         {msg.message.includes(
//           '*https://le-crowninteriors.com/get-estimate*'
//         ) && (
//           <button
//             onClick={() =>
//               (window.location.href =
//                 'https://le-crowninteriors.com/get-estimate')
//             }
//             className="group relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-sm px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:scale-105">
//             <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <span className="relative flex items-center gap-2">
//               <Crown className="w-4 h-4" />
//               Get Free Luxury Estimation
//             </span>
//           </button>
//         )}
//         {msg.message.includes(
//           '*https://dev.le-crowninteriors.com/contact*'
//         ) && (
//           <button
//             onClick={() =>
//               (window.location.href =
//                 'https://dev.le-crowninteriors.com/contact')
//             }
//             className="group relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-sm px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:scale-105">
//             <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <span className="relative flex items-center gap-2">
//               <Phone className="w-4 h-4" />
//               Contact Our Design Team
//             </span>
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div>
//       {/* Chat Button with Small Indicator */}
//       {!chatOpen && (
//         <div className="fixed bottom-6 right-6 z-50">
//           {/* Small Animated Indicator */}
          

//           {/* Pulsing Ring Effect */}
//           <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-ping opacity-20"></div>
//           <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse opacity-30"></div>

//           {/* Main Button */}
//           <button
//             className="relative group bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 hover:scale-110 border-2 border-white/20"
//             onClick={() => setChatOpen(true)}>
//             {/* Luxury Shine Effect */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

//             <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300 relative z-10" />

//             {/* Status Indicator */}
//             <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
//           </button>
//         </div>
//       )}

//       {/* Chat Interface - Straight edges on desktop, app-like on mobile */}
//       {chatOpen && (
//         <div className="fixed inset-0 md:bottom-0 md:right-0 md:top-0 md:left-auto w-full h-full md:w-[440px] bg-white md:bg-white/95 md:backdrop-blur-xl flex flex-col z-50 md:border-l md:border-amber-200/50 md:shadow-2xl overflow-hidden">
//           {/* Modern AI Header */}
//           <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 md:p-4">
//             {/* Mobile: App-like header */}
//             <div className="md:hidden flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <div className="text-lg font-bold">LeCrown AI</div>
//                   <div className="text-xs text-white/90">Design Assistant</div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setChatOpen(false)}
//                 className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Desktop: Sidebar-like header */}
//             <div className="hidden md:flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30">
//                   <Crown className="w-4 h-4 text-white" />
//                 </div>
//                 <div>
//                   <div className="text-sm font-bold">LeCrown Assistant</div>
//                   <div className="flex items-center gap-1 text-xs text-white/90">
//                     <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
//                     <span>AI Expert Online</span>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setChatOpen(false)}
//                 className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-all duration-200">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           {/* Loading State */}
//           {isLoading && (
//             <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-amber-50/30 to-white">
//               <div className="text-center space-y-4">
//                 <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
//                   <Bot className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="space-y-2">
//                   <div className="text-lg font-semibold text-gray-800">
//                     Loading AI Assistant
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     Preparing your luxury design consultation...
//                   </div>
//                 </div>
//                 <div className="flex justify-center gap-1">
//                   <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
//                   <div
//                     className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
//                     style={{ animationDelay: '0.1s' }}></div>
//                   <div
//                     className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
//                     style={{ animationDelay: '0.2s' }}></div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Messages Area */}
//           {!isLoading && (
//             <div className="flex-1 overflow-y-auto p-4 md:p-3 space-y-4 bg-gradient-to-b from-amber-50/30 to-white scrollbar-hide">
//               {chat.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`flex flex-col animate-fade-in ${
//                     msg.sender === 'user' ? 'items-end' : 'items-start'
//                   }`}
//                   style={{
//                     animationDelay: `${index * 0.1}s`,
//                     animationFillMode: 'both',
//                   }}>
//                   <div
//                     className={`rounded-2xl md:rounded-xl px-4 py-3 max-w-[85%] shadow-sm hover:shadow-md transition-all duration-300 ${
//                       msg.sender === 'user'
//                         ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white transform hover:scale-105 shadow-amber-200'
//                         : 'bg-white text-gray-800 border border-amber-100 backdrop-blur-sm shadow-amber-100/50'
//                     }`}>
//                     {renderMessageContent(msg)}
//                   </div>
//                   <span className="text-xs text-gray-500 mt-1 px-2 font-medium">
//                     {format(new Date(msg.time), 'p, MMM d')}
//                   </span>
//                 </div>
//               ))}

//               {/* AI Typing Indicator */}
//               {isTyping && (
//                 <div className="flex items-start animate-fade-in">
//                   <div className="bg-white border border-amber-100 rounded-2xl md:rounded-xl px-4 py-3 shadow-sm">
//                     <div className="flex items-center gap-3">
//                       <div className="flex gap-1">
//                         <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
//                         <div
//                           className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
//                           style={{ animationDelay: '0.1s' }}></div>
//                         <div
//                           className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
//                           style={{ animationDelay: '0.2s' }}></div>
//                       </div>
//                       <span className="text-sm text-gray-600 font-medium">
//                         AI is thinking...
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//               <div ref={chatEndRef} />
//             </div>
//           )}

//           {/* Modern Input Area */}
//           {!isLoading && (
//             <div className="p-4 md:p-3 bg-white/90 backdrop-blur-sm border-t border-amber-100">
//               <div className="flex items-center gap-3 bg-white rounded-2xl md:rounded-xl shadow-lg border border-amber-200/50 p-2 hover:shadow-xl transition-all duration-300">
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={handleKeyPress}
//                   placeholder="Ask about luxury interior designs..."
//                   className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500 font-medium"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   disabled={!message.trim()}
//                   className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 group">
//                   <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Luxury Footer */}
//           <div className="text-center text-xs text-gray-600 py-3 md:py-2 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-100/50">
//             <div className="flex items-center justify-center gap-2">
//               <Crown className="w-3 h-3 text-amber-500" />
//               <span className="font-semibold">Powered by</span>
//               <span className="font-bold text-amber-600">
//                 LeCrown Interiors
//               </span>
//               <Sparkles className="w-3 h-3 text-amber-500" />
//             </div>
//             <div className="text-[10px] text-gray-500 mt-0.5">
//               AI-Powered Luxury Design Assistant
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(15px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 0.4s ease-out;
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 0.5s ease-out;
//         }

//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// }

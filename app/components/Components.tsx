// const [comments, setComments] = useState<any>("");
// const [storeComments, setStoreComments] = useState<any[]>([]);
// const [showComments, setShowComments] = useState(false);

// const handleComments = (postId: any) => {
//   const newComments = [...storeComments, comments];
//   newComments[postId] = newComments[postId] || [];
//   localStorage.setItem("comments", JSON.stringify(newComments));
//   setStoreComments(newComments);
//   setComments("");
// };

// const handleEComments = (e: any, post: any) => {
//   if (e.key === "Enter") {
//     handleComments(post);
//     console.log(comments);
//   }
// };
// const handleShowC = () => {
//   setShowComments((prevShow: any) => !prevShow);
// };

// {
//   showComments && (
//     <h2>
//       {/* show comments  */}
//       {storeComments &&
//         storeComments.map((comment: any, index: any) => (
//           <p key={index}>{comment}</p>
//         ))}
//     </h2>
//   );
// }

// <br />;

// <input
//   type="text"
//   onKeyDown={(e) => handleEComments(e, post)}
//   value={comments}
//   onChange={(e) => setComments(e.target.value)}
//   className="outline-none w-32 h-8  px-1 py-1"
// />;

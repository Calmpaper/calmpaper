// import moment from 'moment'

// const Donation = ({ donation }) => (
//   <div className="user-box">
//     <div
//       className="user-box__avatar"
//       style={{
//         backgroundImage: `url(${donation.payer.avatar})`,
//         backgroundSize: 'cover',
//       }}
//     />
//     <div className="user-box__info">
//       <div className="user-box__inline">
//         <div className="user-box__name" style={{ marginRight: 4 }}>
//           {donation.payer.username || donation.payer.fullname}
//         </div>
//         <div className="user-box__date">
//           {moment(donation.createdAt).fromNow()}
//         </div>
//       </div>
//       <div className="user-box__comment">{donation.message}</div>
//       <div className="user-box__money">{`$${donation.amount / 100}`}</div>
//     </div>
//   </div>
// )

// const DonationsPopup = ({ donations }) => {
//   return (
//     <div
//       className="notification-box in"
//       style={{ background: 'white', zIndex: 50 }}
//     >
//       <div className="notification-box__title">Donations</div>
//       <div className="notification-box__body custom-scroll">
//         {donations.map((donation) => (
//           <Donation donation={donation} key={donation.id} />
//         ))}
//       </div>
//     </div>
//   )
// }

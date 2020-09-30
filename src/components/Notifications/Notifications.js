import React, { useState, useEffect, useContext } from 'react'
import { GetStreamContext } from 'context'
import Notification from './Notification'
import * as S from './Notifications.styled'

// <div className="dropdown header-notification">
//   <button className="dropdown-btn notification-btn">
//     <svg className="icon icon-bell">
//       <use xlinkHref="#icon-bell" />
//     </svg>
//     <span className="notification-count">25</span>
//   </button>
//   <div className="dropdown-box notification-box notification-header-box">
//     <div className="dropdown-box__title">Notifications</div>
//     <div className="dropdown-box__body custom-scroll">
//       {/* user-box */}
//       <div className="user-box">
//         <div
//           className="user-box__avatar"
//           style={{ backgroundImage: 'url(img/avatar01.jpg)' }}
//         />
//         <div className="user-box__info">
//           <div className="user-box__name">Ryan Putnam</div>
//           <div className="user-box__inline">
//             <div className="user-box__comment">Rated your book</div>
//             <div className="user-box__date">1 day ago</div>
//           </div>
//         </div>
//       </div>
//       {/* user-box */}
//       <div className="user-box">
//         <div
//           className="user-box__avatar"
//           style={{ backgroundImage: 'url(img/avatar02.jpg)' }}
//         />
//         <div className="user-box__info">
//           <div className="user-box__name">Riccardo Carlet</div>
//           <div className="user-box__comment">
//             Wrote a comment for your book
//           </div>
//           <div className="user-box__inline">
//             <div className="user-box__link">The Glass Hotel</div>
//             <div className="user-box__date">2 days ago</div>
//           </div>
//         </div>
//       </div>
//       {/* user-box */}
//       <div className="user-box">
//         <div
//           className="user-box__avatar"
//           style={{ backgroundImage: 'url(img/avatar03.jpg)' }}
//         />
//         <div className="user-box__info">
//           <div className="user-box__name">Jeremy Goldberg</div>
//           <div className="user-box__inline">
//             <div className="user-box__comment">Rated your book</div>
//             <div className="user-box__date">2 days ago</div>
//           </div>
//         </div>
//       </div>
//       {/* user-box */}
//       <div className="user-box">
//         <div
//           className="user-box__avatar"
//           style={{ backgroundImage: 'url(img/avatar04.jpg)' }}
//         />
//         <div className="user-box__info">
//           <div className="user-box__name">Scott Boms</div>
//           <div className="user-box__inline">
//             <div className="user-box__comment">
//               Wrote a comment for your book
//             </div>
//             <div className="user-box__inline">
//               <div className="user-box__link">
//                 American Dirt: A Novel
//               </div>
//               <div className="user-box__date">2 days ago</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* user-box */}
//       <div className="user-box">
//         <div
//           className="user-box__avatar"
//           style={{ backgroundImage: 'url(img/avatar05.jpg)' }}
//         />
//         <div className="user-box__info">
//           <div className="user-box__name">Geunbae "GB" Lee</div>
//           <div className="user-box__inline">
//             <div className="user-box__comment">Sent you a message</div>
//             <div className="user-box__date">5 days ago</div>
//           </div>
//         </div>
//       </div>
//       {/* user-box */}
//       <div className="user-box">
//         <div
//           className="user-box__avatar"
//           style={{ backgroundImage: 'url(img/avatar02.jpg)' }}
//         />
//         <div className="user-box__info">
//           <div className="user-box__name">Riccardo Carlet</div>
//           <div className="user-box__comment">
//             Wrote a comment for your book
//           </div>
//           <div className="user-box__inline">
//             <div className="user-box__link">The Glass Hotel</div>
//             <div className="user-box__date">2 days ago</div>
//           </div>
//         </div>
//       </div>
//       {/* user-box */}
//       <div className="user-box">
//         <div
//           className="user-box__avatar"
//           style={{ backgroundImage: 'url(img/avatar03.jpg)' }}
//         />
//         <div className="user-box__info">
//           <div className="user-box__name">Jeremy Goldberg</div>
//           <div className="user-box__inline">
//             <div className="user-box__comment">Rated your book</div>
//             <div className="user-box__date">2 days ago</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

const NotificationsDropdown = ({ notifications, hide }) => {
  const { markNotificationsAsSeen } = useContext(GetStreamContext)

  useEffect(() => {
    markNotificationsAsSeen()
  }, [])

  return (
    <div
      data-lego="react"
      className="popup2 popup2_view_default popup2_tone_default popup2_theme_normal popup2_direction_bottom-right popup2_visible_yes popup2_target_anchor popup2_hiding_yes popup2_motionless notifier__popup notifier__popup_loaded_yes"
      style={{
        position: 'fixed',
        zIndex: 10001,
        top: '70px',
        right: '117px',
        width: '420px',
      }}
    >
      <div
        data-lego="react"
        className="popup2__tail"
        style={{ top: '-5.5px', left: '350.5px' }}
      />
      <div data-lego="react" className="notifier__content">
        <div
          data-lego="react"
          className="spin2 spin2_size_m spin2_view_default spin2_tone_default spin2_position_center notifier__spin"
        />
        <div className="gnc-notification-center gnc-notification-center_hoverable">
          <div className="gnc-notification-main">
            <div className="gnc-notification-header gnc-prevent-deactivate">
              <span
                className="gnc-notification-header__title"
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'rgb(4, 0, 39)',
                  marginTop: 1,
                }}
              >
                Notifications
              </span>
            </div>
            <div
              className="gnc-notification-list gnc-notification-list_has-services comments"
              style={{
                maxHeight: '540px',
                overflow: 'scroll',
              }}
            >
              {notifications.map((notification) => (
                <Notification
                  notification={notification}
                  closeNotifications={hide}
                  key={notification.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default () => {
  const { notifications: allNotifications = [] } = useContext(GetStreamContext)
  const notifications = allNotifications.filter(
    (notification) =>
      notification.verb === 'comment' ||
      notification.verb === 'reply' ||
      notification.verb === 'like' ||
      notification.verb === 'review' ||
      notification.verb === 'follow',
  )
  const [showDropdown, setShowDropdown] = useState(false)

  const unreadCount = notifications.filter((n) => !n.is_seen).length

  return (
    <>
      <div
        className="notifications-wrapper"
        style={{ position: 'relative', cursor: 'pointer' }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <svg
          className="icon icon-bell"
          style={{
            width: 20,
            height: 20,
            marginBottom: '-4px',
            marginTop: '4px',
          }}
        >
          <use xlinkHref="#icon-bell" />
        </svg>
        {unreadCount > 0 && (
          <S.Badge alignCenter justifyCenter>
            {unreadCount}
          </S.Badge>
        )}
      </div>
      {showDropdown && (
        <NotificationsDropdown
          notifications={notifications}
          hide={() => setShowDropdown(false)}
        />
      )}
    </>
  )
}

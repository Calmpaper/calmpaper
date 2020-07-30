import React from 'react'

export default () => (
  <div className="gnc-notification-header__controls">
    <div className="gnc-notifications-item__menu gnc-notification-header__filter ">
      <div className="gnc-notifications-item__menu-kebab  gnc-notifications-item__menu-kebab_visible">
        <svg
          width={24}
          height={16}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.64.78c.121.29.055.625-.168.846l-5.36 5.361a.89.89 0 0 0-.181.436v7.5a.775.775 0 0 1-.777.777.776.776 0 0 1-.55-.228l-2.307-2.307a.776.776 0 0 1-.228-.55V7.423a.883.883 0 0 0-.18-.435L.527 1.626A.777.777 0 0 1 1.077.3h13.846c.315 0 .598.19.718.48z"
            fill="#000"
          />
        </svg>
      </div>
      <div className="gnc-notifications-item__popup">
        <div className="gnc-notifications-item__popup-option ">
          <div className="gnc-notification-list__service">
            <svg
              className="gnc-service-logo"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx={3} cy={3} r={3} fill="#FC0D1A" />
              <circle cx={3} cy={13} r={3} fill="#FDCB2E" />
              <circle cx={13} cy={3} r={3} fill="#FDCB2E" />
              <circle cx={13} cy={13} r={3} fill="#FDCB2E" />
            </svg>
            <div className="gnc-notification-list__service-name">Все</div>
          </div>
        </div>
        <div className="gnc-notifications-item__popup-option ">
          <div className="gnc-notification-list__service">
            <img
              className="gnc-service-logo"
              src="https://islands.s3.yandex.net/_/R18YwqXK.svg"
            />
            <div className="gnc-notification-list__service-name">Район</div>
          </div>
        </div>
        <div className="gnc-notifications-item__popup-option ">
          <div className="gnc-notification-list__service">
            <img
              className="gnc-service-logo"
              src="https://islands.s3.yandex.net/_/2VJbvjyz.svg"
            />
            <div className="gnc-notification-list__service-name">Эксперты</div>
          </div>
        </div>
        <div className="gnc-notifications-item__popup-option ">
          <div className="gnc-notification-list__service">
            <img
              className="gnc-service-logo"
              src="https://islands.s3.yandex.net/_/2ecZ7HZm.svg"
            />
            <div className="gnc-notification-list__service-name">Дзен</div>
          </div>
        </div>
      </div>
    </div>
    <div className="gnc-notifications-item__menu gnc-notification-header__kebab gnc-notification-header__more">
      <div className="gnc-notifications-item__menu-kebab  gnc-notifications-item__menu-kebab_visible">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
        >
          <path
            fill="#000"
            fillRule="evenodd"
            d="M12 6.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zm0 14a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM13.75 12a1.75 1.75 0 11-3.5 0 1.75 1.75 0 013.5 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="gnc-notifications-item__popup">
        <div className="gnc-notifications-item__popup-option ">
          <span>Отметить всё прочитанным</span>
        </div>
        <div className="gnc-notifications-item__popup-option  gnc-notifications-item__popup-option_disabled">
          <span>Настройки</span>
        </div>
      </div>
    </div>
  </div>
)

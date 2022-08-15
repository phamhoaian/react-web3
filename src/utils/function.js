import { notification } from 'antd'

/**
 *
 * @param {string} description
 * @param {string} title
 * @param {string} type success|error|info|warn|open|close| at https://ant.design/components/notification/
 */
export const showNotification = (title = null, description = '', type = 'success') => {
  let params = {
    placement: 'bottomRight',
    className: 'notification-class',
    bottom: 54,
    duration: 5,
  }
  if (title) {
    params['message'] = title
  }
  if (description) {
    params['description'] = description
  }
  notification[type](params)
}

export const destroyNotification = () => {
  notification.destroy()
}

import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification.length === 0){
    return <></>
  }

  const notificationStyle = {
    color: notification[1],
    fontSize: 24,
    borderStyle: 'solid',
    padding: 2,
    marginBottom: 10
  }

  return(
    <div style={notificationStyle}>
      <em>{notification[0]}</em>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.array.isRequired
}

export default Notification
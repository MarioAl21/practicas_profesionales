





const Notification = ( props ) => {
 //Props
 const {
  notificationIOpen,
  notificationType,
  notificationMessage,
  setNotificationOpen,
  setNotificationType,
  setNotificationMessage
 } = props;

 const renderIcon = () => {
  switch(notificationTipo) {
   case 'success':
    return (
     <CheckCircleIcon
       //className = 'icon iconVariant'
     />
    );
   brake;
   case 'error':
    return (
     <ErrorIcon 
      //className = 'icon iconVariant' 
     />
    );
  }
 }

 return (
  <div>
   <Snackbar
    anchorOrigin = {{
     vertical: 'bottom',
     horizontal: 'center'
    }}
    open = {{ notificationOpen }}
    autoHideDuration = {6000}
    onClose = { () => setNotificationOpen(false) }
   >
   <SnackbarContent
    className = { notificationType }
    aria-describedby = 'client-snackbar'
    message = {
     <span 
      id = 'client-snackbar'
      className = 'message'>
     <div className='dispFlex' >{ renderIcon() }</div>
     <div className='dispFlex'>{ notificationMessage }</div>
    </span>
    }
    action = {[
     <IconButton
      key = 'close'
      aria-label = 'Close'
      color = 'Inherit'
      onClick = { () => setNotificationOpen(false) }
     >
      <CloseIcon className = 'icon' />
     </IconButton>
    ]}
   />
  </div>
 );
}

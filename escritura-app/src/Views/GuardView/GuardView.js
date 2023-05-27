import LockIcon from '@mui/icons-material/Lock';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

const GuardView = ({ message, icon }) => {
  let IconComponent;

  if (icon === 'lock') {
    IconComponent = LockIcon;
  } else if (icon === 'location') {
    IconComponent = NotListedLocationIcon;
  }

  return (
    <>
      <div className='center column' style={{ marginTop: '20vh', color: '#333', padding: '15px', textAlign: 'center' }}>
        <IconComponent style={{ fontSize: '15rem' }} />
        <h1>{message}</h1>
      </div>
    </>
  );
};

export default GuardView;
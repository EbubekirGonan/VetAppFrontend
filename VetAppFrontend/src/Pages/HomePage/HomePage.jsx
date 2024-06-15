import { useNavigate } from 'react-router-dom';
import './HomePage.css'


function HomePage() {

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/animals')
    }


  return (
    <>
    
    <div className='home-container'>
      <div className='home-heading'>
        <h2>Vet Management System</h2>
      </div>
      <div className='home-page-button'>
        <button onClick={handleClick}>Wellcome</button>
      </div>
    </div>
        
      
    </>
  )
}

export default HomePage
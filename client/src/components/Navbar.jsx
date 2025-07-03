import '../styles/nav.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="navbar-root">
      <ul>
        <li>
          <h3 className="brand-title" onClick={() => navigate('/')}>ExTRACK</h3>
        </li>
        <li>
          <div onClick={() => navigate('/')} className={isActive('/') ? 'active-link' : ''}>
            Home
          </div>
        </li>
        <li>
          <div onClick={() => navigate('/debtmanager')} className={isActive('/debtmanager') ? 'active-link' : ''}>
            DebtManager
          </div>
        </li>
        <li>
          <div onClick={() => navigate('/transactions')} className={isActive('/transactions') ? 'active-link' : ''}>
            Transactions
          </div>
        </li>
      </ul>

      <div className="user-section" onClick={handleLogout}>
        LogOut
      </div>
    </div>
  );
};

export default Navbar;

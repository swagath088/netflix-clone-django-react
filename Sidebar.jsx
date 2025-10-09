import '../css/Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar({ user }) {
  console.log("Sidebar user:", user);

  return (
    <aside className="sidebar">
      <ul>
        <li><Link to='/app/all' className='sidebar-btn'>All</Link></li>
        <li><Link to='/app/love' className='sidebar-btn'>Love films</Link></li>
        <li><Link to='/app/action' className='sidebar-btn'>Action </Link></li>
        <li><Link to='/app/webseries' className='sidebar-btn'>web series</Link></li>
        <li><Link to='/app/details/1' className='sidebar-btn '>Movie <br />details</Link></li>
        {user?.is_superuser && (
          <>
            <li><Link to='/app/add' className='sidebar-btn '>Add</Link></li>
            <li><Link to='/app/modify/1' className='sidebar-btn '>Modify</Link></li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;

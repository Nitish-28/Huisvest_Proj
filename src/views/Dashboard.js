import { Link, Outlet } from 'react-router-dom';
import Header from '../components/Header'; // Assuming you have a Header component

const navigation = [
  { name: 'My houses', href: '/MyHouses' },
  { name: 'Biddings', href: '/biddings' },
  { name: 'Outgoing Biddings', href: '/OutgoingBiddings' },
  { name: 'Profile', href: '/profile' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
  return (
    <div className="min-h-full">
      <Header /> {/* Static Header that stays on top */}

      {/* Navigation */}
      <nav className="bg-[#5caf84]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href} // Link to dynamic routes
                      className={classNames(
                        'text-white hover:bg-[#4DB2B0] hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content area where dynamic content will load */}
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="p-4 bg-white shadow rounded-md">
            hhhh
            <Outlet /> {/* This is where dynamic content will be rendered */}
          </div>
        </div>
      </main>
    </div>
  );
}

<<<<<<< Updated upstream
import Header from "../components/Header";
import Card from "../components/Card";
import Filter from "../components/Filter";

const people = [
  {
    name: 'Leslie Alexander',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'John Doe',
    role: 'Product Manager',
    imageUrl:
      'https://images.unsplash.com/photo-1514993518418-a413f708354d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'John Doe',
    role: 'Product Manager',
  }
];

export default function Home() {
  return (
    <div>
      <Header />
      <div className="relative bg-white py-24 sm:py-32">
        <div className="flex flex-col lg:flex-row">
          {/* Filter component */}
          <div className="lg:w-1/4 p-6">
            <Filter />
          </div>
          
          {/* Main content */}
          <div className="flex-1 p-6 lg:p-8">
            {/* Text positioned to top-right */}
            <div className="absolute top-0 left-0 max-w-4xl">
              <p className="mt-6 text-lg leading-8 text-gray-600 text-right">
                {/* Add any additional text here if needed */}
              </p>
            </div>

            {/* People grid */}
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-6 lg:px-8 xl:grid-cols-3">
              <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-3">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
=======
    import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
    import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
    import {
      ArrowPathIcon,
      ChartPieIcon,
      CursorArrowRaysIcon,
      FingerPrintIcon,
      SquaresPlusIcon,
    } from '@heroicons/react/24/outline'
    
    const solutions = [
      { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
      { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
      { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
      { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
      { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
    ]
    const callsToAction = [
      { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
      { name: 'Contact sales', href: '#', icon: PhoneIcon },
    ]
    
    function Home() {
      return (
        <Popover className="relative">
          <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            <span>Solutions</span>
            <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
          </PopoverButton>
    
          <PopoverPanel
            transition
            className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {solutions.map((item) => (
                  <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                    </div>
                    <div>
                      <a href={item.href} className="font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </PopoverPanel>
        </Popover>
      )
    }
  
  export default Home;
  
>>>>>>> Stashed changes

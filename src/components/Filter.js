'use client';

import { useState } from 'react';
import { Dialog, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid'; 
import MoneyFormat from './MoneyFormat';

const subCategories = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

export default function Filter({ setType, setAvailability, setMinPrice, setMaxPrice}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const handleSliderChange = (e, setter) => setter(e.target.value);

  // sorting:
  const [type, setLocalType] = useState('All');
  const [availability, setLocalAvailability] = useState('All');
  const [maxPrice, setLocalMaxPrice] = useState(5000000);
  const [minPrice, setLocalMinPrice] = useState(50000);


  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setLocalType(selectedType);
    setType(selectedType);
  };

  const handleAvailabilityChange = (e) => {
    const selectedAvail = e.target.value;
    setLocalAvailability(selectedAvail);
    setAvailability(selectedAvail);
  };

  const handleMinChange = (e) => {
    setLocalMinPrice(e.target.value);
    setMinPrice(e.target.value);
  }

  const handleMaxChange = (e) => {
    setLocalMaxPrice(e.target.value);
    setMaxPrice(e.target.value);
  }

  return (
    <div className="bg-main-white shadow-md">
      <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto w-full max-w-xs bg-white py-4 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 h-10 w-10 p-2 text-gray-400"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <main className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
        <section aria-labelledby="filters-heading" className="pb-24 pt-6">
          <h2 id="filters-heading" className="sr-only">Filters</h2>

          <div className="grid grid-cols-1 gap-x-2 gap-y-10 lg:grid-cols-1">
            <form className="hidden lg:block space-y-4 border-b border-gray-200 pb-6">
              {/* Subcategories */}
              <h3 className="font-medium"><b>Filters</b></h3>
              {/* <ul className="space-y-2">
                {subCategories.map((category) => (
                  <li key={category.name}>
                    <a href={category.href} className={category.current ? 'text-blue-600' : 'text-gray-900'}>
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul> */}

              <div>
                <label className="font-medium text-gray-500" >Type</label>
                <select
                  value={type}
                  onChange={handleTypeChange}
                  className="mt-2 block w-100 border border-gray-300 rounded-md p-1 w-full"
                >
                  <option value="All">All</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
              </select>
              </div>

              <div>
                <label className="font-medium text-gray-500">Availability</label>
                <select
                  value={availability}
                  onChange={handleAvailabilityChange}
                  className="mt-2 block w-100 border border-gray-300 rounded-md p-1 w-full"
                >
                  <option value="All">All</option>

                  {/* NIET VRAGEN WAAROM DIT 0 en 1 is... HET WERKT!!!!!!!!!!!!! */}
                  <option value="1">Available</option>
                  <option value="0">Sold</option>
              </select>
              </div>
              
              {/* Bedrooms */}
              <Disclosure defaultOpen>
                <DisclosureButton className="flex justify-between py-2 text-gray-500">
                  <span>Prijs max</span>
                  <span>
                    <MinusIcon className="h-7 w-7" />
                  </span>
                </DisclosureButton>
                <DisclosurePanel>
                <input
  type="range"
  min="10000"
  max="5000000"
  step="10000"
  className="w-full"
  value={maxPrice}
  onChange={(e) => handleMaxChange(e, setMaxPrice)}
/>
                  <span className='text-xs'>Maximale prijs: <MoneyFormat amount={maxPrice} /></span>
                </DisclosurePanel>
              </Disclosure>

              {/* Bedrooms
              <Disclosure defaultOpen>
                <DisclosureButton className="flex justify-between py-2 text-gray-500">
                  <span>Bedrooms</span>
                  <span>
                    <MinusIcon className="h-7 w-7" />
                  </span>
                </DisclosureButton>
                <DisclosurePanel>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={bedrooms}
                    onChange={(e) => handleSliderChange(e, setBedrooms)}
                    className="w-full"
                  />
                  <span>{bedrooms} Bedrooms</span>
                </DisclosurePanel>
              </Disclosure> */}

              {/* Bathrooms
              <Disclosure defaultOpen>
                <DisclosureButton className="flex justify-between py-2 text-gray-500">
                  <span>Bathrooms</span>
                  <span>
                    <MinusIcon className="h-7 w-7" />
                  </span>
                </DisclosureButton>
                <DisclosurePanel>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={bathrooms}
                    onChange={(e) => handleSliderChange(e, setBathrooms)}
                    className="w-full"
                  />
                  <span>{bathrooms} Bathrooms</span>
                </DisclosurePanel>
              </Disclosure> */}
            </form>

            <div className="lg:col-span-4">{/* Product grid or content goes here */}</div>
          </div>
        </section>
      </main>
    </div>
  );
}

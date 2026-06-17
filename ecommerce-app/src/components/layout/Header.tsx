import { useState } from 'react';
import { Link } from 'react-router-dom';

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with clear front zipper pouch.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
          imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt: 'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
  const [mobileActiveTab, setMobileActiveTab] = useState('women');

  return (
    <div className="bg-white z-50 relative border-b border-gray-200">

      {mobileMenuOpen && (
        <div className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/25" onClick={() => setMobileMenuOpen(false)} />

          <div className="fixed inset-0 z-40 flex">
            <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>


              <div className="mt-2 border-b border-gray-200">
                <div className="flex px-4 space-x-8">
                  {navigation.categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setMobileActiveTab(category.id)}
                      className={`flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium ${
                        mobileActiveTab === category.id
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-900'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-10 px-4 pb-8 pt-10">
                <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                  {navigation.categories.find(c => c.id === mobileActiveTab)?.featured.map((item) => (
                    <div key={item.name} className="group relative">
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                        <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                      </div>
                      <a href={item.href} className="mt-6 block text-sm font-medium text-gray-900">
                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                        {item.name}
                      </a>
                      <p aria-hidden="true" className="mt-1 text-sm text-gray-500">
                        Shop now
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                    Create an account
                  </a>
                </div>
                <div className="flow-root">
                  <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                    Sign in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>


            <div className="ml-4 flex lg:ml-0">
              <Link to="/">
                <span className="sr-only">Your Company</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-auto text-indigo-600">
                  <path d="M12.22 2c-3.13 0-5.87 1.34-7.58 3.42C2.93 7.51 2 10.15 2 13s.93 5.49 2.64 7.58C6.35 22.66 9.09 24 12.22 24s5.87-1.34 7.58-3.42c1.71-2.09 2.64-4.73 2.64-7.58s-.93-5.49-2.64-7.58C18.09 3.34 15.35 2 12.22 2zm0 18.52c-2.43 0-4.66-1.1-6.14-2.88C4.6 15.86 3.88 13.51 3.88 11.08S4.6 6.3 6.08 4.52c1.48-1.78 3.71-2.88 6.14-2.88s4.66 1.1 6.14 2.88c1.48 1.78 2.2 4.13 2.2 6.56s-.72 4.78-2.2 6.56c-1.48 1.78-3.71 2.88-6.14 2.88z"/>
                  <path d="M6.25 12.5a6.25 6.25 0 0112.5 0"/>
                  <path d="M5.5 14.5c1.4 3 4.5 4.5 7.5 4.5s6.1-1.5 7.5-4.5"/>
                </svg>
              </Link>
            </div>


            <div className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.categories.map((category) => (
                  <div key={category.name} className="flex" onMouseEnter={() => setActiveDesktopMenu(category.id)} onMouseLeave={() => setActiveDesktopMenu(null)}>
                    <div className="relative flex">
                      <button
                        type="button"
                        className={`relative z-10 flex items-center justify-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                          activeDesktopMenu === category.id
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-700 hover:text-gray-800'
                        }`}
                      >
                        {category.name}
                      </button>
                    </div>


                    {activeDesktopMenu === category.id && (
                      <div className="absolute inset-x-0 top-full text-sm text-gray-500 transition shadow-xl">
                        <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                              {category.featured.map((item) => (
                                <div key={item.name} className="group relative text-base sm:text-sm">
                                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                    <img
                                      src={item.imageSrc}
                                      alt={item.imageAlt}
                                      className="object-cover object-center"
                                    />
                                  </div>
                                  <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                                    {item.name}
                                  </a>
                                  <p aria-hidden="true" className="mt-1">
                                    Shop now
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {navigation.pages.map((page) => (
                  <a
                    key={page.name}
                    href={page.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Search
                </a>
                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  Help
                </a>
              </div>


              <div className="flex lg:hidden ml-2">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </a>
              </div>


              <div className="flex lg:hidden ml-2">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Help</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                </a>
              </div>


              <div className="ml-4 flow-root lg:ml-6">
                <a href="#" className="group -m-2 flex items-center p-2">
                  <svg className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

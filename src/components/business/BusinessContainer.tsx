function SmallContainer({ children }: Props) {
    return (
        <div className="mb-2.5 relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg sm:px-10">
             {children}
        </div>
    )
}

function BusinessCard() {
  return (
        <a
      href=""
      className="m-1 block bg-white p-4 rounded-lg border border-gray-200 shadow-sm shadow-indigo-100"
    >
      <img
        alt="123 Wallaby Avenue, Park Road"
        src="https://images.unsplash.com/photo-1554995207-c18c203602cb"
        className="object-cover w-full h-56 rounded-md"
      />

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">
              Price
            </dt>

            <dd className="text-sm text-gray-500">
              $240,000
            </dd>
          </div>

          <div>
            <dt className="sr-only">
              Address
            </dt>

            <dd className="font-medium">
              123 Wallaby Avenue, Park Road
            </dd>
          </div>
        </dl>

        <dl className="flex items-center mt-6 space-x-8 text-xs">
          <div className="sm:inline-flex sm:items-center sm:shrink-0">
            <svg
              className="w-4 h-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>

            <div className="sm:ml-3 mt-1.5 sm:mt-0">
              <dt className="text-gray-500">
                Parking
              </dt>

              <dd className="font-medium">
                2 spaces
              </dd>
            </div>
          </div>

          <div className="sm:inline-flex sm:items-center sm:shrink-0">
            <svg
              className="w-4 h-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>

            <div className="sm:ml-3 mt-1.5 sm:mt-0">
              <dt className="text-gray-500">
                Bathroom
              </dt>

              <dd className="font-medium">
                2 rooms
              </dd>
            </div>
          </div>

          
        </dl>
      </div>
    </a>
  )
}

function SingleFilter() {
  return (
    <div className="lg:sticky lg:top-4">
      <details
        open
        className="overflow-hidden border border-gray-200 rounded"
      >
        <summary className="flex items-center justify-between px-5 py-3 bg-gray-100 lg:hidden">
          <span className="text-sm font-medium">
            Toggle Filters
          </span>

          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </summary>

        <form
          action=""
          className="border-t border-gray-200 lg:border-t-0"
        >
          <fieldset>
            <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
              Type
            </legend>

            <div className="px-5 py-6 space-y-2">
              <div className="flex items-center">
                <input
                  id="toy"
                  type="checkbox"
                  name="type[toy]"
                  className="w-5 h-5 border-gray-300 rounded"
                />

                <label
                  htmlFor="toy"
                  className="ml-3 text-sm font-medium"
                >
                  Toy
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="game"
                  type="checkbox"
                  name="type[game]"
                  className="w-5 h-5 border-gray-300 rounded"
                />

                <label
                  htmlFor="game"
                  className="ml-3 text-sm font-medium"
                >
                  Game
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="outdoor"
                  type="checkbox"
                  name="type[outdoor]"
                  className="w-5 h-5 border-gray-300 rounded"
                />

                <label
                  htmlFor="outdoor"
                  className="ml-3 text-sm font-medium"
                >
                  Outdoor
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  className="text-xs text-gray-500 underline"
                >
                  Reset Type
                </button>
              </div>
            </div>
          </fieldset>

          <div>
            <fieldset>
              <legend className="block w-full px-5 py-3 text-xs font-medium bg-gray-50">
                Age
              </legend>

              <div className="px-5 py-6 space-y-2">
                <div className="flex items-center">
                  <input
                    id="3+"
                    type="checkbox"
                    name="age[3+]"
                    className="w-5 h-5 border-gray-300 rounded"
                  />

                  <label
                    htmlFor="3+"
                    className="ml-3 text-sm font-medium"
                  >
                    3+
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="8+"
                    type="checkbox"
                    name="age[8+]"
                    className="w-5 h-5 border-gray-300 rounded"
                  />

                  <label
                    htmlFor="8+"
                    className="ml-3 text-sm font-medium"
                  >
                    8+
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="12+"
                    type="checkbox"
                    name="age[12+]"
                    className="w-5 h-5 border-gray-300 rounded"
                  />

                  <label
                    htmlFor="12+"
                    className="ml-3 text-sm font-medium"
                  >
                    12+
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="16+"
                    type="checkbox"
                    name="age[16+]"
                    className="w-5 h-5 border-gray-300 rounded"
                  />

                  <label
                    htmlFor="16+"
                    className="ml-3 text-sm font-medium"
                  >
                    16+
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    className="text-xs text-gray-500 underline"
                  >
                    Reset Age
                  </button>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="flex justify-between px-5 py-3 border-t border-gray-200">
            <button
              name="reset"
              type="button"
              className="text-xs font-medium text-gray-600 underline rounded"
            >
              Reset All
            </button>

            <button
              name="commit"
              type="button"
              className="px-5 py-3 text-xs font-medium text-white bg-green-600 rounded"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </details>
    </div>
  )
}
function ItemGridWithFilters() {
  // window.addEventListener('resize', () => {
  //   const desktopScreen = window.innerWidth < 768

  //   document.querySelector('details').open = !desktopScreen
  // })
  return (
    <section>
  <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
    <div
      className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start"
    >
    
      <SingleFilter />
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <span className="hidden sm:inline">
              Showing
            </span>
            6 of 24 Products
          </p>

          <div className="ml-4">
            <label
              htmlFor="SortBy"
              className="sr-only"
            >
              Sort
            </label>

            <select
              id="SortBy"
              name="sort_by"
              className="text-sm border-gray-100 rounded"
            >
              <option readonly>Sort</option>
              <option value="title-asc">Title, A-Z</option>
              <option value="title-desc">Title, Z-A</option>
              <option value="price-asc">Price, Low-High</option>
              <option value="price-desc">Price, High-Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px mt-4   sm:grid-cols-2 lg:grid-cols-3">
          <BusinessCard/><BusinessCard/><BusinessCard/><BusinessCard/><BusinessCard/><BusinessCard/>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default function BusinessComponent() {
    return (
<>
<div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
  <SmallContainer><ItemGridWithFilters/></SmallContainer>
  <SmallContainer>
    <div className="mx-auto max-w-md">
      <img src="/img/logo.svg" className="h-6" alt="Tailwind Play" />
      <div className="divide-y divide-gray-300/50">
        <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
          <p>An advanced online playground for Tailwind CSS, including support for things like:</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">
                Customizing your
                <code className="text-sm font-bold text-gray-900">tailwind.config.js</code> file
              </p>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">
                Extracting classNamees with
                <code className="text-sm font-bold text-gray-900">@apply</code>
              </p>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">Code completion with instant preview</p>
            </li>
          </ul>
          <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
        </div>
        <div className="pt-8 text-base font-semibold leading-7">
          <p className="text-gray-900">Want to dig deeper into Tailwind?</p>
          <p>
            <a href="https://tailwindcss.com/docs" className="text-sky-500 hover:text-sky-600">Read the docs &rarr;</a>
          </p>
        </div>
      </div>
    </div>
    </SmallContainer>
    <SmallContainer>
    <div className="mx-auto max-w-md">
      <img src="/img/logo.svg" className="h-6" alt="Tailwind Play" />
      <div className="divide-y divide-gray-300/50">
        <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
          <p>An advanced online playground for Tailwind CSS, including support for things like:</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">
                Customizing your
                <code className="text-sm font-bold text-gray-900">tailwind.config.js</code> file
              </p>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">
                Extracting classNamees with
                <code className="text-sm font-bold text-gray-900">@apply</code>
              </p>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p className="ml-4">Code completion with instant preview</p>
            </li>
          </ul>
          <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
        </div>
        <div className="pt-8 text-base font-semibold leading-7">
          <p className="text-gray-900">Want to dig deeper into Tailwind?</p>
          <p>
            <a href="https://tailwindcss.com/docs" className="text-sky-500 hover:text-sky-600">Read the docs &rarr;</a>
          </p>
        </div>
      </div>
    </div>
    </SmallContainer>
  </div>
</>)
}
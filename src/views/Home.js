import Header from "../components/Header";
import Card from "../components/Card";
import Filter from "../components/Filter";

export default function Home() {
  return (
    <div>
      <Header />

      {/* Main content with flex layout */}
      <div className="flex relative bg-[#dddddd46] sm:pb-32 p-2 w-full">

        {/* Cards section */}
        <div className="flex flex-col items-center lg:w-4/4 w-full">
          {/* Centered Postcode searchbar */}
          <div className="bg-white shadow-md p-2 rounded-md w-full max-w-xs mb-4"> {/* Reduced margin bottom */}
            <label htmlFor="postcode" className="block text-sm font-medium leading-6 text-gray-900">Postcode</label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                name="postcode"
                id="postcode"
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="1234AB"
              />
            </div>
          </div>

          {/* Cards content aligned with the filter bar */}
          <div className="flex">
            {/* Adjust filter bar to be more compact */}
            <div className="lg:w-1/4 w-full p-1 self-start"> {/* Reduced padding */}
              <Filter />
            </div>

            <div className="flex flex-col items-center lg:w-3/4 w-full">
              {/* Updated grid layout for 4 cards per row */}
              <div className="mx-auto grid gap-x-2 p-4 gap-y-10 w-full bg-white shadow-lg">
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-4 sm:gap-y-16">
                  <Card 
                    cardId={23}
                    txt={"This is a card ID 23 "}
                    title={"Houtwal 87 Zeewolde"}
                  />
                  <Card
                    cardId={26}
                    txt={"This is a card ID 26 "}
                    title={"Houtwal 87 Zeewolde"}
                  />
                  <Card
                    cardId={27}
                    txt={"This is a card ID 27 "}
                    title={"Houtwal 87 Zeewolde"}
                  />
                  <Card
                    cardId={28}
                    txt={"This is a card ID 28 "}
                    title={"Houtwal 87 Zeewolde"}
                  />
                  <Card
                    cardId={29}
                    txt={"This is a card ID 29 "}
                    title={"Houtwal 87 Zeewolde"}
                  />
                  <Card
                    cardId={30}
                    txt={"This is a card ID 30 "}
                    title={"Houtwal 87 Zeewolde"}
                  />
                  <Card
                    cardId={31}
                    txt={"This is a card ID 31 "}
                    title={"Houtwal 87 Zeewolde"}
                  />
                  <Card
                    cardId={32}
                    txt={"This is a card ID 32 "}
                    title={"Houtwal 87 Zeewolde"}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

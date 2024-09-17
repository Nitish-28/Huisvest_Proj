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

      <div className="flex relative bg-[#dddddd46] sm:py-32 p-4">

        <div className="lg:w-1/4 w-1/4 p-2">
          <Filter />
        </div>

        <div className="flex flex-col lg:flex-row">
            <div className="mx-auto grid max-w-7xl gap-x-2 p-4 gap-y-10 px-2 lg:px-8 xl:grid-cols-3 bg-white shadow-lg">
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-3">
                  <Card 
                    cardId={23}
                    txt={"This is a card ID 23 "}
                    title={"Houtwal 87 Zeewolde"}
                  />
                   <Card
                    cardId={26}
                    txt={"This is a card ID 23  "}
                    title={"Houtwal 87 Zeewolde"}
                  />
                    <Card
                    cardId={26}
                    txt={"This is a card ID 23  "}
                    title={"Houtwal 87 Zeewolde"}
                  /> <Card
                  cardId={26}
                  txt={"This is a card ID 23  "}
                  title={"Houtwal 87 Zeewolde"}
                /> <Card
                cardId={26}
                txt={"This is a card ID 23  "}
                title={"Houtwal 87 Zeewolde"}
              /> <Card
              cardId={26}
              txt={"This is a card ID 23  "}
              title={"Houtwal 87 Zeewolde"}
            />
                </ul>
            </div>
          </div>
        </div>

      </div>
  );
}

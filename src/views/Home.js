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
          <div className="lg:w-1/4 w-1/4 p-2">
            <Filter />
          </div>


            {/* People grid */}
            <div className="mx-auto grid max-w-7xl gap-x-2 gap-y-10 px-2 lg:px-8 xl:grid-cols-3">
              <ul role="list" className="grid gap-x-8 p-4 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-3 bg-[#B24D82]">
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
  );
}

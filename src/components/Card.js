export default function Card() {
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img class="w-full h-48 object-cover" src="https://via.placeholder.com/480x240" alt="Card image cap" />
        <div class="bg-[#629D73] px-6 py-4">
          <h2 class="font-bold text-xl mb-2">Card Title</h2>
          <p class=" text-base">
            This is a simple card component with an image and some text. You can use this space to describe the content or add additional details.
          </p>
        </div>
      </div>
      
    );
}
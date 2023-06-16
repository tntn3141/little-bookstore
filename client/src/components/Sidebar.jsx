import { bookPriceRanges } from "./FormSetup"

function Sidebar() {
  return (
    <div className="flex border border-black">
      <div>
        <ul>
          {bookPriceRanges.map(price => price)}
        </ul>
      </div>
    </div>
  )
}
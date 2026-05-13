import { useState } from 'react'

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export default function App() {
  const [bill, setBill] = useState('')
  const [tip, setTip] = useState(15)
  const [people, setPeople] = useState(1)

  const billNum = parseFloat(bill) || 0
  const tipAmount = billNum * (tip / 100)
  const total = billNum + tipAmount
  const perPerson = people > 0 ? total / people : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500 mb-3 shadow-lg">
            <span className="text-white text-2xl">%</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Tip Calculator</h1>
          <p className="text-slate-500 text-sm mt-1">Split the bill easily</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 p-6 space-y-6">

          {/* Bill input */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Bill Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-lg select-none">$</span>
              <input
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={bill}
                onChange={e => setBill(e.target.value)}
                className="w-full pl-9 pr-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-400 focus:outline-none text-slate-800 text-xl font-semibold bg-slate-50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>

          {/* Tip slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Tip Percentage
              </label>
              <span className="text-blue-500 font-bold text-lg">{tip}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={25}
              step={1}
              value={tip}
              onChange={e => setTip(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-blue-500 bg-slate-200"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-400">10%</span>
              <span className="text-xs text-slate-400">25%</span>
            </div>
          </div>

          {/* People selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Split Between
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <button
                  key={n}
                  onClick={() => setPeople(n)}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    people === n
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 mt-2">
              {people === 1 ? '1 person' : `${people} people`}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Results */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p className="text-xs text-slate-400 font-medium">Tip Amount</p>
                <p className="text-slate-700 font-semibold text-lg">{fmt(tipAmount)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-medium">Total</p>
                <p className="text-slate-700 font-semibold text-lg">{fmt(total)}</p>
              </div>
            </div>

            <div className="p-4 bg-blue-500 rounded-2xl text-white text-center shadow-lg shadow-blue-200">
              <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider mb-1">
                {people === 1 ? 'Your Total' : 'Per Person'}
              </p>
              <p className="text-4xl font-bold tracking-tight">{fmt(perPerson)}</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Tip {tip}% · {people === 1 ? '1 person' : `${people} people`} · {fmt(billNum)} bill
        </p>
      </div>
    </div>
  )
}

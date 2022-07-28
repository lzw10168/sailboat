import React, { useState, startTransition, useTransition } from 'react'
const Index = () => {
  const [value, setValue] = useState('')
  const [searchData, setSearchData] = useState<number[]>([])
  const [isPending, startTransition] = useTransition()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    // startTransition
    startTransition(() => {
      const arr = Array.from({ length: 50000 }, (v, i) => new Date().getTime() + i)
      setSearchData(arr)
    })

  }
  return (
    <>
      <input type="text" value={value} onChange={handleInputChange} />
      <ul>
        {isPending ? '0C2A2168.png' : searchData.map((item: number) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  )
}

export default Index

'use client'

import { Button } from '@components/common'
import { useAxiosAuth } from '@libs/api'
import { apiUrls } from '@libs/routes'
import QueryString from 'qs'
import { useState } from 'react'

export const GuestInteraction = () => {
  const axiosAuth = useAxiosAuth()

  const [data, setData] = useState<any>(null)
  const [year, setYear] = useState(2023)

  const fetchData = async () => {
    try {
      const qs = QueryString.stringify(
        {
          year: year,
        },
        {
          skipNulls: true,
          addQueryPrefix: true,
        },
      )
      const result = await axiosAuth.get(`${apiUrls.posts()}${qs}`)

      setData(result.data)
    } catch (error) {}
  }

  const dataStringify = () => JSON.stringify(data)

  return (
    <div className="flex flex-col">
      <input
        type="number"
        className="text-black"
        value={year}
        onChange={(e) => setYear(() => parseInt(e.target.value))}
      />
      <hr />
      <Button type="button" onClick={fetchData}>
        Fetch Data
      </Button>
      <textarea disabled value={dataStringify()}></textarea>
    </div>
  )
}

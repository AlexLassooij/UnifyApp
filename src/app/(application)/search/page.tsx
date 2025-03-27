"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProgramSearchResult from "@/components/ui/program-search-result"
import { facultyTypes, provinceCities, provinceLabels } from "@/types/utility/label_mappings"

import { InstantSearch, Hits } from 'react-instantsearch';
import { searchClient } from '@/firebase/clientApp';
import { CustomSearchBox } from '@/components/ui/custom-search-box';


const costRanges = [
  { value: "under-5000", label: "Under $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000-15000", label: "$10,000 - $15,000" },
  { value: "15000-plus", label: "$15,000+" },
]

const otherFilters = [
  { value: "co-op", label: "Co-op Available" },
  { value: "english", label: "English Instruction" },
  { value: "french", label: "French Instruction" },
  { value: "scholarships", label: "Scholarships Available" },
]

export default function SearchPage() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value)
  }
  

  return (
    <div className="flex min-h-screen bg-[#f3f3f3]">
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto">
          <InstantSearch searchClient={searchClient} indexName="program-index">
            {/* TODO : enable filters to refine search */}
            <CustomSearchBox placeholder="Search for universities, programs..." />
          
          {/* Search Bar */}
          {/* <div className="mb-6">
            <SearchBox placeholder="Search for universities, programs..." />
          </div> */}

          {/* Filters */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Discipline" />
                </SelectTrigger>
                <SelectContent>
                  {facultyTypes.map((discipline) => (
                    <SelectItem key={discipline.value} value={discipline.value}>
                      {discipline.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={handleProvinceChange}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Province" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(provinceLabels).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select disabled={!selectedProvince}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  {selectedProvince &&
                    provinceCities[selectedProvince as keyof typeof provinceCities]?.map((city: string) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Cost" />
                </SelectTrigger>
                <SelectContent>
                  {costRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Other" />
                </SelectTrigger>
                <SelectContent>
                  {otherFilters.map((filter) => (
                    <SelectItem key={filter.value} value={filter.value}>
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Results */}
            <div className="space-y-6">
              <Hits hitComponent={ProgramSearchResult} />
            </div>
          </InstantSearch>
        </div>
      </div>
    </div>
  )
}


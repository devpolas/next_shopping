"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  function handleSearch() {
    const value = search.trim();
    const params =
      pathname === "/product"
        ? new URLSearchParams(searchParams.toString())
        : new URLSearchParams();

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("page");

    const query = params.toString();

    router.push(query ? `/product?${query}` : "/product");
  }

  return (
    <Field>
      <ButtonGroup>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          id='input-button-group'
          aria-label='search input'
          placeholder='Type to search...'
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button onClick={handleSearch} variant='outline'>
          Search
        </Button>
      </ButtonGroup>
    </Field>
  );
}

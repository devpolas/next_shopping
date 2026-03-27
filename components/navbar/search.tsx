"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function Search() {
  return (
    <Field>
      <ButtonGroup>
        <Input
          id='input-button-group'
          aria-label='search input'
          placeholder='Type to search...'
        />
        <Button variant='outline'>Search</Button>
      </ButtonGroup>
    </Field>
  );
}

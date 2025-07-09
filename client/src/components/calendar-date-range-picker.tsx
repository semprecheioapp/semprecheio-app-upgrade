
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, CalendarIcon } from "lucide-react";

export function CalendarDateRangePicker() {
  return (
    <Button variant="outline" size="sm" className="h-8">
      <CalendarIcon className="h-4 w-4 mr-2" />
      Selecionar período
    </Button>
  );
}
